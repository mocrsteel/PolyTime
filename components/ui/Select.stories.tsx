// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Select from "./Select";

const meta = {
  title: "UI/Elements/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [1, 2, 3, 4],
    selectionMode: "single",
  },
};

export const Searchable: Story = {
  args: {
    items: [1, 2, 3, 4, 11, 22],
    selectionMode: "single",
    searchable: true,
  },
};
