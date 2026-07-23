import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import NotFound from "@/components/pages/NotFound"

describe("NotFound Component", () => {
  it("renders the not found heading and message", () => {
    render(<NotFound />)

    expect(screen.getByRole("heading", { name: "404 · Page not found" })).toBeInTheDocument()
    expect(screen.getByText("We could not find the page you were looking for.")).toBeInTheDocument()
  })

  it("renders both reroute actions with expected hrefs", () => {
    render(<NotFound />)

    expect(screen.getByRole("link", { name: "Go to Timesheets" })).toHaveAttribute("href", "/timesheets")
    expect(screen.getByRole("link", { name: "Open overview" })).toHaveAttribute("href", "/")
  })

  it("uses centered page layout and icon styling classes", () => {
    const { container } = render(<NotFound />)

    expect(container.querySelector("[id='404-page-container']")).toHaveClass("flex", "items-center", "justify-center", "h-full")
    expect(container.querySelector("[id='404-icon']")).toHaveClass("bg-teal-100/60", "text-teal-800", "rounded-2xl")
  })
})


