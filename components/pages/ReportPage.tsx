"use client";

import { getYear, getMonth, getQuarter, format } from "date-fns";
import { useState } from "react";
import { Key, TabPanels, Tabs } from "react-aria-components/Tabs";

import ReportCard from "@/components/ui/reports/ReportCard";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import PeriodTabSelector, {
  PeriodTabKeys,
} from "@/components/ui/PeriodTabSelector";
import PeriodPicker, {
  type PeriodPickerProps,
  getDateRange,
  type DateRange,
} from "@/components/ui/PeriodPicker";

export type ReportPageProps = null;

const TAB_KEYS: PeriodTabKeys[] = ["month", "quarter", "year"];
const DEV_TIME_PERIOD: [Date, Date] = [
  new Date(2025, 6, 1),
  new Date(2026, 8, 25),
];

function isTabKey(key: Key): key is PeriodTabKeys {
  return TAB_KEYS.includes(key as PeriodTabKeys);
}

function initializeDateRangeSelection(
  date: Date,
  granularity: PeriodPickerProps["granularity"],
): DateRange {
  switch (granularity) {
    case "month":
      return getDateRange({ year: getYear(date), month: getMonth(date) + 1 });
    case "quarter":
      return getDateRange({ year: getYear(date), quarter: getQuarter(date) });
    default:
      return getDateRange({ year: getYear(date) });
  }
}

export default function ReportPage(props: ReportPageProps) {
  const [tab, setTab] = useState<PeriodTabKeys>("quarter");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(
    initializeDateRangeSelection(DEV_TIME_PERIOD[1], tab),
  );
  return (
    <div>
      <Heading
        title="Reports"
        eyebrow="Insights"
        subtitle="Understand where your time is goes."
        buttons={
          <Button style="primary" onClick={() => {}}>
            Export report
          </Button>
        }
      />
      <div className="grid grid-cols-[1fr_auto] items-center gap-y-4">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key: Key) => {
            if (isTabKey(key)) {
              setTab(key);
            }
          }}
          className="contents"
        >
          <div aria-label="period buttons" className="order-1">
            <PeriodTabSelector />
          </div>
          <TabPanels className="order-3 col-span-2">
            <h1>Wee bit of content</h1>
            <p>
              Currently on tab {'"'}
              {tab}
              {'"'}
            </p>
            <p>Current date range: {format(selectedDateRange.start, "EEE do MMM yyyy (QQQ)")} to {format(selectedDateRange.end, "EEE do MMM yyyy (QQQ)")}</p>
          </TabPanels>
        </Tabs>
        <div className="order-2">
          <PeriodPicker granularity={tab} dateRange={DEV_TIME_PERIOD} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} />
        </div>
      </div>
    </div>
  );
}
