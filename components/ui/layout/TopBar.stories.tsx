// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen } from "storybook/test";

import TopBar from "@/components/ui/layout/TopBar";

const meta = {
  title: "UI/Layout/TopBar",
  component: TopBar,
  tags: ["autodocs"],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotificationsDisabled: Story = {
  args: {
    notificationsEnabled: false,
    notificationsCount: 0,
  },
};

export const NotificationsEnabled: Story = {
  args: {
    notificationsEnabled: true,
    notificationsCount: 0,
  },
  play: async ({ canvas, userEvent }) => {
    const userButton = canvas
      .getAllByRole("button")
      .find((button) => button.getAttribute("name") === "user-button");

    await expect(userButton).toBeInTheDocument();

    if (userButton) {
      await userEvent.click(userButton);
      await expect(screen.getByText("Profile")).toBeInTheDocument();
      await expect(screen.getByText("Log Out")).toBeInTheDocument();
    }
  },
};

export const NotificationsPresent: Story = {
  args: {
    notificationsEnabled: true,
    notificationsCount: 5,
  },
  play: async ({ canvas }) => {
    const bellComponent = canvas
      .getAllByRole("button")
      .find((button) => button.getAttribute("name") === "notifications");

    await expect(bellComponent).toBeInTheDocument();
    await expect(bellComponent).toHaveClass("after:absolute", { exact: false });
    await expect(bellComponent).toHaveClass("before:animate-ping", {
      exact: false,
    });
  },
};
