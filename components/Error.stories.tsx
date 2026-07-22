// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite";
import Error from "@/components/Error";
import "@/app/globals.css"

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

export const ErrorDefault: Story = {
  args: {
    requestId: crypto.randomUUID().toUpperCase()
  }
};

export const GlobalError: Story = {
  args: {
    global: true,
    globalErrorMessage: "A global error occurred."
  }
};
