"use client";

import { useState } from "react";
import { Form } from "react-aria-components/Form";
import { Label } from "react-aria-components/Label";
import { Input } from "react-aria-components/Input";
import { FieldError } from "react-aria-components/FieldError";
import { Button } from "react-aria-components/Button";
import { TextField } from "react-aria-components/TextField";

export interface BusinessUnitFormAsset {
  name: string;
  description: string;
}

export interface BusinessUnitFormValues {
  name: string;
  description: string;
  assets: BusinessUnitFormAsset[];
}

export interface BusinessUnitFormProps {
  onSubmit?: (values: BusinessUnitFormValues) => void;
}

const fieldLabel = "text-polytime-muted text-sm mb-1";
const fieldBox =
  "flex items-center outline-slate-200 outline rounded-lg px-4 py-2 shadow-inner bg-white focus-within:outline-polytime-teal focus-within:outline-2";
const errorText = "text-red-600 text-xs mt-1";

export default function BusinessUnitForm({ onSubmit }: BusinessUnitFormProps) {
  const [assetRows, setAssetRows] = useState([0]);
  const [nextAssetRow, setNextAssetRow] = useState(1);

  return (
    <div>
      <span className="text-polytime-teal text-xs tracking-wider uppercase">
        Organization
      </span>
      <h1 className="mt-2 text-xl font-bold">Create business unit</h1>
      <Form
        className="mt-4 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const assetNames = data.getAll("assetName").map(String);
          const assetDescriptions = data.getAll("assetDescription").map(String);

          onSubmit?.({
            name: String(data.get("name") ?? "").trim(),
            description: String(data.get("description") ?? "").trim(),
            assets: assetNames.map((name, index) => ({
              name: name.trim(),
              description: (assetDescriptions[index] ?? "").trim(),
            })),
          });
        }}
      >
        <TextField name="name" isRequired className="flex flex-col">
          <Label className={fieldLabel}>Business unit name</Label>
          <Input
            placeholder="e.g. Operations"
            className={`${fieldBox} focus:outline-polytime-teal focus:outline-2`}
          />
          <FieldError className={errorText} />
        </TextField>

        <TextField name="description" className="flex flex-col">
          <Label className={fieldLabel}>
            Description <i>(optional)</i>
          </Label>
          <Input
            placeholder="What this business unit is responsible for"
            className={`${fieldBox} focus:outline-polytime-teal focus:outline-2`}
          />
        </TextField>

        <fieldset className="flex flex-col gap-4 rounded-lg bg-slate-50 px-4 py-3">
          <legend className="text-polytime-muted text-sm font-bold">
            Assets
          </legend>
          {assetRows.map((row, index) => (
            <section key={row} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Asset {index + 1}</h2>
                {assetRows.length > 1 && (
                  <Button
                    type="button"
                    aria-label={`Remove asset ${index + 1}`}
                    onPress={() =>
                      setAssetRows((rows) =>
                        rows.filter((item) => item !== row),
                      )
                    }
                    className="text-polytime-muted cursor-pointer text-sm underline"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <TextField name="assetName" isRequired className="flex flex-col">
                <Label className={fieldLabel}>Asset name</Label>
                <Input
                  placeholder="e.g. Plant North"
                  className={`${fieldBox} focus:outline-polytime-teal focus:outline-2`}
                />
                <FieldError className={errorText} />
              </TextField>
              <TextField name="assetDescription" className="flex flex-col">
                <Label className={fieldLabel}>
                  Description <i>(optional)</i>
                </Label>
                <Input
                  placeholder="A short description of this asset"
                  className={`${fieldBox} focus:outline-polytime-teal focus:outline-2`}
                />
              </TextField>
            </section>
          ))}
          <Button
            type="button"
            onPress={() => {
              setAssetRows((rows) => [...rows, nextAssetRow]);
              setNextAssetRow((row) => row + 1);
            }}
            className="text-polytime-teal cursor-pointer self-start text-sm font-semibold"
          >
            + Add another asset
          </Button>
        </fieldset>

        <Button
          type="submit"
          className="bg-polytime-teal cursor-pointer rounded-lg px-4 py-2 font-semibold text-white"
        >
          Create business unit
        </Button>
      </Form>
    </div>
  );
}
