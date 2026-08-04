"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  TextField,
  Input,
  FieldError,
  TextFieldProps,
} from "react-aria-components/TextField";
import { Form } from "react-aria-components/Form";

type DurationInputProps = TextFieldProps & {
  readonly entryId: number;
  time: number;
  onSubmit?: () => void;
};

type DurationInputState = {
  readonly entryId: number;
  time: number;
};

/**
 * Validates the input and formats it to a duration string.
 *
 * > Intended to be used as the TextField validation function.
 *
 * Returning a string when validation fails, as it's output will be passed to FieldError.
 * Elegantly setting the correct time in the same function.
 * @param value string variation of the value.
 *
 * TODO: Future feature: Validate on maximum based on region or employment rules.
 */
export function inputValidation(value: string): string | undefined {
  const durationRegex = /^(?<hours>\d+)\s*[h:]\s*(?<minutes>[0-5]?\d)?\s*m?$/;
  const floatRegex = /^(?<hours>\d+(?:\.\d+)?)$/;

  if (!durationRegex.test(value) && !floatRegex.test(value)) {
    return "Invalid duration input. Examples of valid inputs: 8.5, 8:30, 8h 30m, 8h30m.";
  }
}

/**
 * Parses the input value and sets the time in the component state.
 * @param value the input value to be parsed.
 * @param entry the current entry state.
 * @param setInputValue function to set the input value in the component state.
 * @param setEntryTime function to set the entry time in the component state.
 */
export function parseInput(
  value: string,
  entry: {
    entryId: number;
    time: number;
  },
  setInputValue: (value: string) => void,
  setEntryTime: ({ entryId, time }: { entryId: number; time: number }) => void,
): void {
  const durationRegex = /^(?<hours>\d+)\s*[h:]\s*(?<minutes>[0-5]?\d)?\s*m?$/;
  const floatRegex = /^(?<hours>\d+(?:\.\d+)?)$/;

  if (durationRegex.test(value)) {
    const result = durationRegex.exec(value);
    if (result?.groups) {
      const hours: number = parseFloat(result.groups.hours);
      const minutes: number = result.groups.minutes
        ? parseFloat(result.groups.minutes)
        : 0;
      const time = hours + minutes / 60;
      setInputValue(formatDuration(time));
      setEntryTime({ ...entry, time: time });
    } else {
      setInputValue(formatDuration(0));
      setEntryTime({ ...entry, time: 0 });
    }
  } else if (floatRegex.test(value)) {
    const time: number = parseFloat(value);
    setInputValue(formatDuration(time));
    setEntryTime({ ...entry, time: time });
  } else {
    setInputValue(formatDuration(0));
    setEntryTime({ ...entry, time: 0 });
  }
}

/**
 * Formats a float to a duration string in the format of "Xh Ym".
 * @param value the amount of hours to be formatted into a string.
 */
export function formatDuration(value: number): string {
  const valueMinutes = Math.round(value * 60);
  const hours = Math.floor(valueMinutes / 60);
  const minutes = valueMinutes % 60;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

/**
 * Renders a TextField component that allows the user to input a duration.
 * @param props the props for the TextField component.
 * @returns a TextField component that allows the user to input a duration.
 */
export default function DurationInput(props: DurationInputProps) {
  // const [entry, setEntry] = useState<DurationInputState>({entryId: 0, time: 0});
  console.log(props.time);
  const [entry, setEntry] = useState<DurationInputState>({
    entryId: props.entryId,
    time: props.time,
  });
  const [inputValue, setInputValue] = useState<string>(
    formatDuration(props.time),
  );
  const [touched, setTouched] = useState<boolean>(false);

  function add15Min() {
    setEntry({ ...entry, time: entry.time + 0.25 });
    setInputValue(formatDuration(entry.time + 0.25));
  }

  function remove15Min() {
    if (entry.time - 0.25 < 0) return;

    setEntry({ ...entry, time: entry.time - 0.25 });
    setInputValue(formatDuration(entry.time - 0.25));
  }

  function submit(
    e: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>,
  ) {
    e.preventDefault();
    parseInput(inputValue, entry, setInputValue, setEntry);
    setTouched(true);
  }

  return (
    <Form id={`form-duration-${entry.entryId}`} onSubmit={submit}>
      <TextField
        name="duration"
        aria-label="Duration input"
        id={`duration-textfield-${entry.entryId}`}
        validate={(value) => {
          if (!touched) return undefined;
          if (!value.trim()) return undefined;

          return inputValidation(value);
        }}
        validationBehavior="aria"
        className="flex flex-col content-center gap-1"
      >
        <div className="flex flex-row content-center items-center gap-1">
          <Button
            id={`btn-minus-${entry.entryId}`}
            aria-label="Subtract time button"
            size="tiny"
            icon="minus"
            onClick={remove15Min}
          />
          <Input
            id={`duration-input-${entry.entryId}`}
            placeholder="0:00"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={submit}
            className="-webkit-appearance-none w-16 bg-transparent text-center text-sm"
          />
          <Button
            id={`btn-plus-${entry.entryId}`}
            aria-label="Add time button"
            size="tiny"
            icon="plus"
            onClick={add15Min}
          />
        </div>
        <FieldError className={"text-xs font-semibold text-red-500"} />
      </TextField>
    </Form>
  );
}
