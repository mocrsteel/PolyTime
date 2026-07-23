import { describe, expect, it } from "vitest"
import {
  Alert,
  BarChart,
  Clock,
  Branch,
  Grid,
  Settings,
  Users,
} from "@/components/Icons"

describe("Icons Module", () => {
  it("exports icon components used by navigation and status pages", () => {
    expect(Grid).toBeTypeOf("function")
    expect(Clock).toBeTypeOf("function")
    expect(BarChart).toBeTypeOf("function")
    expect(Settings).toBeTypeOf("function")
    expect(Users).toBeTypeOf("function")
    expect(Alert).toBeTypeOf("function")
    expect(Branch).toBeTypeOf("function")
  })
})

