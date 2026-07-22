import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Error from "@/components/Error"

describe("Error Component", () => {
  it("renders internal error mode with request id and retry action", () => {
    render(<Error requestId="req-123" />)

    expect(screen.getByRole("heading", { name: "Internal error" })).toBeInTheDocument()
    expect(screen.getByText("req-123")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Try again" })).toHaveAttribute("href", "/timesheets")
    expect(screen.getByRole("link", { name: "Return to overview" })).toHaveAttribute("href", "/")
  })

  it("renders global error mode with message and timestamp", () => {
    render(<Error global globalErrorMessage="Database unavailable" />)

    expect(screen.getByRole("heading", { name: "Global error" })).toBeInTheDocument()
    expect(screen.getByText("Database unavailable")).toBeInTheDocument()
    expect(screen.getByText(/time stamp:/i)).toBeInTheDocument()
  })

  it("hides retry action in global mode", () => {
    render(<Error global globalErrorMessage="Database unavailable" />)

    expect(screen.queryByRole("link", { name: "Try again" })).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Return to overview" })).toBeInTheDocument()
  })
})

