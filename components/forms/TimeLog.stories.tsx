import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CalendarDate } from "@internationalized/date";
import { expect, userEvent, within } from "storybook/test";

import TimeLog from "./TimeLog";

const meta = {
  title: "Forms/TimeEntry",
  component: TimeLog,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeLog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseTimeLog: Story = {};

export const Prefilled: Story = {
  args: {
    defaultDate: new CalendarDate(2026, 3, 14),
    defaultProjectId: "mobile",
    defaultHours: "7.5",
  },
};

export const InvalidHours: Story = {
  args: {
    defaultProjectId: "website",
    defaultHours: "eight",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Add time" }));
    await expect(
      await canvas.findByText("Use a number such as 8 or 8.5."),
    ).toBeInTheDocument();
  },
};

export const FilteredProjects: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("combobox"), "mob");
  },
};

export const NoProjects: Story = {
  args: { projects: [] },
};

export const CreateNewProject: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole("combobox"), "Brand new project");
    await userEvent.click(
      await within(document.body).findByText(/Create new project/),
    );
    await expect(
      await canvas.findByText("New project “Brand new project”"),
    ).toBeInTheDocument();
  },
};
