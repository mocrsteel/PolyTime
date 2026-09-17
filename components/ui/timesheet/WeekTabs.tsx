"use client";

import { useState } from "react";
import {
  Key,
  SelectionIndicator,
  Tab as RACTab,
  TabList,
  TabPanels,
  TabProps as RACTabProps,
  Tabs,
} from "react-aria-components/Tabs";

import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { addDays, parse, format, startOfWeek } from "date-fns";

import Card from "@/components/ui/Card";
import type { TimesheetEntry } from "./DayEntry";
import DayList from "@/components/ui/timesheet/DayList";
import Button from "@/components/ui/Button";
import { iconMap } from "@/components/Icons";
import { useLocale } from "@/lib/locale-context";

type DayTabProps = RACTabProps & {
  /** Any date within the target week - used to compute the displayed Mo - Sun week. */
  date: Date;
  /** The full timesheeting entries for the week. Data is filtered within the tabs per day.*/
  data: TimesheetEntry[];
};

/**
 * Returns the total hours logged on a specific date.
 * @param data timesheeting entries.
 * @param date the date to filter the entries by.
 * @returns the total hours logged on the specified date.
 */
export function getTotalHoursOnDate(data: TimesheetEntry[], date: string) {
  const totalHours = data
    .filter((entry) => {
      return format(entry.date, "yyyy-MM-dd") === date;
    })
    .reduce((total, entry) => total + entry.hours, 0);
  return { hours: Math.floor(totalHours), minutes: (totalHours % 1) * 60 };
}

/**
 * Generates an array of dates for the current week.
 * @param date the date to start the week from.
 * @returns an array of dates for the current week.
 */
export function generateWeekDays(date: Date) {
  const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
  return Array(7)
    .fill(0)
    .map((_, i) => {
      return addDays(startOfWeekDate, i);
    });
}

/**
 * Returns the number of entries on a specific date.
 * @param data timesheeting entries.
 * @param date the date to filter the entries by.
 * @returns the number of entries on the specified date.
 */
export function getEntriesOnDate(data: TimesheetEntry[], date: string) {
  return data.filter((entry) => {
    return format(entry.date, "yyyy-MM-dd") === date;
  }).length;
}

/**
 * Renders a tabbed interface for displaying timesheeting entries for a specific week.
 * @todo Allows for entering new entries and editing existing ones.
 */
export default function WeekTabs({ date, data, ...props }: DayTabProps) {
  const [tab, setTab] = useState<Key>(format(date, "yyyy-MM-dd"));
  const locale = useLocale();
  const displayWeek = generateWeekDays(date);
  const entries = data.filter((entry) => {
    return format(entry.date, "yyyy-MM-dd") === tab.toString();
  });

  const variantClasses = tv({
    base: "group selected:bg-white border-polytime-line relative flex w-full cursor-pointer flex-col items-center border-r bg-slate-100/70 py-2 text-center transition-colors duration-400 last:border-r-0",
    variants: {
      deactivated: {
        true: "",
        false: "",
      },
    },
  });

  return (
    <Card variant={"container"}>
      <Tabs selectedKey={tab} onSelectionChange={(key) => setTab(key)}>
        <TabList className="border-polytime-line flex w-full flex-row border-b">
          {displayWeek.map((date) => {
            const totalHours = getTotalHoursOnDate(
              data,
              format(date, "yyyy-MM-dd"),
            );
            return (
              <RACTab
                {...props}
                className={twMerge(variantClasses())}
                key={format(date, "yyyy-MM-dd")}
                id={format(date, "yyyy-MM-dd")}
              >
                <div key={format(date, "yyyy-MM-dd") + "-item"}>
                  <div className="block text-[8px] font-bold tracking-wider text-slate-400 uppercase">
                    {format(date, "EEE")}
                  </div>
                  <div className="group-selected:text-polytime-teal block text-lg font-semibold text-slate-700 transition-colors duration-400">
                    {format(date, "dd")}
                  </div>
                  <small className="text-[9px] text-slate-500">
                    {totalHours.hours}h {totalHours.minutes}m
                  </small>
                </div>
                <SelectionIndicator
                  key={format(date, "yyyy-MM-dd") + "-indicator"}
                  className="bg-polytime-teal absolute bottom-0 left-0 z-20 order-1 h-0.5 w-full rounded-full transition-[translate,width] duration-400"
                />
              </RACTab>
            );
          })}
        </TabList>
        <TabPanels className="border-b-polytime-line flex w-full flex-col items-start border-b px-6">
          <div id={`${tab}-description`} className="w-full py-4">
            <h1 className="text-lg font-semibold">
              {format(parse(tab.toString(), "yyyy-MM-dd", new Date()), "PPPP", {
                locale: locale,
              })}
            </h1>
            <p
              className="text-polytime-muted inline-flex items-center gap-1 text-[10px]"
              data-testid="day.summary.hours"
            >
              {getEntriesOnDate(data, tab.toString())} entr
              {getEntriesOnDate(data, tab.toString()) !== 1 ? "ies" : "y"}
              {iconMap({ icon: "dot" })}
              {getTotalHoursOnDate(data, tab.toString()).hours}h{" "}
              {getTotalHoursOnDate(data, tab.toString()).minutes}m
            </p>
          </div>
          <DayList entries={entries} />
          <Button
            style="tertiary"
            onClick={() => {}}
            className="mt-2 mb-6 w-full"
          >
            {iconMap({ icon: "plus" })}
            Add another entry
          </Button>
        </TabPanels>
      </Tabs>
    </Card>
  );
}
