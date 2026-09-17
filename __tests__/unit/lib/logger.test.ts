import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("pino", () => {
  const mockLogger = { error: vi.fn() };
  const pino = Object.assign(
    vi.fn(() => mockLogger),
    { stdTimeFunctions: { isoTime: vi.fn() } },
  );
  return { default: pino };
});

describe("logError", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an errorId prefixed with 'err_'", async () => {
    const { logError } = await import("@/lib/logger");

    const errorId = logError({
      error: new Error("boom"),
      requestId: "req-1",
      userId: "user-1",
      route: "/timesheets",
      action: "submit",
    });

    expect(errorId).toMatch(/^err_[0-9a-f-]{36}$/);
  });

  it("logs the error with the provided context", async () => {
    const { logError } = await import("@/lib/logger");
    const { logger } = await import("@/lib/logger");
    const error = new Error("boom");

    const errorId = logError({
      error,
      requestId: "req-1",
      userId: "user-1",
      route: "/timesheets",
      action: "submit",
    });

    expect(logger.error).toHaveBeenCalledWith(
      {
        errorId,
        requestId: "req-1",
        userId: "user-1",
        route: "/timesheets",
        action: "submit",
        err: error,
      },
      "Unhandled application error",
    );
  });
});
