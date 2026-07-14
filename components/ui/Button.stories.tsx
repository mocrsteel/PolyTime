// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite"
import Button from "./Button"

const meta = {
  title: "Elements/Button",
  component: Button,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {action: "clicked"},
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const PrimaryButton: Story = {
  args: {
    children: "Primary button",
    primary: true,
    onClick: () => null
  },
}

export const SecondaryButton: Story = {
  args: {
    children: "Secondary button",
    onClick: () => null
  },
}

export const PrimaryLinkButton: Story = {
  args: {
    children: "Link button",
    primary: true,
    link: true,
    href: "/link1",
  },
}

export const SecondaryLinkButton: Story = {
  args: {
    children: "Link button",
    link: true,
    href: "/link1",
  },
}
