import { Meta, StoryObj } from "@storybook/nextjs-vite";

import WeekSelect from "./WeekSelect";

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
};

export const NotCurrentWeek: Story = {
  args: {
    date: new Date(2026, 3, 15),
  },
};
