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
import { Key } from "react-aria-components/Tabs";
import { useState } from "react";

export type PeriodPickerProps = {
  /** Period type to pick from. */
  granularity: "month" | "quarter" | "year";
  /** Minimum and maximum year range to display. Can be defined based on database content. */
  dateRange: [Date, Date];
};
//
// /**
//  * Utility function for QuarterPicker
//  * @param startDate
//  * @param endDate
//  * @param selectedYear
//  */
// function updateAvailableQuarters(
//   startDate: Date,
//   endDate: Date = new Date(),
//   selectedYear: number,
// ) {
//   return quarterRange(startDate, endDate)
//     .filter((quarter) => getYear(quarter) === selectedYear)
//     .map((quarter) => format(quarter, "QQQ") as "Q1" | "Q2" | "Q3" | "Q4");
// }
//
// function MonthPicker({
//   dateRange: [startDate, endDate],
// }: Pick<PeriodPickerProps, "dateRange">) {
//   const months = monthRange(startDate, endDate);
//   return (
//     <div>
//       {months.map((month) => (
//         <div key={`${format(month, "yyyy-MM")}`}>
//           {format(month, "MMMM, yyyy")}
//         </div>
//       ))}
//     </div>
//   );
// }
//
// function QuarterPicker({
//   dateRange: [startDate, endDate],
// }: Pick<PeriodPickerProps, "dateRange">) {
//   const [state, setState] = useState({
//     year: getYear(endDate).toString(),
//     quarter: format(endDate, "QQQ") as "Q1" | "Q2" | "Q3" | "Q4",
//   });
//   // into a state variable as quarters to be displayed depends on the selected year.
//   const [quarters, setQuarters] = useState(
//     updateAvailableQuarters(startDate, endDate, getYear(endDate)),
//   );
//   const years = yearRange(startDate, endDate).map((year) =>
//     getYear(year).toString(),
//   );
//
//   function handleYearChange(value: Key | null) {
//     if (value === null) return;
//     const currentYear = getYear(new Date()).toString();
//     const year = value as string;
//     setState((prev) => {
//       if (prev.year === year) {
//         return prev;
//       }
//       if (year === currentYear) {
//         const availableQuarters = updateAvailableQuarters(
//           startDate,
//           endDate,
//           parseInt(year),
//         );
//         if (
//           availableQuarters.indexOf(
//             format(new Date(), "QQQ") as "Q1" | "Q2" | "Q3" | "Q4",
//           ) !== -1
//         ) {
//           /// It seems pointless to redirect to Q1 if you're in the current year.
//           return {
//             year: year,
//             quarter: format(new Date(), "QQQ") as "Q1" | "Q2" | "Q3" | "Q4",
//           };
//         } else {
//           return { year: year, quarter: "Q1" };
//         }
//       }
//       return { year: year, quarter: "Q1" };
//     });
//     setQuarters(updateAvailableQuarters(startDate, endDate, parseInt(year)));
//   }
//
//   function handleQuarterChange(value: Key | null) {
//     if (value === null) return;
//     const quarter = value as "Q1" | "Q2" | "Q3" | "Q4";
//     setState((prev) => {
//       if (prev.quarter === quarter) {
//         return prev;
//       }
//       return { ...prev, quarter: quarter };
//     });
//   }
//
//   return (
//     <Group className="flex flex-row items-center gap-1">
//       <Select
//         className="hover:text-slate-600"
//         aria-label={"select quarter"}
//         items={quarters}
//         selectedKey={state.quarter}
//         defaultSelectedKey={state.quarter}
//         onSelectionChange={handleQuarterChange}
//       />
//       -
//       <Select
//         aria-label={"select year"}
//         items={years}
//         selectedKey={String(state.year)}
//         defaultSelectedKey={String(state.year)}
//         onSelectionChange={handleYearChange}
//       />
//     </Group>
//   );
// }
//
// function YearPicker({
//   dateRange: [startDate, endDate],
// }: Pick<PeriodPickerProps, "dateRange">) {
//   const [year, setYear] = useState(getYear(endDate).toString());
//   const years = yearRange(startDate, endDate).map((year) =>
//     getYear(year).toString(),
//   );
//
//   return (
//     <Select
//       aria-label={"select year"}
//       items={years}
//       selectedKey={year}
//       defaultSelectedKey={year.toString()}
//       onSelectionChange={(value: Key | null) => {
//         if (value === null) return;
//         setYear(value as string);
//       }}
//     />
//   );
// }
//
// /**
//  * Period picker for the timesheet page. Defaults to month picker.
//  * @param period Selected period type to pick from. Should come from PeriodTabSelector.
//  * @param props Any other HTML element prop.
//  * @constructor
//  */
// export default function PeriodPicker({
//   dateRange,
//   granularity = "month",
//   ...props
// }: PeriodPickerProps) {
//   switch (granularity) {
//     case "month":
//       return <MonthPicker dateRange={dateRange} />;
//     case "quarter":
//       return <QuarterPicker dateRange={dateRange} />;
//     case "year":
//       return <YearPicker dateRange={dateRange} />;
//     default:
//       return null;
//   }
// }

