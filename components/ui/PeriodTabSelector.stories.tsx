import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "react-aria-components/Tabs";
import PeriodTabSelector from "./PeriodTabSelector";

const decoratedTabs = () => (
  <Tabs>
    <PeriodTabSelector />
  </Tabs>
);

const meta: Meta<typeof PeriodTabSelector> = {
  title: "Components/PeriodTabSelector",
  component: decoratedTabs,
};

export default meta;

type Story = StoryObj<typeof PeriodTabSelector>;

export const Default: Story = {};
