"use client";

import { getYear, getMonth, getQuarter } from "date-fns";
import { useState } from "react";
import { Key, TabPanels, Tabs } from "react-aria-components/Tabs";

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
import ReportCard from "@/components/ui/reports/ReportCard";

const TAB_KEYS: PeriodTabKeys[] = ["month", "quarter", "year"];
const DEV_TIME_PERIOD: [Date, Date] = [
  new Date(2025, 6, 1),
  new Date(2026, 8, 25),
];
const BUSINESS_UNIT_ALLOCATION = [
  { label: "Operations", value: 432, valueLabel: "432h" },
  { label: "Digital", value: 350, valueLabel: "350h" },
  { label: "Commercial", value: 286, valueLabel: "286h" },
  { label: "Corporate", value: 180, valueLabel: "180h" },
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

export default function ReportPage() {
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
            <div
              aria-label="summary cards"
              className="grid grid-cols-3 gap-4"
            >
              <ReportCard
                eyebrow="Total hours"
                title="1,238h"
                subtitle="Q2 Apr-Jun 2026"
                icon="barChart"
                iconTheme="green"
              />
              <ReportCard
                eyebrow="Top Project"
                title="Atlas"
                subtitle="384 hours logged"
                icon="buildings"
                iconTheme="red"
              />
              <ReportCard
                eyebrow="Completeness"
                title="99.5%"
                subtitle="Current quarter"
                icon="users2"
                iconTheme="purple"
              />
              <div className="col-span-3">
                <ReportCard
                  eyebrow="Allocation"
                  title="Hours by business unit"
                  subtitle="Quarterly allocation across the organisation."
                  badge="Q2 2026"
                  allocationItems={BUSINESS_UNIT_ALLOCATION}
                />
              </div>
            </div>
          </TabPanels>
        </Tabs>
        <div className="order-2">
          <PeriodPicker
            granularity={tab}
            dateRange={DEV_TIME_PERIOD}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
          />
        </div>
      </div>
    </div>
  );
}
