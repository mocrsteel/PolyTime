// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import DurationInput from "./DurationInput";

const meta = {
  component: DurationInput,
  title: "UI/Elements/Duration Input",
  tags: ["autodocs"],
} satisfies Meta<typeof DurationInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entryId: 1,
    time: 8.25,
    onSubmit: fn(),
  },
};
