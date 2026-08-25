// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import PeriodPicker, { PeriodPickerProps } from "./PeriodPicker";

const meta = {
  title: "UI/Elements/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof PeriodPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  granularity: "year",
  dateRange: [new Date(2025, 0, 1), new Date(2026, 4, 1)],
} satisfies PeriodPickerProps;

export const YearPicker: Story = {
  args: {
    ...defaultArgs,
  },
};

export const QuarterPicker: Story = {
  args: {
    ...defaultArgs,
    granularity: "quarter",
  },
};

export const MonthPicker: Story = {
  args: {
    ...defaultArgs,
    granularity: "month",
  },
};
