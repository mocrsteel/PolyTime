import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import LocaleProvider from "../lib/locale-context";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: "Light", value: "white" },
        sidebarDark: { name: "SideBar Dark", value: "#17384a" },
      },
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
      test: "todo",
    },
    nextjs: {
      appDirectory: true,
    },
  },
  initialGlobals: {
    value: "light",
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Global locale for formatting",
      defaultValue: "nl-BE",
      toolbar: {
        icon: "globe",
        items: [
          { value: "nl-BE", title: "Nederlands (BE)" },
          { value: "en-US", title: "English (US)" },
          { value: "fr-FR", title: "Français (FR)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <LocaleProvider locale={context.globals.locale}>
        <Story />
      </LocaleProvider>
    ),
  ],
};

export default preview;
