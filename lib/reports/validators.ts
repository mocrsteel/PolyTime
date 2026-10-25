import { parseISO } from "date-fns";

import type { ReportDateRange, ReportGranularity } from "@/lib/reports/types";

export type ValidatedQueryParams = ReportDateRange & {
  granularity: ReportGranularity;
};

const REPORT_QUERY_PARAMS = ["startDate", "endDate", "granularity"];
const VALID_GRANULARITY: ReportGranularity[] = ["month", "quarter", "year"];

function validateISODate(dateString: string): Date | null {
  const date = parseISO(dateString);
  return isNaN(date.getTime()) ? null : date;
}

function validateGranularity(granularity: string | null): ReportGranularity {
  if (!granularity) {
    return "quarter";
  }

  if (VALID_GRANULARITY.includes(granularity as ReportGranularity)) {
    return granularity as ReportGranularity;
  }

  throw new Error("Granularity must be one of: month, quarter, year.");
}

function validateDateRange(
  start: string | null,
  end: string | null,
): ReportDateRange {
  if (!start || !end) {
    throw new Error("Start and end dates are required.");
  }

  const startDateObj = validateISODate(start);
  const endDateObj = validateISODate(end);

  if (!startDateObj) {
    throw new Error("Invalid start date format. Expected ISO date string.");
  }
  if (!endDateObj) {
    throw new Error("Invalid end date format. Expected ISO date string.");
  }
  if (startDateObj > endDateObj) {
    throw new Error("Start date cannot be after end date.");
  }

  return { start: startDateObj, end: endDateObj };
}

export function validateQueryParams(
  queryParams: URLSearchParams,
): ValidatedQueryParams {
  for (const [key] of Array.from(queryParams.entries())) {
    if (!REPORT_QUERY_PARAMS.includes(key)) {
      throw new Error(`Query parameter '${key}' is not allowed`);
    }
  }

  const start = queryParams.get("startDate");
  const end = queryParams.get("endDate");
  const granularity = queryParams.get("granularity");

  return {
    ...validateDateRange(start, end),
    granularity: validateGranularity(granularity),
  };
}
