// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ReportPage from "./ReportPage";

const meta = {
  title: "Pages/ReportPage",
  component: ReportPage,
  tags: ["autodocs"],
} satisfies Meta<typeof ReportPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: null
};
