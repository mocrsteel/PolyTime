// noinspection JSUnusedGlobalSymbols

import { StoryObj, Meta } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import WeekTabs from "./WeekTabs";
import { timesheetEntries } from "@/lib/mock";

const FIXED_LOCALE_DATE = new Date("2025-03-04");

function parseDurationToMinutes(value: string): number {
  const [h, m] = value.split(":").map((part) => Number(part));
  return h * 60 + m;
}

function parseSummaryHours(summaryText: string): {
  entries: number;
  minutes: number;
} {
  const match = summaryText.match(/(\d+)\s*entr(?:y|ies).*?(\d+)h\s*(\d+)m/i);
  if (!match) {
    throw new Error(`Unable to parse day summary text: ${summaryText}`);
  }

  const entries = Number(match[1]);
  const hours = Number(match[2]);
  const minutes = Number(match[3]);
  return { entries, minutes: hours * 60 + minutes };
}

function assertDayTotalsMatchVisibleEntries(canvasElement: HTMLElement): void {
  const canvas = within(canvasElement);
  const summaryElement = canvas.getByTestId("day.summary.hours");
  const { entries, minutes: summaryMinutes } = parseSummaryHours(
    summaryElement.textContent || "",
  );

  const inputs = canvas.queryAllByLabelText(
    "Duration input",
  ) as HTMLInputElement[];
  const inputMinutesTotal = inputs.reduce((sum, input) => {
    return sum + parseDurationToMinutes(input.value);
  }, 0);

  // Ensure summary entry count matches rendered DayList entries.
  expect(inputs).toHaveLength(entries);

  // Ensure DayList summed input hours equals heading summary hours.
  expect(inputMinutesTotal).toBe(summaryMinutes);
}

const meta = {
  title: "UI/Timesheets/WeekTabs",
  component: WeekTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof WeekTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Week based on today's date to verify if it properly renders in a dynamic way.
 */
export const CurrentWeek: Story = {
  args: {
    date: new Date(),
    data: timesheetEntries,
  },
};

/**
 * Random week, to verify the base functionality.
 */
export const DataWeek: Story = {
  args: {
    date: timesheetEntries[0].date,
    data: timesheetEntries,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Starts on 2026-07-01 (Phoenix Upgrade), then switches to 2026-07-02 (Atlas Migration).
    await expect(canvas.getByText("Phoenix Upgrade")).toBeInTheDocument();
    assertDayTotalsMatchVisibleEntries(canvasElement);

    await userEvent.click(canvas.getByText("02"));

    await expect(canvas.getByText("Atlas Migration")).toBeInTheDocument();
    await expect(canvas.queryByText("Phoenix Upgrade")).not.toBeInTheDocument();
    assertDayTotalsMatchVisibleEntries(canvasElement);
  },
};

/**
 * Week with multiple entries per day, to verify the visualisation of a longer day.
 * Also verifies that the day switcher properly loads the day's entries and updates all values
 * in the view correctly.
 */
export const OtherDataWeek: Story = {
  args: {
    date: timesheetEntries[11].date,
    data: timesheetEntries,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Week starts selected on day "12" with a single Orion entry.
    await expect(canvas.getByText("Orion Compliance")).toBeInTheDocument();
    assertDayTotalsMatchVisibleEntries(canvasElement);

    // Move to day "08" with multiple entries.
    await userEvent.click(canvas.getByText("08"));

    await expect(canvas.getByText("Cedar Analytics")).toBeInTheDocument();
    await expect(canvas.getByText("Phoenix Upgrade")).toBeInTheDocument();
    await expect(canvas.getByText("Atlas Migration")).toBeInTheDocument();
    await expect(canvas.getByText("Helios Reporting")).toBeInTheDocument();

    // Verify all values are preserved/rendered for the multi-entry day.
    await expect(canvas.getByDisplayValue("2:00")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("3:00")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("5:00")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("8:00")).toBeInTheDocument();
    assertDayTotalsMatchVisibleEntries(canvasElement);

    // Switch away and back to catch stale/reconciliation regressions.
    await userEvent.click(canvas.getByText("12"));
    await expect(canvas.getByText("Orion Compliance")).toBeInTheDocument();
    await expect(canvas.queryByText("Cedar Analytics")).not.toBeInTheDocument();
    assertDayTotalsMatchVisibleEntries(canvasElement);

    await userEvent.click(canvas.getByText("08"));
    await expect(canvas.getByText("Cedar Analytics")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("2:00")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("3:00")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("5:00")).toBeInTheDocument();
    await expect(canvas.getByDisplayValue("8:00")).toBeInTheDocument();
    assertDayTotalsMatchVisibleEntries(canvasElement);
  },
};

/**
 * Verify en-US locale..
 */
export const EnUSLocaleWeek: Story = {
  args: {
    date: FIXED_LOCALE_DATE,
    data: timesheetEntries,
  },
  globals: {
    locale: "en-US",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Tuesday, March 4th, 2025"),
    ).toBeInTheDocument();
  },
};

/**
 * Verify nl-BE locale..
 */
export const NlBELocaleWeek: Story = {
  args: {
    date: FIXED_LOCALE_DATE,
    data: timesheetEntries,
  },
  globals: {
    locale: "nl-BE",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("dinsdag 4 maart 2025")).toBeInTheDocument();
  },
};

/**
 * Selects a day with zero entries and verifies the empty-day summary/empty list state.
 */
export const EmptyDayWeek: Story = {
  args: {
    date: timesheetEntries[0].date,
    data: timesheetEntries,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // In the week of 2026-07-01, day "29" has no entries in the fixture.
    await userEvent.click(canvas.getByText("29"));

    await expect(canvas.getAllByTestId("day.summary.hours")[0]).toContainHTML(
      "0h 0m",
    );
    await expect(canvas.getAllByTestId("day.summary.hours")[0]).toContainHTML(
      "0 entries",
    );
    assertDayTotalsMatchVisibleEntries(canvasElement);

    // No day entry title from populated days should be visible after selecting empty day.
    await expect(canvas.queryByText("Phoenix Upgrade")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Atlas Migration")).not.toBeInTheDocument();
  },
};
