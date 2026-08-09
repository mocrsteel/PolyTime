import {
  Tab as RACTab,
  TabList as RACTabList,
  SelectionIndicator,
} from "react-aria-components/Tabs";
import { tv } from "tailwind-variants";

const TabListVariants = tv({
  base: "flex w-fit rounded-md bg-gray-200",
});

const TabItemVariants = tv({
  base: "selected:bg-polytime-teal selected:text-white flex items-center justify-center overflow-hidden px-4 py-2 text-sm font-medium transition-all first:rounded-l-md last:rounded-r-md",
});

export default function PeriodTabSelector() {
  return (
    <RACTabList className={TabListVariants()}>
      <RACTab className={TabItemVariants()} key="month">
        Month
        <SelectionIndicator />
      </RACTab>
      <RACTab className={TabItemVariants()} key="quarter">
        Quarter
        <SelectionIndicator />
      </RACTab>
      <RACTab className={TabItemVariants()} key="year">
        Year
        <SelectionIndicator />
      </RACTab>
    </RACTabList>
  );
}
