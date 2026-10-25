import {
  endOfMonth,
  endOfQuarter,
  endOfYear,
  getMonth,
  getQuarter,
  getYear,
  startOfMonth,
  startOfQuarter,
  startOfYear,
} from "date-fns";

import type { ReportDateRange, ReportGranularity } from "@/lib/reports/types";

/**
 * Input for getDateRange. 1-indexed for `month` and `quarter`.
 */
export type ReportPeriod =
  | { year: number }
  | { year: number; month: number; quarter?: never }
  | { year: number; quarter: number; month?: never };

export function getDateRange(period: ReportPeriod): ReportDateRange {
  if ("month" in period && period.month) {
    const date = new Date(period.year, period.month - 1, 1);
    return { start: startOfMonth(date), end: endOfMonth(date) };
  }

  if ("quarter" in period && period.quarter) {
    const date = new Date(period.year, (period.quarter - 1) * 3, 1);
    return { start: startOfQuarter(date), end: endOfQuarter(date) };
  }

  const date = new Date(period.year, 0, 1);
  return { start: startOfYear(date), end: endOfYear(date) };
}

export function initializeDateRangeSelection(
  date: Date,
  granularity: ReportGranularity,
): ReportDateRange {
  switch (granularity) {
    case "month":
      return getDateRange({ year: getYear(date), month: getMonth(date) + 1 });
    case "quarter":
      return getDateRange({ year: getYear(date), quarter: getQuarter(date) });
    default:
      return getDateRange({ year: getYear(date) });
  }
}

