import { Meta, StoryObj } from "@storybook/nextjs-vite";

import Meter from "./Meter";

const meta = {
  title: "UI/Elements/Meter",
  component: Meter,
  tags: ["autodocs"],
} satisfies Meta<typeof Meter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithinLimits: Story = {
  args: {
    label: "Progress of this week",
    value: 30,
    weekMaximum: 40,
    formatOptions: {
      style: "unit",
      unit: "hour",
    },
  },
};

export const OnMaximum: Story = {
  args: {
    label: "Progress of this week",
    value: 40,
    weekMaximum: 40,
    formatOptions: {
      style: "unit",
      unit: "hour",
    },
  },
};

export const ExceedingMaximum: Story = {
  args: {
    label: "Progress of this week",
    value: 45,
    weekMaximum: 40,
    formatOptions: {
      style: "unit",
      unit: "hour",
    },
  },
};
