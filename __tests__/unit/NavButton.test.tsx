import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import NavButton from "@/components/NavButton"

const { mockUsePathname } = vi.hoisted(() => ({
  mockUsePathname: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  usePathname: mockUsePathname,
}))

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", props, children),
}))

describe("NavButton Component", () => {
  it("renders a navigation link with title and href", () => {
    mockUsePathname.mockReturnValue("/")

    render(
      <NavButton
        title="Overview"
        href="/"
        badge={null}
        icon={<span aria-hidden="true">I</span>}
      />,
    )

    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/")
  })

  it("marks active links with aria-current", () => {
    mockUsePathname.mockReturnValue("/")

    render(
      <NavButton
        title="Overview"
        href="/"
        badge={null}
        icon={<span aria-hidden="true">I</span>}
      />,
    )

    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page")
  })

  it("renders the badge text when provided", () => {
    mockUsePathname.mockReturnValue("/")

    render(
      <NavButton
        title="Management"
        href="/management"
        badge="Manager"
        icon={<span aria-hidden="true">I</span>}
      />,
    )

    expect(screen.getByText("Manager")).toBeInTheDocument()
  })

  it("shows the management indicator dot for manager badge", () => {
    mockUsePathname.mockReturnValue("/management")

    const { container } = render(
      <NavButton
        title="Management"
        href="/management"
        badge="Manager"
        icon={<span aria-hidden="true">I</span>}
      />,
    )

    expect(container.querySelector(".bg-teal-500")).toBeInTheDocument()
  })
})




