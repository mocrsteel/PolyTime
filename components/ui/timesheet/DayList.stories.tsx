// noinspection JSUnusedGlobalSymbols

import { StoryObj, Meta } from "@storybook/nextjs-vite";

import DayList from "./DayList";
import { timesheetEntries } from "@/lib/mock";

const meta = {
  title: "UI/Timesheets/DayList",
  component: DayList,
  tags: ["autodocs"],
} satisfies Meta<typeof DayList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: timesheetEntries,
  },
};
