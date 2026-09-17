import { describe, it, expect, vi } from "vitest";
import {
  formatDuration,
  inputValidation,
  parseInput,
} from "@/components/ui/timesheet/DurationInput";

describe("formatDuration", () => {
  it("formats whole hours with zero-padded minutes", () => {
    expect(formatDuration(8)).toBe("8:00");
  });

  it("formats fractional hours into minutes", () => {
    expect(formatDuration(8.5)).toBe("8:30");
  });

  it("zero-pads minutes below 10", () => {
    expect(formatDuration(1 + 5 / 60)).toBe("1:05");
  });

  it("formats zero duration", () => {
    expect(formatDuration(0)).toBe("0:00");
  });

  it("rounds to the nearest hour when it's almost there", () => {
    expect(formatDuration(0.999)).toBe("1:00");
  })
  it("rounds minutes to the nearest whole minute", () => {
    expect(formatDuration(1 + 29.6 / 60)).toBe("1:30");
  });
});

describe("inputValidation", () => {
  it.each([
    ["8.5"],
    ["8"],
    ["8:30"],
    ["8h 30m"],
    ["8h30m"],
    ["8h"],
  ])("accepts valid duration input '%s'", (value) => {
    expect(inputValidation(value)).toBeUndefined();
  });

  it.each([
    ["8h75m"],
    ["abc"],
    ["8:75"],
    [""],
    ["-8"],
  ])("rejects invalid duration input '%s'", (value) => {
    expect(inputValidation(value)).toBe(
      "Invalid duration input. Examples of valid inputs: 8.5, 8:30, 8h 30m, 8h30m.",
    );
  });
});

describe("parseInput", () => {
  const entry = { entryId: 1, time: 0 };

  it("parses a decimal value", () => {
    const setInputValue = vi.fn();
    const setEntryTime = vi.fn();

    parseInput("8.5", entry, setInputValue, setEntryTime);

    expect(setEntryTime).toHaveBeenCalledWith({ ...entry, time: 8.5 });
    expect(setInputValue).toHaveBeenCalledWith("8:30");
  });

  it("parses an 'Hh Mm' formatted value", () => {
    const setInputValue = vi.fn();
    const setEntryTime = vi.fn();

    parseInput("8h 30m", entry, setInputValue, setEntryTime);

    expect(setEntryTime).toHaveBeenCalledWith({ ...entry, time: 8.5 });
    expect(setInputValue).toHaveBeenCalledWith("8:30");
  });

  it("parses an 'H:MM' formatted value", () => {
    const setInputValue = vi.fn();
    const setEntryTime = vi.fn();

    parseInput("8:15", entry, setInputValue, setEntryTime);

    expect(setEntryTime).toHaveBeenCalledWith({ ...entry, time: 8.25 });
    expect(setInputValue).toHaveBeenCalledWith("8:15");
  });

  it("falls back to zero for an unparsable value", () => {
    const setInputValue = vi.fn();
    const setEntryTime = vi.fn();

    parseInput("not a duration", entry, setInputValue, setEntryTime);

    expect(setEntryTime).toHaveBeenCalledWith({ ...entry, time: 0 });
    expect(setInputValue).toHaveBeenCalledWith("0:00");
  });
});
