import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import ManagementPage from "./ManagementPage";

const meta = {
  title: "Pages/Management",
  component: ManagementPage,
  tags: ["autodocs"],
} satisfies Meta<typeof ManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const User: Story = {
  args: { role: "User" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Username")).toBeDisabled();
    await expect(canvas.getByLabelText("Email")).toBeDisabled();
    await expect(
      canvas.queryByRole("button", { name: "People" }),
    ).not.toBeInTheDocument();
    await userEvent.type(
      canvas.getByLabelText("Current password"),
      "currentpassword",
    );
    await userEvent.type(canvas.getByLabelText("New password"), "newpassword");
    await userEvent.type(
      canvas.getByLabelText("Confirm password"),
      "differentpassword",
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Update password" }),
    );
    await expect(
      canvas.getByText("New passwords do not match."),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Add project" }));
    const dialog = within(
      await within(document.body).findByRole("dialog", { name: "Add project" }),
    );
    await userEvent.selectOptions(
      dialog.getByLabelText("Asset"),
      "operations:north",
    );
    await userEvent.type(dialog.getByLabelText("Name"), "New project");
    await userEvent.click(dialog.getByRole("button", { name: "Save" }));
    await expect(canvas.getByText("New project")).toBeInTheDocument();
  },
};

export const Manager: Story = {
  args: { role: "Manager" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "People" }));
    await expect(
      canvas.queryByRole("button", { name: "Reset password for Maya Singh" }),
    ).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("button", { name: "Edit Alex Morgan" }),
    );
    const dialog = within(
      await within(document.body).findByRole("dialog", { name: "Edit person" }),
    );
    await expect(dialog.queryByLabelText("Role")).not.toBeInTheDocument();
    await userEvent.selectOptions(dialog.getByLabelText("Group"), "operations");
    await userEvent.click(dialog.getByRole("button", { name: "Save" }));
    await expect(
      within(canvas.getByRole("row", { name: /Alex Morgan/ })).getByText(
        "Operations",
      ),
    ).toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("button", { name: "Disable Alex Morgan" }),
    );
    await expect(canvas.getByText("Disabled")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Time entries" }));
    await expect(canvas.getByText("2026-10-01")).toBeInTheDocument();
    await expect(canvas.getByText("2026-10-31")).toBeInTheDocument();
    await expect(canvas.getByText("Maintenance review")).toBeInTheDocument();
    await expect(canvas.queryByText("Design review")).not.toBeInTheDocument();
    await userEvent.selectOptions(canvas.getByLabelText("User"), "jonas");
    await expect(canvas.getByText("Design review")).toBeInTheDocument();
    await expect(
      canvas.queryByText("Maintenance review"),
    ).not.toBeInTheDocument();
    await userEvent.selectOptions(canvas.getByLabelText("User"), "alex");
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Edit entry for Alex Morgan on 2026-10-28",
      }),
    );
    const entryDialog = within(
      await within(document.body).findByRole("dialog", { name: "Edit entry" }),
    );
    await userEvent.clear(entryDialog.getByLabelText("Hours"));
    await userEvent.type(entryDialog.getByLabelText("Hours"), "6");
    await userEvent.click(entryDialog.getByRole("button", { name: "Save" }));
    await expect(canvas.getByText("6h")).toBeInTheDocument();
    const month = canvas.getByLabelText("Month");
    await userEvent.clear(month);
    await expect(
      canvas.getByText("Select a month to view entries."),
    ).toBeInTheDocument();
    await userEvent.type(month, "2020-01");
    await userEvent.selectOptions(canvas.getByLabelText("User"), "maya");
    await expect(
      canvas.getByText("No entries for Maya Singh in this month."),
    ).toBeInTheDocument();
    await userEvent.selectOptions(canvas.getByLabelText("User"), "alex");
    await userEvent.click(canvas.getByRole("button", { name: "Lock month" }));
    await expect(
      canvas.getByRole("button", { name: "Unlock month" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("2020-01 locked for all users in this prototype."),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole("button", {
        name: "Edit entry for Alex Morgan on 2020-01-15",
      }),
    ).not.toBeInTheDocument();
    await userEvent.selectOptions(canvas.getByLabelText("User"), "jonas");
    await expect(
      canvas.getByRole("button", { name: "Unlock month" }),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole("button", {
        name: "Edit entry for Jonas Lee on 2020-01-16",
      }),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Unlock month" }));
    await expect(
      canvas.getByRole("button", {
        name: "Edit entry for Jonas Lee on 2020-01-16",
      }),
    ).toBeInTheDocument();
  },
};

export const Admin: Story = {
  args: { role: "Admin" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "People" }));
    await userEvent.click(
      canvas.getByRole("button", { name: "Edit Alex Morgan" }),
    );
    const dialog = within(
      await within(document.body).findByRole("dialog", { name: "Edit person" }),
    );
    await userEvent.selectOptions(dialog.getByLabelText("Role"), "Admin");
    await userEvent.click(dialog.getByRole("button", { name: "Save" }));
    await expect(
      within(canvas.getByRole("row", { name: /Alex Morgan/ })).getByText(
        "Admin",
      ),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Time entries" }));
    await userEvent.selectOptions(canvas.getByLabelText("User"), "jonas");
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Edit entry for Jonas Lee on 2026-10-29",
      }),
    );
    await expect(
      await within(document.body).findByRole("dialog", { name: "Edit entry" }),
    ).toBeInTheDocument();
  },
};
