import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Card from "@/components/ui/Card"

describe("Card Component", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    )

    expect(screen.getByText("Card content")).toBeInTheDocument()
  })

  it("applies core layout and surface styling classes", () => {
    const { container } = render(
      <Card>
        <p>Card content</p>
      </Card>,
    )

    const card = container.firstElementChild
    expect(card).toHaveClass(
      "rounded-ui-xl",
      "border",
      "border-app-border",
      "bg-app-surface",
      "shadow-soft",
      "flex",
      "flex-col",
      "gap-4",
      "p-18",
    )
  })
})

