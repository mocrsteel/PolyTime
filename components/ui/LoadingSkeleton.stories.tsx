// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite"
import LoadingSkeleton from "./LoadingSkeleton"

const meta = {
  title: "UI/Elements/LoadingSkeleton",
  component: LoadingSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingSkeleton>

type Story = StoryObj<typeof meta>

export default meta

export const TimesheetsSkeleton: Story = {
  args: {
    page: "timesheets",
  },
}

export const OverviewSkeleton: Story = {
  args: {
    page: "overview",
  },
}

export const ReportsSkeleton: Story = {
  args: {
    page: "reports",
  },
}

export const ManagementSkeleton: Story = {
  args: {
    page: "management",
  },
}

export const ProfileSkeleton: Story = {
  args: {
    page: "profile",
  },
}
