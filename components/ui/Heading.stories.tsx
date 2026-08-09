// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Heading from "./Heading";
import Button from "@/components/ui/Button";

const meta = {
  title: "UI/Elements/Heading",
  component: Heading,
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "Time tracking",
    title: "Good morning, Alex",
    subtitle: "Here's how your week is shaping up",
    buttons: (
      <>
        <Button style="secondary" icon="copy" onClick={() => {}}>
          Copy day
        </Button>
        <Button style="secondary" icon="copy" onClick={() => {}}>
          Copy week
        </Button>
        <Button style="primary" icon="plus" onClick={() => {}}>
          Add entry
        </Button>
      </>
    ),
  },
};
