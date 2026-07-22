// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite"
import LoadingBadge from "./LoadingBadge"

const meta = {
  title: "Elements/LoadingBadge",
  component: LoadingBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingBadge>

type Story = StoryObj<typeof meta>

export default meta

export const LoadingText1: Story = {
  args: {
    children: "Fetching projects, assets and timelogs...",
  },
}

export const LoadingText2: Story = {
  args: {
    children: "Getting your data from the archives. This may take a while...",
  },
}
