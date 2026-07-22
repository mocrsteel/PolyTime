// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from '@storybook/nextjs-vite';
import {IoGridOutline} from "react-icons/io5";
import {FaRegClock} from "react-icons/fa6";
import {FaRegChartBar} from "react-icons/fa";

import NavButton from './NavButton';

const meta = {
  component: NavButton,
  title: 'Nav Buttons sidebar',
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/'
      }
    }
  },
  tags: ['autodocs'],
  globals: {
    backgrounds: {
      value: 'sidebarDark', grid: false
    }
  }
} satisfies Meta<typeof NavButton>

export default meta;

type Story = StoryObj<typeof meta>;

export const OverviewActive: Story = {
  args: {
    title: 'Overview',
    icon: <IoGridOutline/>,
    href: '/',
    badge: null
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/"
      }
    }
  }
};

export const OverviewInactive: Story = {
  args: {
    title: 'Overview',
    icon: <IoGridOutline/>,
    href: '/',
    badge: null
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/other"
      }
    }
  }
};

export const TimesheetInactive: Story = {
  args: {
    title: 'Timesheet',
    icon: <FaRegClock/>,
    href: '/timesheets',
    badge: null
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/"
      }
    }
  }
};

export const TimesheetActive: Story = {
  args: {
    title: 'Timesheet',
    icon: <FaRegClock/>,
    href: '/timesheets',
    badge: null
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/timesheets"
      }
    }
  }
};


export const ReportsInactive: Story = {
  args: {
    title: 'Reports',
    icon: <FaRegClock/>,
    href: '/story',
    badge: null
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/"
      }
    }
  }
};

export const ReportsActive: Story = {
  args: {
    title: 'Reports',
    icon: <FaRegChartBar/>,
    href: '/reports',
    badge: null
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/reports"
      }
    }
  }
};

export const WithManagerBadgeInactive: Story = {
  args: {
    title: 'Management',
    icon: <FaRegChartBar/>,
    href: '/management',
    badge: "Manager"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/"
      }
    }
  }
};

export const WithManagerBadgeActive: Story = {
  args: {
    title: 'Management',
    icon: <FaRegChartBar/>,
    href: '/management',
    badge: "Manager"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/management"
      }
    }
  }
};

export const WithUserBadgeInactive: Story = {
  args: {
    title: 'Management',
    icon: <FaRegChartBar/>,
    href: '/management',
    badge: "User"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/"
      }
    }
  }
};

export const WithUserBadgeActive: Story = {
  args: {
    title: 'Management',
    icon: <FaRegChartBar/>,
    href: '/management',
    badge: "User"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/management"
      }
    }
  }
};

