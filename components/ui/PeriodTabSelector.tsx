import {
  Tab as RACTab,
  TabList as RACTabList,
  SelectionIndicator,
} from "react-aria-components/Tabs";
import { tv } from "tailwind-variants";

const TabListVariants = tv({
  base: "border-polytime-line shadow-soft z-9 h-10 flex w-fit flex-row overflow-x-auto overflow-y-clip rounded-md bg-gray-200",
});

const TabItemVariants = tv({
  base: "selected:font-semibold selected:text-white relative z-9 flex cursor-pointer items-center justify-center px-6 py-auto text-sm text-xs font-medium first:rounded-l-md last:rounded-r-md",
});

const SelectionIndicatorVariants = tv({
  base: "last:rounded-r-ml shadow-action border-polytime-line absolute bottom-0 left-0 z-10 h-full w-full cursor-pointer scrollbar-none bg-black/50 mix-blend-difference transition-[translate,width,height] duration-400 first:rounded-l-md first:border-r",
});

export type PeriodTabKeys = "month" | "quarter" | "year"

export default function PeriodTabSelector() {
  return (
    <RACTabList className={TabListVariants()}>
      <RACTab className={TabItemVariants()} id="month">
        <p className="z-11">Month</p>
        <SelectionIndicator className={SelectionIndicatorVariants()} />
      </RACTab>
      <RACTab className={TabItemVariants()} id="quarter">
        <p className="z-11">Quarter</p>
        <SelectionIndicator className={SelectionIndicatorVariants()} />
      </RACTab>
      <RACTab className={TabItemVariants()} id="year">
        <p className="z-11">Year</p>
        <SelectionIndicator className={SelectionIndicatorVariants()} />
      </RACTab>
    </RACTabList>
  );
}
