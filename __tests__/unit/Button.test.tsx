import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "@/components/ui/Button"

describe("Button Component", () => {
  it("renders a regular button with its label", () => {
    render(<Button onClick={() => {}}>Click me</Button>)

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("calls onClick when a regular button is clicked", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole("button", { name: "Click me" }))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it("uses secondary styling by default", () => {
    render(<Button onClick={() => {}}>Secondary</Button>)
    const button = screen.getByRole("button", { name: "Secondary" })

    expect(button).toHaveClass("inline-flex", "h-10", "rounded-ui-lg", "border-app-border", "bg-app-surface", "text-slate-700")
    expect(button).not.toHaveClass("bg-app-primary")
  })

  it("uses primary styling when primary is true", () => {
    render(<Button primary onClick={() => {}}>Primary</Button>)
    const button = screen.getByRole("button", { name: "Primary" })

    expect(button).toHaveClass("bg-app-primary", "border-app-primary", "text-white", "shadow-action")
    expect(button).not.toHaveClass("bg-app-surface")
  })

  it("includes hover classes on the primary variant", () => {
    render(<Button primary onClick={() => {}}>Hover Primary</Button>)
    const button = screen.getByRole("button", { name: "Hover Primary" })

    expect(button).toHaveClass("hover:bg-app-primary-hover", "hover:boder-app-primary-hover")
  })

  it("renders a link variant with the expected href", () => {
    render(
      <Button link href="/timesheets">
        Timesheets
      </Button>,
    )

    expect(screen.getByRole("button", { name: "Timesheets" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Timesheets" })).toHaveAttribute("href", "/timesheets")
  })
})
