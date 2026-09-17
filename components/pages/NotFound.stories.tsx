// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite";
import NotFound from "@/components/pages/NotFound";

const meta = {
  title: "Pages/NotFound",
  component: NotFound,
  tags: ['autodocs'],
  globals: {
    viewport: { value: 'desktop', isRotated: false}
  }
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotFoundDefault: Story = {};
