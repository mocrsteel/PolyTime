"use client";
/**
 * TODO: build the progress bar for the timesheet page.
 */

import {
  Label,
  Meter as RACMeter,
  MeterProps as RACMeterProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { iconMap } from "@/components/Icons";

type MeterBar = React.HTMLProps<HTMLDivElement> &
  RACMeterProps & {
    value: number;
    label: string;
    weekMaximum: number;
  };

const MeterVariants = tv({
  base: "flex w-full max-w-full flex-col gap-2 font-sans",
});

export default function Meter({ ...props }: MeterBar) {
  const value = (props.value / props.weekMaximum) * 100;
  return (
    <RACMeter className={twMerge(MeterVariants(), props.className)} {...props}>
      {({ percentage, valueText }) => (
        <>
          <div className="flex justify-between text-[11px]">
            <Label className="text-polytime-muted">{props.label}</Label>
            <span
              className={`flex flex-row content-center items-center gap-2 ${value > 100 ? "text-red-700" : "text-polytime-teal"}`}
            >
              {value > 100 && iconMap({ icon: "alert" })}
              {" " + valueText + ` / ${props.weekMaximum} hr`}
            </span>
          </div>
          <div className="relative h-2 w-full max-w-full rounded-full bg-slate-200 outline-1 outline-transparent">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${value > 100 ? "bg-red-700" : "bg-polytime-teal"}`}
              style={{ width: `${Math.min(value, 100)}%` }}
            />
          </div>
        </>
      )}
    </RACMeter>
  );
}
