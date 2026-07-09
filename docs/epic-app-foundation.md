# Epic: App foundation

Provide the app shell, routing, global layout, theme tokens, responsive sidebar, and active navigation state for the PolyTime Next.js App Router application. This epic establishes the baseline UX and developer patterns (Tailwind, React Aria, Storybook).

Acceptance criteria:

- Next.js App Router scaffold exists with root/app layout, error, not-found, and loading pages.
- Global Tailwind config and a token system are in place and documented.
- Sidebar component implemented (full + compact icon-only) and included in app layout.
- Active navigation state works and is testable (mocking app-router pathname).
- Storybook is bootstrapped and includes the Sidebar and NavButton stories (basic).

Notes / implementation guidance:

- Use Next.js App Router (app/ directory) and server components for layout where appropriate; client components for interactive UI.
