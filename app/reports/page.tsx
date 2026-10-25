import ReportsClient from "@/app/reports/ReportsClient";
import { validateQueryParams } from "@/lib/reports/validators";
import { initializeDateRangeSelection } from "@/lib/reports/period";
import {
  getReportBounds,
  getReportData,
  getExpectedHoursForRange,
} from "@/lib/reports/service";
import type { ReportGranularity } from "@/lib/reports/types";

type ReportsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getStringParam(value: string | string[] | undefined): string | null {
  return typeof value === "string" ? value : null;
}

export default async function Reports({ searchParams }: ReportsPageProps) {
  const resolvedSearchParams = await searchParams;
  const availableDateRange = await getReportBounds();

  let granularity: ReportGranularity = "quarter";
  let selectedDateRange = initializeDateRangeSelection(
    availableDateRange.end,
    granularity,
  );

  const query = new URLSearchParams();
  const startDate = getStringParam(resolvedSearchParams?.startDate);
  const endDate = getStringParam(resolvedSearchParams?.endDate);
  const requestedGranularity = getStringParam(
    resolvedSearchParams?.granularity,
  );

  if (startDate) {
    query.set("startDate", startDate);
  }
  if (endDate) {
    query.set("endDate", endDate);
  }
  if (requestedGranularity) {
    query.set("granularity", requestedGranularity);
  }

  if (query.has("startDate") && query.has("endDate")) {
    try {
      const validated = validateQueryParams(query);
      granularity = validated.granularity;
      selectedDateRange = {
        start: validated.start,
        end: validated.end,
      };
    } catch {
      // Keep default selection when query params are invalid.
    }
  }

  const reportData = await getReportData(selectedDateRange);
  return (
    <ReportsClient
      data={reportData}
      initialTab={granularity}
      initialSelectedDateRange={selectedDateRange}
      availableDateRange={[availableDateRange.start, availableDateRange.end]}
      expectedBusinessHours={getExpectedHoursForRange(selectedDateRange)}
    />
  );
}
