import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import LoadingSkeleton, {
  ManagementSkeleton,
  OverviewSkeleton,
  ReportsSkeleton,
  TimesheetSkeleton,
} from "@/components/ui/LoadingSkeleton"

describe("LoadingSkeleton Component", () => {
  it("renders the overview skeleton layout", () => {
    const { container } = render(<OverviewSkeleton />)

    expect(container.querySelector(".bg-teal-50\\/50")).toBeInTheDocument()
  })

  it("renders the timesheet skeleton layout", () => {
    const { container } = render(<TimesheetSkeleton />)

    expect(container.querySelector(".grid-cols-7")).toBeInTheDocument()
  })

  it("renders the management skeleton layout", () => {
    const { container } = render(<ManagementSkeleton />)

    expect(container.querySelectorAll(".h-9.w-28")).toHaveLength(4)
  })

  it("renders the reports skeleton layout", () => {
    const { container } = render(<ReportsSkeleton />)

    expect(container.querySelector(".sm\\:grid-cols-\\[120px_1fr_64px\\]")).toBeInTheDocument()
  })

  it("shows the profile placeholder for profile page", () => {
    render(<LoadingSkeleton page="profile" />)

    expect(screen.getByText("To be built")).toBeInTheDocument()
  })
})


