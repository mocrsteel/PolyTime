// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite";
import Loading from "@/components/Loading";

const meta = {
  component: Loading,
  title : "Loading",
  tags: ['autodocs'],
  globals: {
    viewport: { value: 'desktop', isRotated: false}
  }
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingDefault: Story = {
  args: {}
};





