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
