"use client";

import Card from "@/components/ui/Card";
import type { AppIcons } from "@/components/Icons";
import { iconMap } from "@/components/Icons";
import { Label, Meter as RACMeter } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type ReportCardIconTheme =
  "green" | "red" | "blue" | "yellow" | "purple" | "gray";

export type ReportCardAllocationItem = {
  label: string;
  value: number;
  valueLabel?: string;
};

type ReportCardSharedProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
};

type ReportCardSummaryProps = ReportCardSharedProps & {
  icon: AppIcons;
  iconTheme: ReportCardIconTheme;
  allocationItems?: never;
  allocationMaxValue?: never;
};

type ReportCardAllocationProps = ReportCardSharedProps & {
  allocationItems: ReportCardAllocationItem[];
  allocationMaxValue?: number;
  icon?: never;
  iconTheme?: never;
};

export type ReportCardProps =
  ReportCardSummaryProps | ReportCardAllocationProps;

function isAllocationCard(
  props: ReportCardProps,
): props is ReportCardAllocationProps {
  return "allocationItems" in props;
}

const ReportCardVariants = tv({
  base: "p-5",
  variants: {
    layout: {
      summary: "flex min-h-32 flex-row justify-between gap-4",
      allocation: "flex flex-col gap-8 rounded-2xl p-6",
    },
  },
});

const iconVariants = tv({
  base: "flex h-10 w-10 items-center justify-center rounded-xl",
  variants: {
    theme: {
      green: "bg-teal-50 text-teal-700",
      red: "bg-red-50 text-red-700",
      blue: "bg-sky-50 text-sky-700",
      yellow: "bg-amber-50 text-amber-700",
      purple: "bg-indigo-50 text-indigo-700",
      gray: "bg-zinc-50 text-zinc-700",
    },
  },
});

function AllocationMeterRow({
  label,
  value,
  valueLabel,
  maxValue,
}: ReportCardAllocationItem & {
  maxValue: number;
}) {
  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const percentage = Math.min(Math.max((value / safeMaxValue) * 100, 0), 100);

  return (
    <RACMeter
      value={value}
      minValue={0}
      maxValue={safeMaxValue}
      formatOptions={{ style: "unit", unit: "hour", unitDisplay: "short" }}
      className="grid grid-cols-[120px_1fr_auto] items-center gap-6 sm:grid-cols-[120px_1fr_auto]"
    >
      {({ valueText }) => (
        <>
          <Label className="text-app-text text-sm">{label}</Label>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-polytime-teal absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-app-text text-right text-sm tabular-nums">
            {valueLabel}
          </div>
          <span className="sr-only">{`${label}: ${valueText}`}</span>
        </>
      )}
    </RACMeter>
  );
}

export default function ReportCard(props: ReportCardProps) {
  const allocationCard = isAllocationCard(props) ? props : null;
  const summaryCard = allocationCard ? null : props;
  const allocationMaxValue = allocationCard
    ? (allocationCard.allocationMaxValue ??
      Math.max(...allocationCard.allocationItems.map((item) => item.value), 0))
    : undefined;

  return (
    <Card
      variant="custom"
      className={twMerge(
        ReportCardVariants({
          layout: allocationCard ? "allocation" : "summary",
        }),
        props.className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div id={`${props.eyebrow.toLowerCase().replace(/\s+/g, "-")}-content`}>
          <div
            className={twMerge(
              "text-[10px] tracking-widest uppercase",
              allocationCard
                ? "text-app-primary font-bold"
                : "text-polytime-muted",
            )}
          >
            {props.eyebrow}
          </div>
          <div
            className={twMerge(
              "text-polytime-ink mt-2 tracking-tight",
              allocationCard
                ? "text-title font-semibold"
                : "text-2xl font-bold",
            )}
          >
            {props.title}
          </div>
          <div
            className={twMerge(
              "text-polytime-muted mt-1",
              allocationCard ? "text-sm" : "text-xs",
            )}
          >
            {props.subtitle}
          </div>
        </div>
        {allocationCard ? (
          props.badge ? (
            <div className="border-app-border text-app-text rounded-xl border px-4 py-2 text-sm font-medium">
              {props.badge}
            </div>
          ) : null
        ) : summaryCard ? (
          <div
            id={`${props.eyebrow.toLowerCase().replace(/\s+/g, "-")}-icon`}
            className={iconVariants({ theme: summaryCard.iconTheme! })}
          >
            {iconMap({
              icon: summaryCard.icon!,
              className: "h-4 w-4",
            })}
          </div>
        ) : null}
      </div>
      {allocationCard ? (
        <div className="space-y-4">
          {allocationCard.allocationItems.map((item) => (
            <AllocationMeterRow
              key={item.label}
              {...item}
              maxValue={allocationMaxValue ?? 1}
            />
          ))}
        </div>
      ) : null}
    </Card>
  );
}
