import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Heading from "./Heading";

const meta = {
  title: "UI/Elements/Heading",
  component: Heading,
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
