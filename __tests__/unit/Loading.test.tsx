import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import Loading from "@/components/Loading"

describe("Loading Component", () => {
  it("renders loading text", () => {
    render(<Loading />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("uses the loading class on the root element", () => {
    const { container } = render(<Loading />)

    expect(container.firstElementChild).toHaveClass("loading")
  })
})

