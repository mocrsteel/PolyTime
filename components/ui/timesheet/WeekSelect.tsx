/**
 * TODO: Build week selector for the timesheet page.
 */

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { iconMap } from "@/components/Icons";
import { startOfWeek, endOfWeek, format, getWeek } from "date-fns";

type WeekSelectProps = {
  date: Date;
};

const WeekSelectStyles = tv({
  base: "flex flex-row items-center justify-between gap-2",
});

export const getWeekStartEnd = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  const startDay = format(start, "d");
  const startMonth = format(start, "M");
  const endDay = format(end, "d");
  const endMonth = format(end, "M");
  const formattedStartMonth = format(start, "MMMM");
  const formattedEndMonth = format(end, "MMMM");
  const startYear = format(start, "yyyy");
  const endYear = format(end, "yyyy");
  if (startMonth === "12" && endMonth === "1") {
    return `${startDay} ${formattedStartMonth} ${startYear} - ${endDay} ${formattedEndMonth} ${endYear}`;
  } else if (startMonth !== endMonth) {
    return `${startDay} ${formattedStartMonth} - ${endDay} ${formattedEndMonth} ${endYear}`;
  } else {
    return `${startDay}-${endDay} ${formattedEndMonth} ${endYear}`;
  }
};

export const isCurrentWeek = (date: Date) => {
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const currentWeekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
  return currentWeekStart <= date && date <= currentWeekEnd;
};

export default function WeekSelect({ date }: WeekSelectProps) {
  const dateWeek = getWeekStartEnd(date);
  return (
    <Card variant={"modal"}>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row gap-2">
          <Button icon="chevronLeft" onClick={() => {}} />
          <Button onClick={() => {}}>Today</Button>
          <Button icon="chevronRight" onClick={() => {}} />
        </div>
        <div className="flex items-center font-bold tracking-tight">
          {dateWeek}
        </div>
        <div>
          {isCurrentWeek(date) ? (
            <div className="text-polytime-teal flex flex-row content-center items-center text-xs">
              {iconMap({ icon: "dot", className: "text-green-600 h-10 w-10" })}{" "}
              Current week
            </div>
          ) : (
            <div className="text-polytime-muted flex flex-row content-center items-center text-xs">
              {iconMap({ icon: "dot", className: "text-red-600 h-10 w-10" })}{" "}
              Editing non-current week
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
