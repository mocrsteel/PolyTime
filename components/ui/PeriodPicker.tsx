import {
  DialogTrigger,
  Popover,
  Dialog,
  ListBox,
  ListBoxItem,
  Button,
  type Selection,
} from "react-aria-components";
import { Group } from "react-aria-components/Group";
import { iconMap } from "@/components/Icons";
import { tv } from "tailwind-variants";
import React, { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  getYear,
  getMonth,
  getQuarter,
} from "date-fns";

export type PeriodPickerProps = {
  /** Period type to pick from. */
  granularity: "month" | "quarter" | "year";
  /** Minimum and maximum year range to display. Can be defined based on database content. */
  dateRange: [Date, Date];
  selectedDateRange: DateRange;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<DateRange>>
};

/**
 * Input for getDateRange. 1-indexed for `month` and `quarter`.
 */
export type Period =
  | { year: number }
  | { year: number; month: number; quarter?: never }
  | { year: number; quarter: number; month?: never };

export type DateRange = { start: Date; end: Date };

/**
 * 
 * @param period input year, month and quarter. Quarter and Month are 1-indexed.
 * @returns Daterange for the inputted period (year, month, quarter)
 */
export function getDateRange(period: Period): DateRange {
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
const groupVariants = tv({
  base: "flex w-fit flex-row h-10 items-center rounded-lg border border-stone-200 bg-stone-50"
})
const periodChangeButtonVariants = tv({
  base: "h-full px-2 py-auto h-full text-stone-500 hover:text-stone-900",
});
const dialogButtonVariants = tv({
  base: "flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-100 px-4 h-full py-auto text-sm font-semibold text-stone-900 hover:border-stone-300/70 hover:bg-stone-200/50",
});
const listBoxVariants = tv({
  base: "grid gap-3 text-sm",
  variants: {
    columns: {
      2: "grid-cols-2",
      4: "grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 2,
  },
});
const listBoxItemVariants = tv({
  base: "flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-6 py-2 text-stone-500 hover:border-stone-300/70 hover:bg-stone-100 hover:text-stone-900",
  variants: {
    isSelected: {
      true: "border-teal-700 bg-teal-100 text-teal-900",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-40 hover:border-stone-200 hover:bg-stone-50 hover:text-stone-500",
    },
  },
});

export default function PeriodPicker({
  dateRange,
  granularity = "quarter",
  selectedDateRange,
  setSelectedDateRange
}: PeriodPickerProps) {

  // Lifted so future report views can consume the active date range for data fetching.
  const bounds: DateRange = { start: dateRange[0], end: dateRange[1] };

  switch (granularity) {
    case "month":
      return (
        <MonthPicker
          dateRange={selectedDateRange}
          setPeriodDates={setSelectedDateRange}
          bounds={bounds}
        />
      );
    case "year":
      return (
        <YearPicker
          dateRange={selectedDateRange}
          setPeriodDates={setSelectedDateRange}
          bounds={bounds}
        />
      );
    default:
      return (
        <QuarterPicker
          dateRange={selectedDateRange}
          setPeriodDates={setSelectedDateRange}
          bounds={bounds}
        />
      );
  }
}

type PickerProps = {
  dateRange: DateRange;
  setPeriodDates: React.Dispatch<React.SetStateAction<DateRange>>;
  /** Real min/max period range backed by database data, used to flag periods with no entries. */
  bounds: DateRange;
};

// Periods beyond the DB range remain reachable within this margin, for backfilling/pre-entering data.
// TODO: investigate on how make it strict in the past and looser in the future.
const BUFFER_PERIODS = 2;

type RangeState = "inRange" | "buffered" | "outOfRange";

function getRangeState(
  index: number,
  minIndex: number,
  maxIndex: number,
): RangeState {
  if (index >= minIndex && index <= maxIndex) return "inRange";
  if (index >= minIndex - BUFFER_PERIODS && index <= maxIndex + BUFFER_PERIODS)
    return "buffered";
  return "outOfRange";
}

/** Small dot flagging a selectable period that has no database entries yet. */
function NoDataDot() {
  return (
    <span className="inline-flex items-center">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      <span className="sr-only"> (no data yet)</span>
    </span>
  );
}

type QuarterPeriod = { year: number; quarter: number };

function quarterIndex({ year, quarter }: QuarterPeriod): number {
  return year * 4 + (quarter - 1);
}

/** Shifts a quarter/year pair by `delta` quarters, rolling over into adjacent years. */
function shiftQuarter(
  { year, quarter }: QuarterPeriod,
  delta: number,
): QuarterPeriod {
  const zeroIndexed = quarter - 1 + delta;
  return {
    year: year + Math.floor(zeroIndexed / 4),
    quarter: (((zeroIndexed % 4) + 4) % 4) + 1,
  };
}

const QUARTERS = [1, 2, 3, 4] as const;

function QuarterPicker({ dateRange, setPeriodDates, bounds }: PickerProps) {
  const [period, setPeriod] = useState<QuarterPeriod>({
    quarter: getQuarter(dateRange.start),
    year: getYear(dateRange.start),
  });

  useEffect(() => {
    setPeriodDates(getDateRange(period));
  }, [period, setPeriodDates]);

  const minIndex = quarterIndex({
    year: getYear(bounds.start),
    quarter: getQuarter(bounds.start),
  });
  const maxIndex = quarterIndex({
    year: getYear(bounds.end),
    quarter: getQuarter(bounds.end),
  });
  const currentIndex = quarterIndex(period);
  const currentState = getRangeState(currentIndex, minIndex, maxIndex);

  const canGoPrev =
    getRangeState(currentIndex - 1, minIndex, maxIndex) !== "outOfRange";
  const canGoNext =
    getRangeState(currentIndex + 1, minIndex, maxIndex) !== "outOfRange";
  const canDecreaseYear =
    getRangeState(
      quarterIndex({ year: period.year - 1, quarter: 4 }),
      minIndex,
      maxIndex,
    ) !== "outOfRange";
  const canIncreaseYear =
    getRangeState(
      quarterIndex({ year: period.year + 1, quarter: 1 }),
      minIndex,
      maxIndex,
    ) !== "outOfRange";

  return (
    <Group className={groupVariants()}>
      <Button
        aria-label="Previous period"
        isDisabled={!canGoPrev}
        className={periodChangeButtonVariants()}
        onPress={() => setPeriod((prev) => shiftQuarter(prev, -1))}
      >
        {iconMap({ icon: "chevronLeft" })}
      </Button>
      <DialogTrigger aria-label="Period picker">
        <Button className={dialogButtonVariants()}>
          Q{period.quarter} {period.year}
          {currentState === "buffered" && <NoDataDot />}
          {iconMap({
            icon: "chevronDown",
            className: "h-3 w-3 text-stone-500",
          })}
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-xl">
            {({ close }) => (
              <>
                <div
                  aria-label="year stepper"
                  className="flex w-full flex-row items-center justify-between"
                >
                  <Button
                    aria-label="decrease year"
                    isDisabled={!canDecreaseYear}
                    className="text-stone-500 hover:text-stone-900"
                    onClick={() =>
                      setPeriod((prev) => ({ ...prev, year: prev.year - 1 }))
                    }
                  >
                    {iconMap({
                      icon: "chevronLeft",
                      className: "h-4 w-4",
                    })}
                  </Button>
                  <div
                    aria-label="selected year"
                    className="text-sm font-semibold text-stone-900"
                  >
                    {period.year}
                  </div>
                  <Button
                    aria-label="increase year"
                    isDisabled={!canIncreaseYear}
                    className="text-stone-500 hover:text-stone-900"
                    onClick={() =>
                      setPeriod((prev) => ({ ...prev, year: prev.year + 1 }))
                    }
                  >
                    {iconMap({
                      icon: "chevronRight",
                      className: "h-4 w-4 text-stone-500 hover:text-stone-900",
                    })}
                  </Button>
                </div>
                <div
                  aria-label="divider"
                  className="h-px w-full bg-stone-200"
                />
                <ListBox
                  aria-label="Quarter"
                  selectionMode="single"
                  layout="grid"
                  onSelectionChange={(keys: Selection) => {
                    const quarter = Number([...keys][0]);
                    setPeriod((prev) => ({ ...prev, quarter }));
                    close();
                  }}
                  className={listBoxVariants()}
                >
                  {QUARTERS.map((quarter) => {
                    const state = getRangeState(
                      quarterIndex({ year: period.year, quarter }),
                      minIndex,
                      maxIndex,
                    );
                    return (
                      <ListBoxItem
                        key={quarter}
                        id={String(quarter)}
                        textValue={`Q${quarter}`}
                        isDisabled={state === "outOfRange"}
                        className={listBoxItemVariants({
                          isSelected: period.quarter === quarter,
                          isDisabled: state === "outOfRange",
                        })}
                      >
                        Q{quarter}
                        {state === "buffered" && <NoDataDot />}
                      </ListBoxItem>
                    );
                  })}
                </ListBox>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
      <Button
        aria-label="Next period"
        isDisabled={!canGoNext}
        className={periodChangeButtonVariants()}
        onPress={() => setPeriod((prev) => shiftQuarter(prev, 1))}
      >
        {iconMap({ icon: "chevronRight" })}
      </Button>
    </Group>
  );
}

type MonthPeriod = { year: number; month: number };

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function monthIndex({ year, month }: MonthPeriod): number {
  return year * 12 + (month - 1);
}

/** Shifts a month/year pair by `delta` months, rolling over into adjacent years. */
function shiftMonth({ year, month }: MonthPeriod, delta: number): MonthPeriod {
  const zeroIndexed = month - 1 + delta;
  return {
    year: year + Math.floor(zeroIndexed / 12),
    month: (((zeroIndexed % 12) + 12) % 12) + 1,
  };
}

function MonthPicker({ dateRange, setPeriodDates, bounds }: PickerProps) {
  const [period, setPeriod] = useState<MonthPeriod>({
    month: getMonth(dateRange.start) + 1,
    year: getYear(dateRange.start),
  });

  useEffect(() => {
    setPeriodDates(getDateRange(period));
  }, [period, setPeriodDates]);

  const minIndex = monthIndex({
    year: getYear(bounds.start),
    month: getMonth(bounds.start) + 1,
  });
  const maxIndex = monthIndex({
    year: getYear(bounds.end),
    month: getMonth(bounds.end) + 1,
  });
  const currentIndex = monthIndex(period);
  const currentState = getRangeState(currentIndex, minIndex, maxIndex);

  const canGoPrev =
    getRangeState(currentIndex - 1, minIndex, maxIndex) !== "outOfRange";
  const canGoNext =
    getRangeState(currentIndex + 1, minIndex, maxIndex) !== "outOfRange";
  const canDecreaseYear =
    getRangeState(
      monthIndex({ year: period.year - 1, month: 12 }),
      minIndex,
      maxIndex,
    ) !== "outOfRange";
  const canIncreaseYear =
    getRangeState(
      monthIndex({ year: period.year + 1, month: 1 }),
      minIndex,
      maxIndex,
    ) !== "outOfRange";

  return (
    <Group className={groupVariants()}>
      <Button
        aria-label="Previous period"
        isDisabled={!canGoPrev}
        className={periodChangeButtonVariants()}
        onPress={() => setPeriod((prev) => shiftMonth(prev, -1))}
      >
        {iconMap({ icon: "chevronLeft" })}
      </Button>
      <DialogTrigger aria-label="Period picker">
        <Button className={dialogButtonVariants()}>
          {MONTH_LABELS[period.month - 1]} {period.year}
          {currentState === "buffered" && <NoDataDot />}
          {iconMap({
            icon: "chevronDown",
            className: "h-3 w-3 text-stone-500",
          })}
        </Button>
        <Popover placement="bottom start">
          <Dialog className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-xl duration-75">
            {({ close }) => (
              <>
                <div
                  aria-label="year stepper"
                  className="flex w-full flex-row items-center justify-between"
                >
                  <Button
                    aria-label="decrease year"
                    isDisabled={!canDecreaseYear}
                    className="text-stone-500 hover:text-stone-900"
                    onClick={() =>
                      setPeriod((prev) => ({ ...prev, year: prev.year - 1 }))
                    }
                  >
                    {iconMap({
                      icon: "chevronLeft",
                      className: "h-4 w-4",
                    })}
                  </Button>
                  <div
                    aria-label="selected year"
                    className="text-sm font-semibold text-stone-900"
                  >
                    {period.year}
                  </div>
                  <Button
                    aria-label="increase year"
                    isDisabled={!canIncreaseYear}
                    className="text-stone-500 hover:text-stone-900"
                    onClick={() =>
                      setPeriod((prev) => ({ ...prev, year: prev.year + 1 }))
                    }
                  >
                    {iconMap({
                      icon: "chevronRight",
                      className: "h-4 w-4 text-stone-500 hover:text-stone-900",
                    })}
                  </Button>
                </div>
                <div
                  aria-label="divider"
                  className="h-px w-full bg-stone-200"
                />
                <ListBox
                  aria-label="Month"
                  selectionMode="single"
                  layout="grid"
                  onSelectionChange={(keys: Selection) => {
                    const month = Number([...keys][0]);
                    setPeriod((prev) => ({ ...prev, month }));
                    close();
                  }}
                  className={listBoxVariants({ columns: 4 })}
                >
                  {MONTH_LABELS.map((label, index) => {
                    const month = index + 1;
                    const state = getRangeState(
                      monthIndex({ year: period.year, month }),
                      minIndex,
                      maxIndex,
                    );
                    return (
                      <ListBoxItem
                        key={label}
                        id={String(month)}
                        textValue={label}
                        isDisabled={state === "outOfRange"}
                        className={listBoxItemVariants({
                          isSelected: period.month === month,
                          isDisabled: state === "outOfRange",
                        })}
                      >
                        {label}
                        {state === "buffered" && <NoDataDot />}
                      </ListBoxItem>
                    );
                  })}
                </ListBox>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
      <Button
        aria-label="Next period"
        isDisabled={!canGoNext}
        className={periodChangeButtonVariants()}
        onPress={() => setPeriod((prev) => shiftMonth(prev, 1))}
      >
        {iconMap({ icon: "chevronRight" })}
      </Button>
    </Group>
  );
}

function YearPicker({ dateRange, setPeriodDates, bounds }: PickerProps) {
  const [period, setPeriod] = useState({ year: getYear(dateRange.start) });

  useEffect(() => {
    setPeriodDates(getDateRange(period));
  }, [period, setPeriodDates]);

  const minYear = getYear(bounds.start);
  const maxYear = getYear(bounds.end);
  const currentState = getRangeState(period.year, minYear, maxYear);

  const canGoPrev =
    getRangeState(period.year - 1, minYear, maxYear) !== "outOfRange";
  const canGoNext =
    getRangeState(period.year + 1, minYear, maxYear) !== "outOfRange";

  return (
    <Group className={groupVariants()}>
      <Button
        aria-label="Previous period"
        isDisabled={!canGoPrev}
        className={periodChangeButtonVariants()}
        onPress={() => setPeriod((prev) => ({ year: prev.year - 1 }))}
      >
        {iconMap({ icon: "chevronLeft" })}
      </Button>
      <div className={dialogButtonVariants()}>
        {period.year}
        {currentState === "buffered" && <NoDataDot />}
      </div>
      <Button
        aria-label="Next period"
        isDisabled={!canGoNext}
        className={periodChangeButtonVariants()}
        onPress={() => setPeriod((prev) => ({ year: prev.year + 1 }))}
      >
        {iconMap({ icon: "chevronRight" })}
      </Button>
    </Group>
  );
}
