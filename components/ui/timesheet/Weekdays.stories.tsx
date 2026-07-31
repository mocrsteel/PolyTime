import {StoryObj, Meta} from "@storybook/nextjs-vite";

import Weekdays from "./Weekdays";

const meta = {
  title: "UI/Timesheets/Weekdays",
  component: Weekdays,
  tags: ["autodocs"],
} satisfies Meta<typeof Weekdays>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
};
