// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/nextjs-vite"
import Card from "./Card"
import "@/app/globals.css"

const meta = {
  title: "Elements/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

type Story = StoryObj<typeof meta>

export default meta

export const DefaultCard: Story = {
  args: {
    children: "Just some card text",
  }
}
