import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Timesheets from "@/components/pages/Timesheets";

const meta = {
  title: "Pages/Timesheets",
  component: Timesheets,
  tags: ["autodocs"],
} satisfies Meta<typeof Timesheets>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TimesheetsDefault: Story = {};
