import { describe, it, expect } from "vitest";
import {
  isCurrentWeek,
  getWeekStartEnd,
} from "@/components/ui/timesheet/WeekSelect";

describe("isCurrentWeek", () => {
  it("returns true when the date is within the current week", () => {
    const date = new Date();
    expect(isCurrentWeek(date)).toBe(true);
  });

  it("returns false when the date is not within the current week", () => {
    const date = new Date(2026, 3, 15);
    expect(isCurrentWeek(date)).toBe(false);
  });
});

describe("getWeekStartEnd", () => {
  it("returns the correct week range for a given date", () => {
    const date = new Date(2026, 3, 15);
    const result = getWeekStartEnd(date);
    expect(result).toBe("13-19 April 2026");
  });

  it("returns the correct formatting for a week spread over two months", () => {
    const date = new Date(2026, 11, 28); // December 28, 2026
    const result = getWeekStartEnd(date);
    expect(result).toBe("28 December 2026 - 3 January 2027");
  });

  it("returns the correct formatting for a week spread over two months within the same year", () => {
    const date = new Date(2026, 10, 30); // November 30, 2026
    const result = getWeekStartEnd(date);
    expect(result).toBe("30 November - 6 December 2026");
  });
});
