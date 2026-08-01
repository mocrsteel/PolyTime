import { describe, it, expect } from "vitest";
import {
  projectColorClassFromSlot,
  projectColorClassFromHex,
} from "@/lib/project-colors";

describe("projectColorClassFromSlot", () => {
  it("returns the bg class for a valid slot by default", () => {
    expect(projectColorClassFromSlot(1)).toBe("bg-project-1");
  });

  it("returns the bg class for a valid slot when variant is 'bg'", () => {
    expect(projectColorClassFromSlot(51, "bg")).toBe("bg-project-51");
  });

  it("returns the before class for a valid slot when variant is 'before'", () => {
    expect(projectColorClassFromSlot(51, "before")).toBe(
      "before:bg-project-51",
    );
  });

  it("throws for an invalid slot", () => {
    expect(() => projectColorClassFromSlot(0)).toThrow(
      "Invalid project color slot: 0",
    );
    expect(() => projectColorClassFromSlot(101)).toThrow(
      "Invalid project color slot: 101",
    );
  });
});

describe("projectColorClassFromHex", () => {
  it("returns the bg class for a valid hex by default", () => {
    expect(projectColorClassFromHex("#CF6E6E")).toBe("bg-project-1");
  });

  it("returns the before class for a valid hex when variant is 'before'", () => {
    expect(projectColorClassFromHex("#CF6E6E", "before")).toBe(
      "before:bg-project-1",
    );
  });

  it("throws for an invalid hex", () => {
    expect(() => projectColorClassFromHex("#000000")).toThrow(
      "Invalid project color hex: #000000",
    );
  });
});
