// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";

import ReportPage from "./ReportPage";
import type { ReportData } from "@/lib/reports/types";
import type { DateRange } from "@/components/ui/PeriodPicker";

const MOCK_DATA: ReportData = {
  businessUnits: [
    { name: "Operations", hours: 432 },
    { name: "Digital", hours: 350 },
    { name: "Commercial", hours: 286 },
    { name: "Corporate", hours: 180 },
  ],
  users: [
    { name: "Ariane", hours: 160, completion: 1.0, expectedHours: 160 },
    { name: "Milo", hours: 160, completion: 1.0, expectedHours: 160 },
  ],
  completion: {
    expected: 640,
    actual: 614,
    completion: 0.959,
  },
  comments: [
    {
      project: "Retail Expansion",
      asset: "Brussels HQ",
      comments: [
        {
          date: new Date(2026, 5, 15),
          comment: "Reviewed floor-plan changes with the facilities team",
          user: "Alex Turner",
        },
        {
          date: new Date(2026, 5, 18),
          comment: "Updated opening-readiness checklist",
          user: "Jonas Lee",
        },
      ],
    },
    {
      project: "Website Redesign",
      asset: "Brand platform",
      comments: [
        {
          date: new Date(2026, 5, 15),
          comment: "Prepared responsive header concepts",
          user: "Alex Turner",
        },
        {
          date: new Date(2026, 5, 15),
          comment: "Aligned component spacing with the design system",
          user: "Alex Turner",
        },
        {
          date: new Date(2026, 5, 16),
          comment: "Refined the mobile navigation",
          user: "Alex Turner",
        },
        {
          date: new Date(2026, 5, 16),
          comment: "Reviewed accessibility contrast",
          user: "Alex Turner",
        },
        {
          date: new Date(2026, 5, 18),
          comment: "Completed stakeholder review changes",
          user: "Alex Turner",
        },
      ],
    },
    {
      project: "Data Migration",
      asset: "Data warehouse",
      comments: [
        {
          date: new Date(2026, 5, 16),
          comment: "Validated customer export mappings",
          user: "Maya Singh",
        },
        {
          date: new Date(2026, 5, 17),
          comment: "Reconciled source and target row counts",
          user: "Maya Singh",
        },
        {
          date: new Date(2026, 5, 18),
          comment: "Documented retry plan for failed imports",
          user: "Maya Singh",
        },
      ],
    },
  ],
};

const DEFAULT_RANGE: DateRange = {
  start: new Date(2026, 3, 1),
  end: new Date(2026, 5, 30),
};

const meta = {
  title: "Pages/ReportPage",
  component: ReportPage,
  tags: ["autodocs"],
  args: {
    data: MOCK_DATA,
    initialTab: "quarter",
    initialSelectedDateRange: DEFAULT_RANGE,
    availableDateRange: [new Date(2025, 0, 1), new Date(2026, 8, 25)],
    expectedBusinessHours: 160,
  },
} satisfies Meta<typeof ReportPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const EmptyState: Story = {
  args: {
    data: {
      businessUnits: [],
      users: [],
      completion: {
        expected: 0,
        actual: 0,
        completion: 0,
      },
      comments: [],
    },
  },
};

export const ManpowerWarnings: Story = {
  args: {
    data: {
      ...MOCK_DATA,
      users: [
        { name: "Ariane", hours: 186, completion: 1.16, expectedHours: 160 },
        { name: "Milo", hours: 142, completion: 0.89, expectedHours: 160 },
        { name: "Jules", hours: 160, completion: 1, expectedHours: 160 },
      ],
    },
    expectedBusinessHours: 160,
  },
};
