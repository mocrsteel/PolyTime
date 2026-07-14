// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite";
import Error from "@/components/Error";

const meta = {
  title: "Error",
  component: Error,
  tags: ['autodocs'],
  globals: {
    viewport: { value: 'desktop', isRotated: false}
  }
} satisfies Meta<typeof Error>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorDefault: Story = {};
