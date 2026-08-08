import { describe, expect, it } from "vitest";
import {
  CreateEntryRequestSchema,
  UpdateEntryRequestSchema,
  WeekQuerySchema,
  AsyncAcceptedResponseSchema,
  ErrorResponseSchema,
} from "@/lib/schemas/timesheet";

describe("WeekQuerySchema", () => {
  it("accepts a valid date range", () => {
    const parsed = WeekQuerySchema.parse({
      start: "2026-08-03",
      end: "2026-08-09",
    });

    expect(parsed).toEqual({
      start: "2026-08-03",
      end: "2026-08-09",
    });
  });

  it("rejects when start is after end", () => {
    expect(() =>
      WeekQuerySchema.parse({
        start: "2026-08-10",
        end: "2026-08-09",
      }),
    ).toThrow("start must be on or before end");
  });
});

describe("CreateEntryRequestSchema", () => {
  it("accepts payload with a valid time range", () => {
    const parsed = CreateEntryRequestSchema.parse({
      date: "2026-08-06",
      projectId: "proj_1",
      minutes: 120,
      note: "Code review",
      startTime: "2026-08-06T09:00:00.000Z",
      endTime: "2026-08-06T11:00:00.000Z",
    });

    expect(parsed.minutes).toBe(120);
  });

  it("rejects when only startTime is provided", () => {
    expect(() =>
      CreateEntryRequestSchema.parse({
        date: "2026-08-06",
        projectId: "proj_1",
        minutes: 120,
        startTime: "2026-08-06T09:00:00.000Z",
      }),
    ).toThrow("startTime and endTime must be provided together");
  });

  it("rejects when endTime is not after startTime", () => {
    expect(() =>
      CreateEntryRequestSchema.parse({
        date: "2026-08-06",
        projectId: "proj_1",
        minutes: 120,
        startTime: "2026-08-06T11:00:00.000Z",
        endTime: "2026-08-06T10:00:00.000Z",
      }),
    ).toThrow("endTime must be after startTime");
  });
});

describe("UpdateEntryRequestSchema", () => {
  it("rejects an empty payload", () => {
    expect(() => UpdateEntryRequestSchema.parse({})).toThrow(
      "At least one field must be provided",
    );
  });
});

describe("AsyncAcceptedResponseSchema", () => {
  it("accepts queued job response", () => {
    const parsed = AsyncAcceptedResponseSchema.parse({
      accepted: true,
      jobId: "job_copy_week_101",
      status: "queued",
    });

    expect(parsed.status).toBe("queued");
  });
});

describe("ErrorResponseSchema", () => {
  it("accepts the documented error format", () => {
    const parsed = ErrorResponseSchema.parse({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request payload is invalid",
        details: [
          {
            path: "minutes",
            message: "Must be greater than 0",
          },
        ],
        requestId: "req_abc123",
      },
    });

    expect(parsed.error.code).toBe("VALIDATION_ERROR");
  });
});

