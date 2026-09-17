// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";

import WeekSelect from "./WeekSelect";
import { expect, within } from "storybook/test";

const meta = {
  title: "UI/Timesheets/WeekSelect",
  component: WeekSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof WeekSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CurrentWeek: Story = {
  args: {
    date: new Date(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const statusIcon = canvas.getByTestId("status-icon");
    // Not checking for formatting in here, as this is already tested in unit testing.
    // Will be tested in a few edge cases.
    await expect(canvas.getByText("Current week")).toBeInTheDocument();
    await expect(statusIcon).toBeInTheDocument();
    await expect(statusIcon).toHaveClass("text-green-600");
  },
};

export const NotCurrentWeek: Story = {
  args: {
    date: new Date(2026, 3, 15),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const statusIcon = canvas.getByTestId("status-icon");
    await expect(
      canvas.getByText("Editing non-current week"),
    ).toBeInTheDocument();
    await expect(statusIcon).toBeInTheDocument();
    await expect(statusIcon).toHaveClass("text-red-600");
  },
};

export const WeekAcrossMonths: Story = {
  args: {
    date: new Date(2026, 10, 30),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("30 November - 6 December 2026"),
    ).toBeInTheDocument();
  },
};

export const WeekAcrossYears: Story = {
  args: {
    date: new Date(2026, 11, 28),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("28 December 2026 - 3 January 2027"),
    ).toBeInTheDocument();
  },
};
