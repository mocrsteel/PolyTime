import {
  Popover,
  Select as RACSelect,
  SelectProps as RACTSelectProps,
  SelectValue,
} from "react-aria-components/Select";
import {
  ListBox,
  ListBoxItem,
  ListBoxProps,
} from "react-aria-components/ListBox";
import { Autocomplete, useFilter } from "react-aria-components/Autocomplete";
import { SearchField, Input } from "react-aria-components/SearchField";
import { Group } from "react-aria-components/Group";
import { iconMap } from "@/components/Icons";
import { tv } from "tailwind-variants";

export { useSelectState } from "react-stately/useSelectState";
import Button from "./Button";

export type SelectProps<T, M extends "single" | "multiple"> = Omit<
  RACTSelectProps<T, M>,
  "children"
> &
  Pick<ListBoxProps<string>, "renderEmptyState"> & {
    items: Array<string>;
    searchable?: boolean;
  };

const selectButtonVariants = tv({
  base: "text-polytime-ink shadow-soft text-md rounded-lg px-3 py-2 text-sm font-normal",
});

const popoverVariants = tv({
  base: "shadow-soft border-polytime-line z-50 rounded-lg border bg-white p-1 text-sm",
});

const groupVariants = tv({
  base: "flex items-center rounded-full px-3 py-1.5 text-sm inset-shadow-sm outline outline-slate-200 focus-within:outline-slate-300 data-hovered:outline-slate-300",
});

const listboxItemVariants = tv({
  base: "hover:bg-polytime-teal rounded-lg px-4 py-1.5 pl-6 text-sm font-medium hover:text-white",
});

export default function Select<T, M extends "single" | "multiple">({
  items,
  searchable = false,
  ...props
}: SelectProps<T, M>) {
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <RACSelect {...props}>
      <Button
        style="secondary"
        size={"custom"}
        className={selectButtonVariants()}
      >
        <SelectValue />
      </Button>
      <Popover className={popoverVariants()}>
        <Autocomplete filter={contains}>
          {searchable && (
            <SearchField
              aria-label="Search items"
              autoFocus
              style={{ margin: 4 }}
            >
              <Group className={groupVariants()}>
                {iconMap({
                  icon: "search",
                  className: "mr-2 h-4 w-4 text-polytime-muted",
                })}
                <Input className="placeholder-polytime-muted outline-none" />
              </Group>
            </SearchField>
          )}
          <ListBox>
            {items.map((item) => (
              <ListBoxItem
                key={item}
                id={item}
                className={listboxItemVariants()}
              >
                {item}
              </ListBoxItem>
            ))}
          </ListBox>
        </Autocomplete>
      </Popover>
    </RACSelect>
  );
}
