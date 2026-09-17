// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./Card";
import "@/app/globals.css";

const meta = {
  title: "UI/Elements/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export default meta;

export const DefaultCard: Story = {
  args: {
    children: "Just some card text",
  },
};

export const ModalCard: Story = {
  args: {
    children: "Just some modal card text",
    variant: "modal",
  },
};

export const PageCard: Story = {
  args: {
    children: "Just some page card text",
    variant: "page",
  },
};

export const ContainerCard: Story = {
  args: {
    children: "Just some container card text",
    variant: "container",
  },
};
