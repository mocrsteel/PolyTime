# PolyTime ⏱️

A lightweight timesheeting app for tracking time across projects, assets, and business units — with a manager dashboard, reporting, and CSV export.

Built with **Next.js 16**, **TypeScript**, **Prisma**, **Tailwind CSS**, and **React Aria Components**.

---

## Features

- 📋 **Timesheets** — Log daily time entries against projects and assets
- 📊 **Reports** — Filter and summarise time by business unit, project, asset, or employee; export to CSV
- 🏠 **Overview Dashboard** — See incomplete days at a glance and navigate quickly to outstanding entries
- 🛠️ **Management** — Managers can administer users, projects, assets, business units, and work schedule rules
- ♿ **Accessible** — Built with React Aria Components and semantic navigation
- 📱 **Responsive** — Works across desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Database ORM | [Prisma 7](https://www.prisma.io) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Accessibility | [React Aria Components](https://react-spectrum.adobe.com/react-aria/) |
| Component Dev | [Storybook 10](https://storybook.js.org) |
| Testing | [Vitest](https://vitest.dev) + Playwright |
| Tooling | [mise](https://mise.jdx.dev) |

---

## Getting Started

### Prerequisites

- [mise](https://mise.jdx.dev/getting-started.html)

### Installation

```bash
git clone https://github.com/mocrsteel/PolyTime.git
cd PolyTime
mise run install
```

### Database Setup

```bash
# Generate the Prisma client
mise run db:generate

# Run migrations
mise run db:migrate

# (Optional) Seed with demo data
mise run db:seed
```

### Development Server

```bash
mise run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `mise run dev` | Start the development server |
| `mise run build` | Build for production |
| `mise run start` | Start the production server |
| `mise run lint` | Run ESLint |
| `mise run test:all` | Run lint, type checks, unit, Storybook, and E2E tests |
| `mise run storybook` | Start Storybook on port 6006 |
| `mise run build-storybook` | Build the Storybook static site |
| `mise run db:generate` | Regenerate the Prisma client |
| `mise run db:migrate` | Run database migrations |
| `mise run db:seed` | Seed the database |
| `mise run db:studio` | Open Prisma Studio |

---

## Project Structure

```
├── app/            # Next.js App Router pages and layouts
├── components/     # Shared UI components
├── prisma/         # Database schema, migrations, and seed
├── docs/           # Project documentation
├── public/         # Static assets
└── scripts/        # Utility scripts
```

---

## Contributing

Issues and pull requests are welcome. See the [open issues](https://github.com/mocrsteel/PolyTime/issues) for the current roadmap.

---

## License

This project is currently unlicensed. All rights reserved.