import { fn, expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BusinessUnitForm from "./BusinessUnitForm";

const meta = {
  title: "Forms/BusinessUnitForm",
  component: BusinessUnitForm,
  tags: ["autodocs"],
} satisfies Meta<typeof BusinessUnitForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const AddMultipleAssets: Story = {
  args: { onSubmit: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Business unit name" }),
      "Operations",
    );
    await userEvent.type(
      canvas.getAllByRole("textbox", { name: "Asset name" })[0],
      "Plant North",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("A short description of this asset"),
      "Main manufacturing facility",
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "+ Add another asset" }),
    );
    await userEvent.type(
      canvas.getAllByRole("textbox", { name: "Asset name" })[1],
      "Fleet West",
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Create business unit" }),
    );

    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: "Operations",
      description: "",
      assets: [
        { name: "Plant North", description: "Main manufacturing facility" },
        { name: "Fleet West", description: "" },
      ],
    });
  },
};
