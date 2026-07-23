// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from '@storybook/nextjs-vite';
import {INITIAL_VIEWPORTS} from "storybook/viewport";

import NavBar from './Navbar';

const meta = {
  component: NavBar,
  title: 'Pages/Navigation sidebar',
  tags: ['autodocs'],
  globals: {
    viewport: { value: 'desktop', isRotated: false}
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/'
      }
    },
    viewports: {
      options: INITIAL_VIEWPORTS
    }
  }
} satisfies Meta<typeof NavBar>

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    userType: "User"
  }
};

export const ManagerLoggedIn: Story = {
  args: {
    userType: "Manager"
  }
};

export const UserLoggedIn: Story = {
  args: {
    userType: "User"
  }
};

export const TimesheetRoute = {
  args: {
    userType: "User"
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

export const ReportsRoute = {
  args: {
    userType: "User"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/reports"
      }
    }
  }
}

export const ProfileRoute = {
  args: {
    userType: "User"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/profile"
      }
    }
  }
}

export const ManagementRoute = {
  args: {
    userType: "Manager"
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/management"
      }
    }
  }
}

export const OnTabletIsUser = {
  args: {
    userType: "User"
  },
  globals: {
    viewport: {
      value: 'tablet', isRotated: false
    }
  }
}

export const OnTabletIsManager = {
  args: {
    userType: "Manager"
  },
  globals: {
    viewport: {
      value: 'tablet', isRotated: false
    }
  }
}
