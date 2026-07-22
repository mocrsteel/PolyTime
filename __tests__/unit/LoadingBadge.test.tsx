import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import LoadingBadge from "@/components/ui/LoadingBadge"

describe("LoadingBadge Component", () => {
  it("renders the loading label", () => {
    render(<LoadingBadge>Saving changes...</LoadingBadge>)

    expect(screen.getByText("Saving changes...")).toBeInTheDocument()
  })

  it("renders a spinner with animation classes", () => {
    const { container } = render(<LoadingBadge>Loading</LoadingBadge>)

    const spinner = container.querySelector("span")
    expect(spinner).toHaveClass(
      "w-5",
      "h-5",
      "rounded-full",
      "border-[3px]",
      "border-teal-100",
      "border-t-teal-700",
      "animate-spin",
    )
  })

  it("applies badge container styling", () => {
    const { container } = render(<LoadingBadge>Loading</LoadingBadge>)

    const badge = container.firstElementChild
    expect(badge).toHaveClass(
      "inline-flex",
      "items-center",
      "rounded-xl",
      "border",
      "border-teal-100",
      "bg-teal-50",
      "text-slate-600",
    )
  })
})

