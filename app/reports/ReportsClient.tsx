"use client";

import ReportPage from "@/components/pages/ReportPage";
import type { PeriodTabKeys } from "@/components/ui/PeriodTabSelector";
import type { DateRange } from "@/components/ui/PeriodPicker";
import type { ReportData } from "@/lib/reports/types";

type ReportsClientProps = {
  data: ReportData;
  initialTab: PeriodTabKeys;
  initialSelectedDateRange: DateRange;
  availableDateRange: [Date, Date];
  expectedBusinessHours: number;
};

export default function ReportsClient(props: ReportsClientProps) {
  return <ReportPage {...props} />;
}
