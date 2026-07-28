"use client"
import {useState} from "react";
import Button from "@/components/ui/Button";
import {Minus, Plus} from "@/components/Icons";
import {TextField, Input, FieldError, TextFieldProps, ValidationResult} from "react-aria-components/TextField";

type DurationInputProps = TextFieldProps & {
  readonly entryId: number;
  time: number;
  props?: TextFieldProps;
}

type DurationInputState = {
  readonly entryId: number;
  time: number;
}

/**
 * Validates the input and formats it to a duration string.
 *
 * > Intended to be used as the TextField validation function.
 *
 * Returning a string when validation fails, as it's output will be passed to FieldError.
 * Elegantly setting the correct time in the same function.
 * @param value string variation of the value.
 * @param setTime function to set the time into the component state.
 *
 * TODO: Future feature: Validate on maximum based on region or employment rules.
 */
function inputValidation(value: string): string | null {
  const durationRegex = /^(?<hours>[0-9]+)(\s*h\s*|\s*:\s*)?(?<minutes>[0-9]+)(m)?$/;
  const floatRegex = /^[0-9]+(\.[0-9]+)?$/;

  if (durationRegex.test(value)) {
    const result = durationRegex.exec(value);
    if (result?.groups) {
      // const hours = parseFloat(result.groups.hours);
      // const minutes = result.groups.minutes ? parseFloat(result.groups.minutes) : 0;
      // const time = hours + minutes / 60;
      // setTime(time)
      return null
    } else {
      return "Invalid duration input. Examples of valid inputs: 8.5, 8:30, 8h 30m, 8h30m.";
    }
  } else if (floatRegex.test(value)) {
    const time = parseFloat(value);
    if (time >= 0 && time <= 168) {
      // setTime(time)
      return null
    } else {
      return "Invalid duration input. Maximum is 24 hours.";
    }
  } else {
    return "Invalid duration input. Examples of valid inputs: 8.5, 8:30, 8h 30m, 8h30m.";
  }
}

function inputTransform(value: string, setTime: (val: number) => void): void {
  const durationRegex = /^(?<hours>[0-9]+)(\s*h\s*|\s*:\s*)?(?<minutes>[0-9]+)(m)?$/;
  const floatRegex = /^[0-9]+(\.[0-9]+)?$/;

  if (durationRegex.test(value)) {
    const result = durationRegex.exec(value);
    if (result?.groups) {
      const hours: number = parseFloat(result.groups.hours);
      const minutes: number = result.groups.minutes ? parseFloat(result.groups.minutes) : 0;
      const time = hours + minutes / 60;
      setTime(time);
    }
  } else if (floatRegex.test(value)) {
    const time: number = parseFloat(value);
    setTime(time);
  } else {
    setTime(0);
  }
}

/**
 * Formats a float to a duration string in the format of "Xh Ym".
 * @param value the amount of hours to be formatted into a string.
 */
function formatDuration(value: number): string {
  const hours = Math.floor(value);
  const minutes = Math.round((value - hours) * 60);
  return `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
}

export default function DurationInput(props: DurationInputProps) {
  // const [entry, setEntry] = useState<DurationInputState>({entryId: 0, time: 0});
  const [entry, setEntry] = useState<DurationInputState>({entryId: 0, time: 8.25});
  const [inputValue, setInputValue] = useState<string>("0h 00m");
  const isInvalid = true // inputValidation(inputValue);


  return (
    <form aria-label="Duration input" id={`duration-input-${entry.entryId}`}
          className="flex flex-row items-center gap-1">
      <Button tiny onClick={() => {}}>
        <Minus className="h-3 w-3 text-polytime-muted"/>
      </Button>
      <TextField {...props}>
        <Input
          placeholder="0h 0m"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // value={formatDuration(entry.time)}
          // onChange={(e) => inputTransform(e.target.value, (time) => setEntry({...entry, time}))}
          className="w-12 text-center text-sm -webkit-appearance-none bg-transparent"/>
      </TextField>
      <Button tiny onClick={() => {}}>
        <Plus className="h-3 w-3 text-polytime-muted"/></Button>
      <FieldError className={"text-xs text-red-500"}>{(validationDetails) => {
        return validationDetails.isInvalid ? validationDetails.validationErrors : null
      }}</FieldError>
    </form>
  )
}
