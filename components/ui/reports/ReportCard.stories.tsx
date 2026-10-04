// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ReportCard, { type ReportCardProps } from "./ReportCard";

const meta = {
  title: "UI/Reports/ReportCard",
  component: ReportCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ReportCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs: ReportCardProps = {
  eyebrow: "Total hours",
  title: "1248h",
  subtitle: "Q2 Apr-Jun 2026",
  icon: "buildings",
  iconTheme: "blue",
};

export const BlueTheme: Story = {
  args: { ...baseArgs },
};
export const RedTheme: Story = {
  args: { ...baseArgs, iconTheme: "red" },
};

export const GreenTheme: Story = {
  args: { ...baseArgs, iconTheme: "green" },
};

export const YellowBarChart2Theme: Story = {
  args: { ...baseArgs, icon: "barChart", iconTheme: "yellow" },
};

export const PurpleUsers2Theme: Story = {
  args: { ...baseArgs, icon: "users2", iconTheme: "purple" },
};

export const GrayTheme: Story = {
  args: { ...baseArgs, iconTheme: "gray" },
};

export const AllocationBreakdown: Story = {
  args: {
    eyebrow: "Allocation",
    title: "Hours by business unit",
    subtitle: "Quarterly allocation across the organisation.",
    badge: "Q2 2026",
    allocationItems: [
      { label: "Operations", value: 432, valueLabel: "432h" },
      { label: "Digital", value: 350, valueLabel: "350h" },
      { label: "Commercial", value: 286, valueLabel: "286h" },
      { label: "Corporate", value: 180, valueLabel: "180h" },
    ],
  },
};

