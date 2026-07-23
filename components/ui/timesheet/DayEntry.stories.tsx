import {StoryObj, Meta} from '@storybook/nextjs-vite';
import DayEntry from "./DayEntry";

import {timesheetEntries} from "@/lib/mock";

const meta = {
  title: 'UI/Timesheets/DayEntry',
  component: DayEntry,
  tags: ['autodocs'],
} satisfies Meta<typeof DayEntry>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Entry1: Story = {
  args: {
    ...timesheetEntries[0],
  },
};

export const Entry2: Story = {
  args: {
    ...timesheetEntries[1],
  },
};

export const Entry3: Story = {
  args: {
    ...timesheetEntries[2],
  },
};

export const Entry4: Story = {
  args: {
    ...timesheetEntries[3],
  },
};
