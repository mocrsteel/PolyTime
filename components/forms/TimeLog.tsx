"use client";

import { useState } from "react";
import {
  today,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";
import { Form } from "react-aria-components/Form";
import { Label } from "react-aria-components/Label";
import { Input } from "react-aria-components/Input";
import { Text } from "react-aria-components/Text";
import { FieldError } from "react-aria-components/FieldError";
import { Button } from "react-aria-components/Button";
import { Group } from "react-aria-components/Group";
import { Heading } from "react-aria-components/Heading";
import { Popover } from "react-aria-components/Popover";
import { Dialog } from "react-aria-components/Dialog";
import { ListBox, ListBoxItem } from "react-aria-components/ListBox";
import { ComboBox } from "react-aria-components/ComboBox";
import { Select, SelectValue } from "react-aria-components/Select";
import { useFilter } from "react-aria-components/Autocomplete";
import type { Key } from "react-aria-components";
import { TextField } from "react-aria-components/TextField";
import { DatePicker } from "react-aria-components/DatePicker";
import { DateInput, DateSegment } from "react-aria-components/DateField";
import {
  Calendar,
  CalendarGrid,
  CalendarCell,
} from "react-aria-components/Calendar";
import {
  IoCalendarOutline,
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";

export interface TimeLogBusinessUnit {
  id: string;
  name: string;
}

export interface TimeLogAsset {
  id: string;
  name: string;
  businessUnitId: string;
}

export interface TimeLogProject {
  id: string;
  name: string;
  businessUnit: TimeLogBusinessUnit;
  asset: TimeLogAsset;
}

export interface TimeLogNewProject {
  name: string;
  businessUnitId: string;
  assetId: string;
}

export interface TimeLogValues {
  date: string;
  hours: number;
  projectId?: string;
  newProject?: TimeLogNewProject;
}

export interface TimeLogProps {
  projects?: TimeLogProject[];
  businessUnits?: TimeLogBusinessUnit[];
  assets?: TimeLogAsset[];
  defaultDate?: DateValue;
  defaultProjectId?: string;
  defaultHours?: string;
  onSubmit?: (values: TimeLogValues) => void;
}

const DEFAULT_BUSINESS_UNITS: TimeLogBusinessUnit[] = [
  { id: "retail", name: "Retail" },
  { id: "it", name: "IT" },
];

const DEFAULT_ASSETS: TimeLogAsset[] = [
  { id: "webshop", name: "Webshop", businessUnitId: "retail" },
  { id: "app", name: "Mobile app", businessUnitId: "retail" },
  { id: "platform", name: "Internal platform", businessUnitId: "it" },
];

const DEFAULT_PROJECTS: TimeLogProject[] = [
  {
    id: "website",
    name: "Website redesign",
    businessUnit: DEFAULT_BUSINESS_UNITS[0],
    asset: DEFAULT_ASSETS[0],
  },
  {
    id: "mobile",
    name: "Mobile app",
    businessUnit: DEFAULT_BUSINESS_UNITS[0],
    asset: DEFAULT_ASSETS[1],
  },
  {
    id: "internal",
    name: "Internal tooling",
    businessUnit: DEFAULT_BUSINESS_UNITS[1],
    asset: DEFAULT_ASSETS[2],
  },
  {
    id: "support",
    name: "Customer support",
    businessUnit: DEFAULT_BUSINESS_UNITS[1],
    asset: DEFAULT_ASSETS[2],
  },
];

const NEW_PROJECT_KEY = "__new__";

type PickerOption = { id: string; name: string };

function OptionSelect({
  label,
  options,
  selectedKey,
  onChange,
  isDisabled,
  placeholder,
}: {
  label: string;
  options: PickerOption[];
  selectedKey: string | null;
  onChange: (key: string) => void;
  isDisabled?: boolean;
  placeholder: string;
}) {
  return (
    <Select
      isRequired
      isDisabled={isDisabled}
      placeholder={placeholder}
      selectedKey={selectedKey}
      onSelectionChange={(key: Key | null) =>
        key != null && onChange(String(key))
      }
      className="flex flex-col"
    >
      <Label className="text-polytime-muted mb-1 text-sm">{label}</Label>
      <Button className="flex items-center justify-between rounded-lg bg-white px-4 py-2 shadow-inner outline outline-slate-200 disabled:opacity-50">
        <SelectValue />
        <IoChevronDown />
      </Button>
      <Popover className="w-(--trigger-width) overflow-auto rounded-lg bg-white shadow-lg outline outline-slate-200">
        <ListBox className="p-1 outline-none" items={options}>
          {(o: PickerOption) => (
            <ListBoxItem
              id={o.id}
              textValue={o.name}
              className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none data-[focused]:bg-slate-100 data-[selected]:font-semibold"
            >
              {o.name}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}

const HOURS_PATTERN = /^\d{1,2}([.,]\d{1,2})?$/;

function validateHours(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Enter the number of hours.";
  if (!HOURS_PATTERN.test(trimmed)) return "Use a number such as 8 or 8.5.";
  const hours = Number(trimmed.replace(",", "."));
  if (hours <= 0 || hours > 24) return "Hours must be between 0 and 24.";
  return null;
}

const fieldLabel = "text-polytime-muted text-sm mb-1";
const fieldBox =
  "flex items-center outline-slate-200 outline rounded-lg px-4 py-2 shadow-inner bg-white focus-within:outline-polytime-teal focus-within:outline-2";
const errorText = "text-red-600 text-xs mt-1";
const popoverBox = "bg-white rounded-lg shadow-lg outline outline-slate-200";

export default function TimeLog({
  projects = DEFAULT_PROJECTS,
  businessUnits = DEFAULT_BUSINESS_UNITS,
  assets = DEFAULT_ASSETS,
  defaultDate,
  defaultProjectId,
  defaultHours = "",
  onSubmit,
}: TimeLogProps) {
  const [date, setDate] = useState<DateValue | null>(
    defaultDate ?? today(getLocalTimeZone()),
  );
  const { contains } = useFilter({ sensitivity: "base" });
  const [projectKey, setProjectKey] = useState<Key | null>(
    defaultProjectId ?? null,
  );
  const [projectInput, setProjectInput] = useState(
    projects.find((p) => p.id === defaultProjectId)?.name ?? "",
  );
  const [newBuId, setNewBuId] = useState<string | null>(null);
  const [newAssetId, setNewAssetId] = useState<string | null>(null);

  const isNew = projectKey === NEW_PROJECT_KEY;
  const selected = projects.find((p) => p.id === projectKey);
  const query = projectInput.trim();
  const items: (
    TimeLogProject | { id: typeof NEW_PROJECT_KEY; name: string }
  )[] = [
    ...projects.filter(
      (p) =>
        !query ||
        selected?.name === projectInput ||
        [p.name, p.businessUnit.name, p.asset.name].some((s) =>
          contains(s, query),
        ),
    ),
  ];
  const exactMatch = projects.some(
    (p) => p.name.toLowerCase() === query.toLowerCase(),
  );
  if (query && (!exactMatch || isNew))
    items.push({ id: NEW_PROJECT_KEY, name: query });
  const assetOptions = assets.filter((a) => a.businessUnitId === newBuId);

  return (
    <div>
      <span className="text-polytime-teal text-xs tracking-wider uppercase">
        New time log
      </span>
      <h1 className="mt-2 text-xl font-bold">Add time</h1>
      <Form
        className="mt-4 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          onSubmit?.({
            date: String(data.get("date") ?? ""),
            hours: Number(String(data.get("hours")).replace(",", ".")),
            ...(isNew
              ? {
                  newProject: {
                    name: query,
                    businessUnitId: newBuId!,
                    assetId: newAssetId!,
                  },
                }
              : { projectId: String(projectKey) }),
          });
        }}
      >
        <DatePicker
          name="date"
          value={date}
          onChange={setDate}
          isRequired
          className="flex flex-col"
        >
          <Label className={fieldLabel}>Date</Label>
          <Group className={`${fieldBox} justify-between`}>
            <DateInput className="flex">
              {(segment) => (
                <DateSegment
                  segment={segment}
                  className="focus:bg-polytime-teal rounded px-0.5 outline-none focus:text-white data-[placeholder]:text-slate-400"
                />
              )}
            </DateInput>
            <Button aria-label="Open calendar" className="outline-none">
              <IoCalendarOutline />
            </Button>
          </Group>
          <FieldError className={errorText} />
          <Popover className={`${popoverBox} p-3`}>
            <Dialog className="outline-none">
              <Calendar>
                <header className="mb-2 flex items-center justify-between">
                  <Button slot="previous" aria-label="Previous month">
                    <IoChevronBack />
                  </Button>
                  <Heading className="text-sm font-semibold" />
                  <Button slot="next" aria-label="Next month">
                    <IoChevronForward />
                  </Button>
                </header>
                <CalendarGrid>
                  {(d) => (
                    <CalendarCell
                      date={d}
                      className="data-[selected]:bg-polytime-teal data-[focus-visible]:outline-polytime-teal flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm outline-none hover:bg-slate-100 data-[focus-visible]:outline-2 data-[outside-month]:hidden data-[selected]:text-white"
                    />
                  )}
                </CalendarGrid>
              </Calendar>
            </Dialog>
          </Popover>
        </DatePicker>

        <ComboBox
          name="projectId"
          isRequired
          menuTrigger="focus"
          allowsEmptyCollection
          items={items}
          selectedKey={projectKey}
          inputValue={projectInput}
          onInputChange={setProjectInput}
          onSelectionChange={(key) => {
            setProjectKey(key);
            const project = projects.find((p) => p.id === key);
            if (project) setProjectInput(project.name);
            if (key === NEW_PROJECT_KEY) {
              setNewBuId(null);
              setNewAssetId(null);
            }
          }}
          className="flex flex-col"
        >
          <Label className={fieldLabel}>Project</Label>
          <div className={`${fieldBox} justify-between gap-2`}>
            <Input
              placeholder="Search projects"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
            <Button aria-label="Show projects" className="outline-none">
              <IoChevronDown />
            </Button>
          </div>
          <FieldError className={errorText} />
          <Popover
            className={`${popoverBox} w-(--trigger-width) overflow-auto`}
          >
            <ListBox
              className="p-1 outline-none"
              renderEmptyState={() => (
                <div className="text-polytime-muted px-3 py-2 text-sm">
                  No projects found
                </div>
              )}
            >
              {(item) =>
                "asset" in item ? (
                  <ListBoxItem
                    id={item.id}
                    textValue={item.name}
                    className="flex cursor-pointer flex-col rounded-md px-3 py-2 text-sm outline-none data-[focused]:bg-slate-100 data-[selected]:font-semibold"
                  >
                    <Text slot="label">{item.name}</Text>
                    <Text
                      slot="description"
                      className="text-polytime-muted text-xs font-normal"
                    >
                      {item.businessUnit.name} · {item.asset.name}
                    </Text>
                  </ListBoxItem>
                ) : (
                  <ListBoxItem
                    id={item.id}
                    textValue={item.name}
                    className="text-polytime-teal cursor-pointer rounded-md px-3 py-2 text-sm outline-none data-[focused]:bg-slate-100"
                  >
                    + Create new project “{item.name}”
                  </ListBoxItem>
                )
              }
            </ListBox>
          </Popover>
        </ComboBox>

        {selected && (
          <dl className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 px-4 py-3 text-sm">
            <div>
              <dt className="text-polytime-muted text-xs">Business unit</dt>
              <dd>{selected.businessUnit.name}</dd>
            </div>
            <div>
              <dt className="text-polytime-muted text-xs">Asset</dt>
              <dd>{selected.asset.name}</dd>
            </div>
          </dl>
        )}

        {isNew && (
          <fieldset className="flex flex-col gap-4 rounded-lg bg-slate-50 px-4 py-3">
            <legend className="text-polytime-muted text-sm font-bold">
              New project “{query}”
            </legend>
            <OptionSelect
              label="Business unit"
              placeholder="Select business unit"
              options={businessUnits}
              selectedKey={newBuId}
              onChange={(id) => {
                setNewBuId(id);
                setNewAssetId(null);
              }}
            />
            <OptionSelect
              label="Asset"
              placeholder={
                newBuId ? "Select asset" : "Select a business unit first"
              }
              options={assetOptions}
              selectedKey={newAssetId}
              isDisabled={!newBuId}
              onChange={setNewAssetId}
            />
          </fieldset>
        )}

        <TextField
          name="hours"
          defaultValue={defaultHours}
          isRequired
          inputMode="decimal"
          validate={validateHours}
          className="flex flex-col"
        >
          <Label className={fieldLabel}>Hours</Label>
          <Input
            placeholder="e.g. 8 or 8.5"
            className={`${fieldBox} outline-none`}
          />
          <Text slot="description" className="text-polytime-muted mt-1 text-xs">
            Whole or decimal hours, e.g. 8 or 8.5
          </Text>
          <FieldError className={errorText} />
        </TextField>

        <Button
          type="submit"
          className="bg-polytime-teal cursor-pointer rounded-lg px-4 py-2 font-semibold text-white"
        >
          Add time
        </Button>
      </Form>
    </div>
  );
}
