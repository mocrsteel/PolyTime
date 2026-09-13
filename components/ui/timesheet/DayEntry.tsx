import { iconMap } from "@/components/Icons";
import Button from "@/components/ui/Button";
import DurationInput from "@/components/ui/timesheet/DurationInput";
import type { ProjectColor } from "@/lib/project-colors";
import { projectColorClassFromSlot } from "@/lib/project-colors";

import Daylist from "@/components/ui/timesheet/DayList";
import { twMerge } from "tailwind-merge";

export type TimesheetEntry = {
  readonly id: number;
  readonly businessUnit: string;
  readonly asset: string;
  readonly project: string;
  readonly projectColor: ProjectColor["slot"];
  readonly user?: string;
  date: Date;
  hours: number;
  comments: string[];
  className?: string;
};

// TODO: Add delete button
// TODO: Add code to update the mother entry in the database when the duration is updated (onBlur, on entering, ...).
export default function DayEntry({
  id,
  businessUnit,
  asset,
  project,
  projectColor,
  hours,
  comments,
  ...props
}: TimesheetEntry) {
  const entryColor = projectColorClassFromSlot(projectColor, "before");

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 content-center items-center justify-between border-t border-slate-200 md:grid-cols-[minmax(40%,3fr)_3fr_3fr_25px]",
        props.className || "",
      )}
    >
      <div className="flex flex-col gap-1">
        <div
          className={twMerge(
            "relative before:absolute before:-left-4 before:h-full before:w-1 before:rounded-full",
            entryColor,
          )}
        >
          <h1 className="text-xs font-bold">{project}</h1>
          <p className="text-polytime-muted text-[10px]">{asset}</p>
        </div>
        <div
          id={`businessunit-sm-${id}`}
          className="text-polytime-muted my-2 block text-[10px] tracking-wider uppercase md:hidden"
        >
          {businessUnit}
        </div>
        <div className="flex flex-col gap-1">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="text-polytime-muted bg-polytime-muted/10 mb-2 flex w-full max-w-sm flex-row content-center items-center rounded-md px-2 py-1 text-[9px] font-medium md:mb-0"
            >
              <span>
                {iconMap({
                  icon: "message",
                  className: "text-polytime-teal-dark mr-2 h-3 w-3",
                })}
              </span>
              <p>{comment}</p>
            </div>
          ))}
          <button className="text-polytime-teal-dark mb-2 ml-2 flex flex-row items-center gap-1 text-[10px] font-semibold md:mb-0">
            {iconMap({ icon: "pen" })}
            {comments.length === 0
              ? "Add comment"
              : comments.length === 1
                ? "Edit comment"
                : "Edit comments"}
          </button>
        </div>
      </div>
      <div
        id={`businessunit-md-${id}`}
        className="text-polytime-muted hidden flex-row flex-nowrap content-center items-center justify-self-end text-[10px] uppercase md:flex"
      >
        {iconMap({ icon: "dot", className: "text-polytime-muted/50 h-6 w-6" })}{" "}
        {businessUnit}
      </div>
      <div className="mt-2 ml-2 md:mt-0 md:ml-0 md:justify-self-end-safe">
        <DurationInput entryId={id} time={hours} />
      </div>
      <Button
        size="tiny"
        style="secondary"
        className="ml-2 hover:border-red-600 hover:text-red-600"
        onClick={() => {}}
      >
        {iconMap({ icon: "trash" })}
      </Button>
    </div>
  );
}
