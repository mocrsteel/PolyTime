"use client"

import { useState } from "react"
import ReportCard from "@/components/ui/reports/ReportCard";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import PeriodTabSelector, { PeriodTabKeys } from "@/components/ui/PeriodTabSelector";
import { Key, TabPanels, Tabs } from "react-aria-components/Tabs";

import PeriodPicker from "@/components/ui/PeriodPicker"

export type ReportPageProps = {};

const TAB_KEYS: PeriodTabKeys[] = ["month", "quarter", "year"];
const DEV_TIME_PERIOD: [Date, Date] = [new Date(2025, 6, 1), new Date(2026, 8, 25)];


function isTabKey(key: Key): key is PeriodTabKeys {
  return TAB_KEYS.includes(key as PeriodTabKeys) 
}

export default function ReportPage(props: ReportPageProps) {
  const [tab, setTab] = useState<PeriodTabKeys>("quarter")
  
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
              setTab(key)
            }
          }}
          className="contents"
        >
          <div aria-label="period buttons" className="order-1">
            <PeriodTabSelector />
          </div>
          <TabPanels className="order-3 col-span-2">
            <h1>Wee bit of content</h1>
            <p>Currently on tab {'"'}{tab}{'"'}</p>
          </TabPanels>
        </Tabs>
        <div className="order-2">
          <PeriodPicker granularity={tab} dateRange={DEV_TIME_PERIOD}/>
        </div>
      </div>
    </div>
  );
}
