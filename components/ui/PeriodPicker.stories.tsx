// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, within } from "storybook/test";
import PeriodPicker, { PeriodPickerProps } from "./PeriodPicker";

const meta = {
  title: "UI/Elements/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof PeriodPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  granularity: "year",
  dateRange: [new Date(2025, 0, 1), new Date(2026, 4, 1)],
} satisfies PeriodPickerProps;

export const YearPicker: Story = {
  args: {
    ...defaultArgs,
  },
};

export const QuarterPicker: Story = {
  args: {
    ...defaultArgs,
    granularity: "quarter",
  },
};

export const MonthPicker: Story = {
  args: {
    ...defaultArgs,
    granularity: "month",
  },
};

/**
 * Baseline functionality: prev/next navigation and picking a quarter from the dialog.
 * Uses a wide database range so no buffer boundary is hit.
 */
export const QuarterNavigation: Story = {
  args: {
    granularity: "quarter",
    dateRange: [new Date(2024, 0, 1), new Date(2027, 0, 1)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/Q1 2024/)).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Next period" }));
    await expect(canvas.getByText(/Q2 2024/)).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: /Q2 2024/ }));
    await userEvent.click(
      screen.getByRole("button", { name: "increase year" }),
    );
    await expect(screen.getByLabelText("selected year")).toHaveTextContent(
      "2025",
    );

    await userEvent.click(screen.getByRole("option", { name: "Q3" }));
    await expect(canvas.getByText(/Q3 2025/)).toBeInTheDocument();
  },
};

/**
 * Edge case: the database only covers a single quarter, so navigating backwards should
 * hit the buffer limit and disable "Previous period", while flagging periods with no data.
 */
export const QuarterPreviousBoundary: Story = {
  args: {
    granularity: "quarter",
    dateRange: [new Date(2026, 0, 1), new Date(2026, 0, 1)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/Q1 2026/)).toBeInTheDocument();
    await expect(canvas.queryByText(/no data yet/i)).not.toBeInTheDocument();

    const prevButton = canvas.getByRole("button", { name: "Previous period" });
    const nextButton = canvas.getByRole("button", { name: "Next period" });

    await userEvent.click(prevButton);
    await expect(canvas.getByText(/Q4 2025/)).toBeInTheDocument();
    await expect(canvas.getByText(/no data yet/i)).toBeInTheDocument();
    await expect(prevButton).not.toBeDisabled();

    await userEvent.click(prevButton);
    await expect(canvas.getByText(/Q3 2025/)).toBeInTheDocument();
    await expect(canvas.getByText(/no data yet/i)).toBeInTheDocument();
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
  },
};

/**
 * Edge case: within the dialog, periods beyond the buffer are disabled, periods without
 * data (but within the buffer) are selectable and flagged, and the year stepper is
 * bounded the same way as the prev/next arrows.
 */
export const QuarterDialogBoundary: Story = {
  args: {
    granularity: "quarter",
    dateRange: [new Date(2026, 0, 1), new Date(2026, 0, 1)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /Q1 2026/ }));

    await expect(
      screen.getByRole("option", { name: "Q1" }),
    ).not.toHaveAttribute("aria-disabled", "true");
    await expect(screen.getByRole("option", { name: /^Q2/ })).toHaveTextContent(
      /no data yet/i,
    );
    await expect(screen.getByRole("option", { name: /^Q3/ })).toHaveTextContent(
      /no data yet/i,
    );
    await expect(screen.getByRole("option", { name: /^Q4/ })).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    await expect(
      screen.getByRole("button", { name: "increase year" }),
    ).toBeDisabled();
    await expect(
      screen.getByRole("button", { name: "decrease year" }),
    ).not.toBeDisabled();

    await userEvent.click(screen.getByRole("option", { name: /^Q3/ }));

    await expect(
      screen.queryByLabelText("selected year"),
    ).not.toBeInTheDocument();
    await expect(canvas.getByText(/Q3 2026/)).toBeInTheDocument();
    await expect(canvas.getByText(/no data yet/i)).toBeInTheDocument();
  },
};

/**
 * Edge case: same buffer/disable/no-data behavior as quarters, one level down in granularity.
 */
export const MonthBoundary: Story = {
  args: {
    granularity: "month",
    dateRange: [new Date(2026, 5, 1), new Date(2026, 5, 1)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/Jun 2026/)).toBeInTheDocument();
    await expect(canvas.queryByText(/no data yet/i)).not.toBeInTheDocument();

    const prevButton = canvas.getByRole("button", { name: "Previous period" });
    const nextButton = canvas.getByRole("button", { name: "Next period" });

    await userEvent.click(prevButton);
    await expect(canvas.getByText(/May 2026/)).toBeInTheDocument();
    await expect(prevButton).not.toBeDisabled();

    await userEvent.click(prevButton);
    await expect(canvas.getByText(/Apr 2026/)).toBeInTheDocument();
    await expect(canvas.getByText(/no data yet/i)).toBeInTheDocument();
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
  },
};

/**
 * Edge case: the year picker has no dialog, so the buffer/disable/no-data behavior is
 * checked directly on the prev/next arrows and the year label.
 */
export const YearBoundary: Story = {
  args: {
    granularity: "year",
    dateRange: [new Date(2026, 0, 1), new Date(2026, 0, 1)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("2026")).toBeInTheDocument();
    await expect(canvas.queryByText(/no data yet/i)).not.toBeInTheDocument();

    const prevButton = canvas.getByRole("button", { name: "Previous period" });
    const nextButton = canvas.getByRole("button", { name: "Next period" });

    await userEvent.click(prevButton);
    await expect(canvas.getByText("2025")).toBeInTheDocument();
    await expect(prevButton).not.toBeDisabled();

    await userEvent.click(prevButton);
    await expect(canvas.getByText("2024")).toBeInTheDocument();
    await expect(canvas.getByText(/no data yet/i)).toBeInTheDocument();
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
  },
};
