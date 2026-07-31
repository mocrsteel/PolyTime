"use client";

import { useState } from "react";
import {
  Key,
  Tabs,
  TabsProps,
  TabList,
  TabListProps,
  TabPanel,
  TabPanels,
  SelectionIndicator,
  Tab as RACTab,
  TabProps as RACTabProps,
} from "react-aria-components/Tabs";
import { useTabListState } from "react-stately";

import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { startOfWeek, addDays, format, parse } from "date-fns";

import Card from "@/components/ui/Card";
import type { TimesheetEntry } from "./DayEntry";
import DayList from "@/components/ui/timesheet/DayList";

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type DayTabProps = RACTabProps & {
  date: Date;
  data: TimesheetEntry[];
};

export default function WeekTabs({ date, data, ...props }: DayTabProps) {
  const [tab, setTab] = useState<Key>(format(new Date(), "yyyy-MM-dd"));

  const variantClasses = tv({
    base: "group selected:bg-white border-polytime-line relative flex w-full flex-col items-center border-r bg-slate-100/70 py-2 text-center transition-colors duration-400 last:border-r-0",
    variants: {
      deactivated: {
        true: "",
        false: "",
      },
    },
  });
  const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
  const displayWeek = Array(7)
    .fill(0)
    .map((_, i) => {
      return addDays(startOfWeekDate, i);
    });

  return (
    <Card variant={"container"}>
      <Tabs selectedKey={tab} onSelectionChange={(key) => setTab(key)}>
        <TabList className="border-polytime-line flex w-full flex-row border-b">
          {displayWeek.map((date) => {
            return (
              <RACTab
                {...props}
                className={twMerge(variantClasses())}
                key={format(date, "yyyy-MM-dd")}
                id={format(date, "yyyy-MM-dd")}
              >
                <>
                  <div className="block text-[8px] font-bold tracking-wider text-slate-400 uppercase">
                    {format(date, "EEE")}
                  </div>
                  <div className="group-selected:text-polytime-teal-dark block text-lg font-semibold text-slate-700 transition-colors duration-400">
                    {format(date, "dd")}
                  </div>
                  <small className="text-[9px] text-slate-500">
                    {0}h {0}m
                  </small>
                </>
                <SelectionIndicator className="bg-polytime-teal-dark absolute bottom-0 left-0 z-20 order-1 h-0.5 w-full rounded-full transition-[translate,widht] duration-400" />
              </RACTab>
            );
          })}
        </TabList>
        <TabPanels>
          <DayList
            entries={data.filter((entry) => {
              return (
                entry.date === parse(tab.toString(), "yyyy-MM-dd", new Date())
              );
            })}
          />
        </TabPanels>
      </Tabs>
    </Card>
  );
}
