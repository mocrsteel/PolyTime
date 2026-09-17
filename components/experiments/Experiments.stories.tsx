import { StoryObj, Meta } from "@storybook/nextjs-vite";

import Experiments from "./Experiments";

const meta = {
  title: "Experiments",
  component: Experiments,
  tags: ["autodocs"],
} satisfies Meta<typeof Experiments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
