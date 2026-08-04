// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from "@storybook/nextjs-vite";

import NavButton from "./NavButton";

const meta = {
  component: NavButton,
  title: "Nav Buttons sidebar",
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  tags: ["autodocs"],
  globals: {
    backgrounds: {
      value: "sidebarDark",
      grid: false,
    },
  },
} satisfies Meta<typeof NavButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OverviewActive: Story = {
  args: {
    title: "Overview",
    icon: "grid",
    href: "/",
    badge: null,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const OverviewInactive: Story = {
  args: {
    title: "Overview",
    icon: "grid",
    href: "/",
    badge: null,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/other",
      },
    },
  },
};

export const TimesheetInactive: Story = {
  args: {
    title: "Timesheet",
    icon: "clock",
    href: "/timesheets",
    badge: null,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const TimesheetActive: Story = {
  args: {
    title: "Timesheet",
    icon: "clock",
    href: "/timesheets",
    badge: null,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/timesheets",
      },
    },
  },
};

export const ReportsInactive: Story = {
  args: {
    title: "Reports",
    icon: "clock",
    href: "/story",
    badge: null,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const ReportsActive: Story = {
  args: {
    title: "Reports",
    icon: "barChart",
    href: "/reports",
    badge: null,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/reports",
      },
    },
  },
};

export const WithManagerBadgeInactive: Story = {
  args: {
    title: "Management",
    icon: "barChart",
    href: "/management",
    badge: "Manager",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const WithManagerBadgeActive: Story = {
  args: {
    title: "Management",
    icon: "barChart",
    href: "/management",
    badge: "Manager",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/management",
      },
    },
  },
};

export const WithUserBadgeInactive: Story = {
  args: {
    title: "Management",
    icon: "barChart",
    href: "/management",
    badge: "User",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const WithUserBadgeActive: Story = {
  args: {
    title: "Management",
    icon: "barChart",
    href: "/management",
    badge: "User",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/management",
      },
    },
  },
};
