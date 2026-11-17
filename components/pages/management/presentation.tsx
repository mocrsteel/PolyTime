/**
 * Small presentation primitives shared by the management panels and editor.
 * Keeping them here avoids duplicating the workspace's accessible action styles.
 */
import {
  Button as AriaButton,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  type Key,
} from "react-aria-components";
import { IoChevronDownOutline } from "react-icons/io5";
import { fieldClass, labelClass } from "./model";

export function IconAction({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <AriaButton
      type="button"
      aria-label={label}
      onPress={onClick}
      className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600"
    >
      {children}
    </AriaButton>
  );
}

export type ManagementOption = { value: string; label: string };

export function ManagementSelect({
  label,
  options,
  name,
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  isRequired = false,
  placeholder,
}: {
  label: string;
  options: ManagementOption[];
  name?: string;
  selectedKey?: Key | null;
  defaultSelectedKey?: Key | null;
  onSelectionChange?: (key: Key | null) => void;
  isRequired?: boolean;
  placeholder?: string;
}) {
  return (
    <Select
      name={name}
      {...(selectedKey !== undefined
        ? { selectedKey }
        : { defaultSelectedKey })}
      onSelectionChange={onSelectionChange}
      isRequired={isRequired}
      placeholder={placeholder}
      className={labelClass}
    >
      <Label>{label}</Label>
      <AriaButton
        aria-label={label}
        className={`${fieldClass} flex items-center justify-between gap-2 text-left`}
      >
        <SelectValue className="min-w-0 flex-1 truncate" />
        <IoChevronDownOutline className="h-4 w-4 shrink-0" />
      </AriaButton>
      <Popover className="z-60 w-(--trigger-width) overflow-auto rounded-md border border-slate-200 bg-white shadow-lg">
        <ListBox
          className="max-h-60 overflow-auto p-1 outline-none"
          items={options}
        >
          {(option: ManagementOption) => (
            <ListBoxItem
              id={option.value}
              textValue={option.label}
              className="cursor-pointer rounded px-3 py-2 text-sm outline-none focus:bg-slate-100 selected:font-semibold"
            >
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}