const periodChangeButtonVariants = tv({
  base: "h-full px-2 py-1 text-stone-500 hover:text-stone-900",
});
const dialogButtonVariants = tv({
  base: "flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-100 px-4 py-1 text-sm font-semibold text-stone-900 hover:border-stone-300/70 hover:bg-stone-200/50",
});
const listBoxVariants = tv({
  base: "grid grid-cols-2 gap-3 text-sm",
});
const listBoxItemVariants = tv({
  base: "rounded-lg border border-stone-200 bg-stone-50 px-6 py-2 text-stone-500 hover:border-stone-300/70 hover:bg-stone-100 hover:text-stone-900",
  variants: {
    isSelected: {
      true: "border-teal-700 bg-teal-100 text-teal-900",
    },
  },
});

export default function PeriodPicker({
  dateRange,
  granularity = "quarter",
}: PeriodPickerProps) {
  const [period, setPeriod] = useState({ quarter: 1, year: 2026 });
  return (
    <Group className="flex w-fit flex-row items-center rounded-lg border border-stone-200 bg-stone-50">
      <Button
        aria-label="Previous period"
        className={periodChangeButtonVariants()}
        onPress={() => {
          if (period.quarter === 1) {
            setPeriod({ quarter: 4, year: period.year - 1 });
          } else {
            setPeriod({ quarter: period.quarter - 1, year: period.year });
          }
        }}
      >
        {iconMap({ icon: "chevronLeft" })}
      </Button>
      <DialogTrigger aria-label="Period picker">
        <Button className={dialogButtonVariants()}>
          Q{period.quarter} {period.year}
          {iconMap({
            icon: "chevronDown",
            className: "h-3 w-3 text-stone-500",
          })}
        </Button>
        <Popover placement="bottom-start">
          <Dialog className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-xl">
            {({ close }) => (
              <>
                <div
                  aria-label="year stepper"
                  className="flex w-full flex-row items-center justify-between"
                >
                  <Button
                    aria-label="decrease year"
                    className="text-stone-500 hover:text-stone-900"
                    onClick={() =>
                      setPeriod({ ...period, year: period.year - 1 })
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
                    className="text-stone-500 hover:text-stone-900"
                    onClick={() =>
                      setPeriod({ ...period, year: period.year + 1 })
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
                    setPeriod({ ...period, quarter: quarter });
                    close();
                  }}
                  className={listBoxVariants()}
                >
                  <ListBoxItem
                    id="1"
                    className={listBoxItemVariants({
                      isSelected: period.quarter === 1,
                    })}
                  >
                    Q1
                  </ListBoxItem>
                  <ListBoxItem
                    id="2"
                    className={listBoxItemVariants({
                      isSelected: period.quarter === 2,
                    })}
                  >
                    Q2
                  </ListBoxItem>
                  <ListBoxItem
                    id="3"
                    className={listBoxItemVariants({
                      isSelected: period.quarter === 3,
                    })}
                  >
                    Q3
                  </ListBoxItem>
                  <ListBoxItem
                    id="4"
                    className={listBoxItemVariants({
                      isSelected: period.quarter === 4,
                    })}
                  >
                    Q4
                  </ListBoxItem>
                </ListBox>
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
      <Button
        aria-label="Next period"
        className={periodChangeButtonVariants()}
        onPress={() => {
          if (period.quarter === 4) {
            setPeriod({ quarter: 1, year: period.year + 1 });
          } else {
            setPeriod({ quarter: period.quarter + 1, year: period.year });
          }
        }}
      >
        {iconMap({ icon: "chevronRight" })}
      </Button>
    </Group>
  );
}
