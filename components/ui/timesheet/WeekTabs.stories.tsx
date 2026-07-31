import { StoryObj, Meta } from "@storybook/nextjs-vite";

import WeekTabs from "./WeekTabs";
import { timesheetEntries } from "@/lib/mock";

const meta = {
  title: "UI/Timesheets/WeekTabs",
  component: WeekTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof WeekTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CurrentWeek: Story = {
  args: {
    date: new Date(),
    data: timesheetEntries,
  },
};
