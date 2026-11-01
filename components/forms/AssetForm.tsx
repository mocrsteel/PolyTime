"use client";

import { Form } from "react-aria-components/Form";
import { Label } from "react-aria-components/Label";
import { Input } from "react-aria-components/Input";
import { FieldError } from "react-aria-components/FieldError";
import { Button } from "react-aria-components/Button";
import { Popover } from "react-aria-components/Popover";
import { ListBox, ListBoxItem } from "react-aria-components/ListBox";
import { Select, SelectValue } from "react-aria-components/Select";
import { TextField } from "react-aria-components/TextField";
import { IoChevronDown } from "react-icons/io5";

export interface AssetFormBusinessUnit {
  id: string;
  name: string;
}

export interface AssetFormValues {
  name: string;
  description: string;
  businessUnitId: string;
}

export interface AssetFormProps {
  businessUnits: AssetFormBusinessUnit[];
  onSubmit?: (values: AssetFormValues) => void;
}

const fieldLabel = "text-polytime-muted text-sm mb-1";
const fieldBox =
  "flex items-center outline-slate-200 outline rounded-lg px-4 py-2 shadow-inner bg-white focus-within:outline-polytime-teal focus-within:outline-2";
const errorText = "text-red-600 text-xs mt-1";
const popoverBox = "bg-white rounded-lg shadow-lg outline outline-slate-200";

export default function AssetForm({ businessUnits, onSubmit }: AssetFormProps) {
  return (
    <div>
      <span className="text-polytime-teal text-xs tracking-wider uppercase">
        Organization
      </span>
      <h1 className="mt-2 text-xl font-bold">Create asset</h1>
      <Form
        className="mt-4 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          onSubmit?.({
            name: String(data.get("name") ?? "").trim(),
            description: String(data.get("description") ?? "").trim(),
            businessUnitId: String(data.get("businessUnitId") ?? ""),
          });
        }}
      >
        <Select name="businessUnitId" isRequired className="flex flex-col">
          <Label className={fieldLabel}>Business unit</Label>
          <Button className={`${fieldBox} justify-between`}>
            <SelectValue />
            <IoChevronDown />
          </Button>
          <FieldError className={errorText} />
          <Popover
            className={`${popoverBox} w-(--trigger-width) overflow-auto`}
          >
            <ListBox className="p-1 outline-none" items={businessUnits}>
              {(businessUnit) => (
                <ListBoxItem
                  id={businessUnit.id}
                  textValue={businessUnit.name}
                  className="focused:bg-slate-100 selected:font-semibold cursor-pointer rounded-md px-3 py-2 text-sm outline-none"
                >
                  {businessUnit.name}
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </Select>

        <TextField name="name" isRequired className="flex flex-col">
          <Label className={fieldLabel}>Asset name</Label>
          <Input
            placeholder="e.g. Plant North"
            className={`${fieldBox} focus:outline-polytime-teal focus:outline-2`}
          />
          <FieldError className={errorText} />
        </TextField>

        <TextField name="description" className="flex flex-col">
          <Label className={fieldLabel}>
            Description <i>(optional)</i>
          </Label>
          <Input
            placeholder="A short description of this asset"
            className={`${fieldBox} focus:outline-polytime-teal focus:outline-2`}
          />
        </TextField>

        <Button
          type="submit"
          className="bg-polytime-teal cursor-pointer rounded-lg px-4 py-2 font-semibold text-white"
        >
          Create asset
        </Button>
      </Form>
    </div>
  );
}
