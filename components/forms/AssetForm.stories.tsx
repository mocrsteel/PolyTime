import { fn, expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AssetForm from "./AssetForm";

const businessUnits = [
  { id: "operations", name: "Operations" },
  { id: "corporate", name: "Corporate" },
];

const meta = {
  title: "Forms/AssetForm",
  component: AssetForm,
  args: { businessUnits },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CreateAsset: Story = {
  args: { businessUnits, onSubmit: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: /Business unit/ }),
    );
    await userEvent.click(
      await within(document.body).findByRole("option", { name: "Operations" }),
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Asset name" }),
      "Plant North",
    );
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Description (optional)" }),
      "Main manufacturing facility",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Create asset" }));

    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: "Plant North",
      description: "Main manufacturing facility",
      businessUnitId: "operations",
    });
  },
};
