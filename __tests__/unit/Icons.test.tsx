import { describe, expect, it } from "vitest"
import {
  FiAlertTriangle,
  FiBarChart2,
  FiClock,
  FiGitBranch,
  FiGrid,
  FiSettings,
  FiUsers,
} from "@/components/Icons"

describe("Icons Module", () => {
  it("exports icon components used by navigation and status pages", () => {
    expect(FiGrid).toBeTypeOf("function")
    expect(FiClock).toBeTypeOf("function")
    expect(FiBarChart2).toBeTypeOf("function")
    expect(FiSettings).toBeTypeOf("function")
    expect(FiUsers).toBeTypeOf("function")
    expect(FiAlertTriangle).toBeTypeOf("function")
    expect(FiGitBranch).toBeTypeOf("function")
  })
})

