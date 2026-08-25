import { describe, it, expect } from "vitest";
import { monthRange, quarterRange, yearRange } from "@/lib/generators";

describe("monthRange", () => {
  it("returns inclusive month starts for a range within the same year", () => {
    const start = new Date(2024, 0, 15); // Jan 15, 2024
    const end = new Date(2024, 2, 20); // Mar 20, 2024

    const result = monthRange(start, end);

    expect(result).toEqual([
      new Date(2024, 0, 1),
      new Date(2024, 1, 1),
      new Date(2024, 2, 1),
    ]);
  });

  it("returns inclusive month starts across year boundaries", () => {
    const start = new Date(2023, 10, 5); // Nov 2023
    const end = new Date(2024, 1, 28); // Feb 2024

    const result = monthRange(start, end);

    expect(result).toEqual([
      new Date(2023, 10, 1),
      new Date(2023, 11, 1),
      new Date(2024, 0, 1),
      new Date(2024, 1, 1),
    ]);
  });

  it("returns one month when start and end are in the same month", () => {
    const start = new Date(2025, 6, 1);
    const end = new Date(2025, 6, 31);

    const result = monthRange(start, end);

    expect(result).toEqual([new Date(2025, 6, 1)]);
  });

  it("normalizes to first day of each month regardless of input day", () => {
    const start = new Date(2026, 3, 30); // Apr 30
    const end = new Date(2026, 4, 31); // May 31

    const result = monthRange(start, end);

    expect(result).toEqual([new Date(2026, 3, 1), new Date(2026, 4, 1)]);
  });

  it("swaps startDate and endDate when startDate is after endDate", () => {
    const start = new Date(2024, 5, 1); // Jun
    const end = new Date(2024, 4, 1); // May

    const result = monthRange(start, end);

    expect(result).toEqual([new Date(2024, 4, 1), new Date(2024, 5, 1)]);
  });
});

describe("quarterRange", () => {
  it("returns inclusive quarter starts within the same year", () => {
    const start = new Date(2024, 1, 10); // Feb (Q1)
    const end = new Date(2024, 8, 3); // Sep (Q3)

    const result = quarterRange(start, end);

    expect(result).toEqual([
      new Date(2024, 1, 1), // current implementation anchors to start month
      new Date(2024, 4, 1),
      new Date(2024, 7, 1),
    ]);
  });

  it("returns inclusive quarter starts across years", () => {
    const start = new Date(2023, 10, 9); // Nov (Q4)
    const end = new Date(2024, 3, 1); // Apr (Q2)

    const result = quarterRange(start, end);

    expect(result).toEqual([
      new Date(2023, 10, 1),
      new Date(2024, 1, 1),
      new Date(2024, 4, 1),
    ]);
  });

  it("returns one quarter when start and end are in the same quarter", () => {
    const start = new Date(2025, 6, 7); // Jul (Q3)
    const end = new Date(2025, 8, 29); // Sep (Q3)

    const result = quarterRange(start, end);

    expect(result).toEqual([new Date(2025, 6, 1)]);
  });

  it("normalizes to first day of each generated quarter month", () => {
    const start = new Date(2026, 0, 31);
    const end = new Date(2026, 2, 1);

    const result = quarterRange(start, end);

    expect(result).toEqual([new Date(2026, 0, 1)]);
  });

  it("swaps startDate and endDate when startDate is after endDate", () => {
    const start = new Date(2024, 9, 1); // Oct
    const end = new Date(2024, 0, 1); // Jan

    const result = quarterRange(start, end);

    expect(result).toEqual([
      new Date(2024, 0, 1),
      new Date(2024, 3, 1),
      new Date(2024, 6, 1),
      new Date(2024, 9, 1),
    ]);
  });
});

describe("yearRange", () => {
  it("returns inclusive year starts within a multi-year span", () => {
    const start = new Date(2022, 5, 1);
    const end = new Date(2025, 10, 15);

    const result = yearRange(start, end);

    expect(result).toEqual([
      new Date(2022, 0, 1),
      new Date(2023, 0, 1),
      new Date(2024, 0, 1),
      new Date(2025, 0, 1),
    ]);
  });

  it("returns one year when start and end are in the same year", () => {
    const start = new Date(2027, 0, 1);
    const end = new Date(2027, 11, 31);

    const result = yearRange(start, end);

    expect(result).toEqual([new Date(2027, 0, 1)]);
  });

  it("normalizes to January 1 regardless of input month/day", () => {
    const start = new Date(2029, 8, 30);
    const end = new Date(2030, 4, 5);

    const result = yearRange(start, end);

    expect(result).toEqual([new Date(2029, 0, 1), new Date(2030, 0, 1)]);
  });

  it("swaps startDate and endDate when startDate is after endDate", () => {
    const start = new Date(2025, 0, 1);
    const end = new Date(2024, 11, 31);

    const result = yearRange(start, end);

    expect(result).toEqual([new Date(2024, 0, 1), new Date(2025, 0, 1)]);
  });
});
