import { describe, expect, it } from "vitest";
import { formatISO } from "date-fns";

import { validateQueryParams } from "@/lib/reports/validators";

function makeParams(params: Record<string, string>) {
  return new URLSearchParams(params);
}

describe("validateReportQueryParams", () => {
  it("returns parsed query params for a valid report query", () => {
    const params = validateQueryParams(
      makeParams({
        startDate: formatISO(new Date(2026, 0, 1)),
        endDate: formatISO(new Date(2026, 0, 31)),
        granularity: "month",
      }),
    );

    expect(params).toEqual({
      start: new Date(2026, 0, 1),
      end: new Date(2026, 0, 31),
      granularity: "month",
    });
  });

  it("throws when startDate is missing", () => {
    expect(() =>
      validateQueryParams(
        makeParams({
          endDate: formatISO(new Date(2026, 0, 31)),
          granularity: "month",
        }),
      ),
    ).toThrow("Start and end dates are required.");
  });

  it("throws when endDate is missing", () => {
    expect(() =>
      validateQueryParams(
        makeParams({
          startDate: formatISO(new Date(2026, 0, 1)),
          granularity: "month",
        }),
      ),
    ).toThrow("Start and end dates are required.");
  });

  it("throws when startDate is invalid", () => {
    expect(() =>
      validateQueryParams(
        makeParams({
          startDate: "2026-02-32",
          endDate: formatISO(new Date(2026, 0, 31)),
          granularity: "month",
        }),
      ),
    ).toThrow("Invalid start date format. Expected ISO date string.");
  });

  it("throws when startDate is after endDate", () => {
    expect(() =>
      validateQueryParams(
        makeParams({
          startDate: formatISO(new Date(2026, 1, 1)),
          endDate: formatISO(new Date(2026, 0, 1)),
          granularity: "month",
        }),
      ),
    ).toThrow("Start date cannot be after end date.");
  });

  it("throws when granularity is invalid", () => {
    expect(() =>
      validateQueryParams(
        makeParams({
          startDate: formatISO(new Date(2026, 0, 1)),
          endDate: formatISO(new Date(2026, 0, 31)),
          granularity: "something else",
        }),
      ),
    ).toThrow("Granularity must be one of: month, quarter, year.");
  });
});
