import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { expect, userEvent, within } from "storybook/test";
import Timesheets from "@/components/pages/Timesheets";

const meta = {
  title: "Pages/Timesheets",
  component: Timesheets,
  tags: ["autodocs"],
} satisfies Meta<typeof Timesheets>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TimesheetsDefault: Story = {};

export const AddEntryDialog: Story = {
  args: { onTimeLogSubmit: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Add entry/i }));
    const dialog = await within(document.body).findByRole("dialog", {
      name: "Add time entry",
    });
    await expect(
      within(dialog).getByRole("heading", { name: "Add time" }),
    ).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect(dialog).not.toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Add another entry" }),
    );
    await expect(
      await within(document.body).findByRole("dialog", {
        name: "Add time entry",
      }),
    ).toBeInTheDocument();
  },
};

export const SubmitEntryWithoutComment: Story = {
  args: { onTimeLogSubmit: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /Add entry/i }));
    const dialog = within(
      await within(document.body).findByRole("dialog", {
        name: "Add time entry",
      }),
    );

    await userEvent.type(dialog.getByRole("combobox"), "Website redesign");
    await userEvent.click(
      await within(document.body).findByRole("option", {
        name: /Website redesign/,
      }),
    );
    await userEvent.type(dialog.getByRole("textbox", { name: "Hours" }), "8");
    await userEvent.click(dialog.getByRole("button", { name: "Add time" }));

    await expect(args.onTimeLogSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "website",
        hours: 8,
        comment: "",
      }),
    );
    await expect(
      within(document.body).queryByRole("dialog", { name: "Add time entry" }),
    ).not.toBeInTheDocument();
  },
};
