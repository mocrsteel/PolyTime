import { describe, it, expect } from "vitest"
import { enUS, nl, nlBE } from "date-fns/locale";
import { resolveBrowserLocale } from "@/lib/locale-context";
 
describe("resolveBrowserLocale", () => {
  it("returns an exact match for a supported regional locale", () => {
    expect(resolveBrowserLocale("nl-BE")).toBe(nlBE)
  })

  it("falls back to the base language for unsupported region variants", () => {
    // @ts-expect-error required for testing
    expect(resolveBrowserLocale("nl-NL")).toBe(nl)
  })

  it("falls back to en-US for a completely unsupported locale", () => {
    // @ts-expect-error required for testing
    expect(resolveBrowserLocale("jp-JP")).toBe(enUS)
  })
})