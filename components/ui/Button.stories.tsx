// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";
import "@/app/globals.css";

const meta = {
  title: "UI/Elements/Button",
  component: Button,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export default meta;

export const PrimaryButton: Story = {
  args: {
    children: "Primary button",
    style: "primary",
    onClick: () => null,
  },
};

export const SecondaryButton: Story = {
  args: {
    children: "Secondary button",
    style: "secondary",
    onClick: () => null,
  },
};

export const SecondaryVariantButton: Story = {
  args: {
    children: "Secondary button",
    style: "secondary",
    onClick: () => null,
  },
};

export const TertiaryVariantButton: Story = {
  args: {
    children: "Secondary button",
    style: "tertiary",
    onClick: () => null,
  },
};

export const PrimaryLinkButton: Story = {
  args: {
    children: "Link button",
    style: "primary",
    link: true,
    href: "/link1",
  },
};

export const SecondaryLinkButton: Story = {
  args: {
    children: "Link button",
    style: "secondary",
    link: true,
    href: "/link1",
  },
};

export const ButtonWithPlusIcon: Story = {
  args: {
    children: "Add entry",
    style: "primary",
    icon: "plus",
    onClick: () => {},
  },
};

export const ButtonWitTrashIcon: Story = {
  args: {
    children: "Delete entry",
    style: "secondary",
    icon: "trash",
    onClick: () => {},
  },
};
