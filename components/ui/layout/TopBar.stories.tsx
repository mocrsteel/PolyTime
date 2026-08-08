import { Meta, StoryObj } from "@storybook/nextjs-vite";

import TopBar from "@/components/ui/layout/TopBar";

const meta = {
  title: "UI/Layout/TopBar",
  component: TopBar,
  tags: ["autodocs"],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
