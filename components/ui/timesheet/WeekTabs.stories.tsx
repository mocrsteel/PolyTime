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

/**
 * Week based on today's date to verify if it properly renders in a dynamic way.
 */
export const CurrentWeek: Story = {
  args: {
    date: new Date(),
    data: timesheetEntries,
  },
};

/**
 * Random week, to verify the base functionality.
 */
export const DataWeek: Story = {
  args: {
    date: timesheetEntries[0].date,
    data: timesheetEntries,
  },
};

/**
 * Week with multiple entries per day, to verify the visualisation of a longer day.
 */
export const OtherDataWeek: Story = {
  args: {
    date: timesheetEntries[11].date,
    data: timesheetEntries,
  },
};

/**
 * Verify en-US locale..
 */
export const EnUSLocaleWeek: Story = {
  args: {
    date: timesheetEntries[11].date,
    data: timesheetEntries,
  },
  globals: {
    locale: "en-US",
  },
};

/**
 * Verify nl-BE locale..
 */
export const NlBELocaleWeek: Story = {
  args: {
    date: timesheetEntries[11].date,
    data: timesheetEntries,
  },
  globals: {
    locale: "nl-BE",
  },
};
