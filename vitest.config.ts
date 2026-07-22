import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      '@': dirname,
    },
  },
  test: {
    globals: true,
    projects: [
      {
        resolve: {
          alias: {
            '@': dirname,
          },
        },
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: [path.join(dirname, 'vitest.setup.ts')],
          include: ['__tests__/unit/**/*.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          setupFiles: [],
          deps: {
            optimizer: {
              web: {
                include: ['next/router', 'next/navigation'],
              },
            },
          },
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      // End 2 end testing. Still need to work on this implementation later.
      // {
      //   name: 'e2e',
      //   test: {
      //     name: 'e2e',
      //     include: ['__tests__/e2e/**/*.test.{ts,tsx}'],
      //     browser: {
      //       enabled: true,
      //       headless: true,
      //       provider: playwright({}),
      //       instances: [{ browser: 'chromium' }],
      //     },
      //   },
      // },
    ],
  },
});
