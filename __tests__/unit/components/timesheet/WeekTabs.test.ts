import { describe, it, expect } from "vitest";
import {
  getTotalHoursOnDate,
  generateWeekDays,
  getEntriesOnDate,
} from "@/components/ui/timesheet/WeekTabs";
import type { TimesheetEntry } from "@/components/ui/timesheet/DayEntry";

function makeEntry(overrides: Partial<TimesheetEntry>): TimesheetEntry {
  return {
    id: 1,
    businessUnit: "Operations",
    asset: "Plant North",
    project: "Phoenix Upgrade",
    projectColor: 1,
    date: new Date(2026, 6, 1),
    hours: 8,
    comments: [],
    ...overrides,
  };
}

describe("getTotalHoursOnDate", () => {
  it("sums hours for entries matching the given date", () => {
    const data = [
      makeEntry({ date: new Date(2026, 6, 1), hours: 4 }),
      makeEntry({ date: new Date(2026, 6, 1), hours: 4.5 }),
      makeEntry({ date: new Date(2026, 6, 2), hours: 8 }),
    ];

    expect(getTotalHoursOnDate(data, "2026-07-01")).toEqual({
      hours: 8,
      minutes: 30,
    });
  });

  it("returns zero for a date with no entries", () => {
    expect(getTotalHoursOnDate([], "2026-07-01")).toEqual({
      hours: 0,
      minutes: 0,
    });
  });
});

describe("generateWeekDays", () => {
  it("generates a Monday-start week of 7 days", () => {
    // 2026-07-01 is a Wednesday.
    const week = generateWeekDays(new Date(2026, 6, 1));

    expect(week).toHaveLength(7);
    expect(week[0].getDay()).toBe(1); // Monday
    expect(week[6].getDay()).toBe(0); // Sunday
    expect(week[0].getDate()).toBe(29); // Mon Jun 29
    expect(week[6].getDate()).toBe(5); // Sun Jul 5
  });

  it("handles a date that already falls on a Monday", () => {
    const week = generateWeekDays(new Date(2026, 6, 6)); // a Monday

    expect(week[0].getDate()).toBe(6);
    expect(week[0].getDay()).toBe(1);
  });
});

describe("getEntriesOnDate", () => {
  it("counts entries matching the given date", () => {
    const data = [
      makeEntry({ date: new Date(2026, 6, 1) }),
      makeEntry({ date: new Date(2026, 6, 1) }),
      makeEntry({ date: new Date(2026, 6, 2) }),
    ];

    expect(getEntriesOnDate(data, "2026-07-01")).toBe(2);
  });

  it("returns zero when no entries match", () => {
    expect(getEntriesOnDate([], "2026-07-01")).toBe(0);
  });
});
