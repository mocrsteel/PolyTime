import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import Navbar from "@/components/pages/Navbar"

vi.mock("next/image", () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) =>
    React.createElement("img", { src, alt, className }),
}))

describe("Navbar Component", () => {
  it("renders branding and main navigation entries", () => {
    render(<Navbar userType="User" />)

    expect(screen.getByText("PolyTime")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Timesheet" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Reports" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Management/ })).toBeInTheDocument()
  })

  it("applies sidebar shell classes", () => {
    const { container } = render(<Navbar userType="User" />)

    const aside = container.querySelector("aside")
    expect(aside).toHaveClass("fixed", "left-0", "w-20", "lg:w-64", "bg-cyan-950")
  })

  it("shows manager badge only for manager user type", () => {
    const { rerender } = render(<Navbar userType="User" />)
    expect(screen.queryByText("Manager")).not.toBeInTheDocument()

    rerender(<Navbar userType="Manager" />)
    expect(screen.getByText("Manager")).toBeInTheDocument()
  })
})


