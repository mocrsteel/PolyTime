import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
      light: {name: 'Light', value: 'white'},
      sidebarDark: {name: 'SideBar Dark', value: '#17384a'},
      }
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    nextjs: {
      appDirectory: true,
    }
  },
  initialGlobals: {
    value: "light"
  }
};

export default preview;
