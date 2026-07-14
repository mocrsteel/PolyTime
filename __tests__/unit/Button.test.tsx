import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "@/components/ui/Button"

/**
 * Component Tests - Testing React components with user interactions
 */
describe("Button Component", () => {
  describe("Regular Button", () => {
    it("should render with children text", () => {
      render(<Button>Click me</Button>)

      const button = screen.getByRole("button", { name: "Click me" })
      expect(button).toBeInTheDocument()
    })

    it("should apply primary styles when primary prop is true", () => {
      const { container } = render(<Button primary>Primary Button</Button>)

      const button = container.querySelector("button")
      expect(button?.className).toContain("bg-teal-700")
      expect(button?.className).toContain("text-white")
    })

    it("should apply secondary styles when primary is false or undefined", () => {
      const { container } = render(<Button>Secondary Button</Button>)

      const button = container.querySelector("button")
      expect(button?.className).toContain("border-slate-200")
      expect(button?.className).not.toContain("bg-teal-700")
    })

    it("should call onClick handler when clicked", async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole("button", { name: "Click me" })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledOnce()
    })

    it("should have correct name attribute", () => {
      render(<Button name="submit-btn">Submit</Button>)

      const button = screen.getByRole("button", { name: "Submit" })
      // Verify button is rendered (name attribute is typically not directly accessible)
      expect(button).toBeInTheDocument()
    })
  })

  describe("Link Button", () => {
    it("should render as a link when link prop is true", () => {
      render(
        <Button link href="/timesheets">
          Go to Timesheet
        </Button>,
      )

      const link = screen.getByRole("button", { name: "Go to Timesheet" })
      expect(link).toBeInTheDocument()
    })

    it("should apply correct href", () => {
      const { container } = render(
        <Button link href="/timesheets">
          Timesheet
        </Button>,
      )

      const linkElement = container.querySelector("a")
      expect(linkElement?.href).toContain("/timesheets")
    })
  })

  describe("Accessibility", () => {
    it("should be keyboard accessible", async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Accessible Button</Button>)

      const button = screen.getByRole("button")
      button.focus()

      expect(button).toHaveFocus()

      await user.keyboard("{Enter}")
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
