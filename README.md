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
| Database ORM | [Prisma 6](https://www.prisma.io) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Accessibility | [React Aria Components](https://react-spectrum.adobe.com/react-aria/) |
| Component Dev | [Storybook 10](https://storybook.js.org) |
| Testing | [Vitest](https://vitest.dev) + Playwright |
| Package Manager | [pnpm](https://pnpm.io) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
git clone https://github.com/mocrsteel/PolyTime.git
cd PolyTime
pnpm install
```

### Database Setup

```bash
# Generate the Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# (Optional) Seed with demo data
pnpm db:seed
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm build-storybook` | Build the Storybook static site |
| `pnpm db:generate` | Regenerate the Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:seed` | Seed the database |
| `pnpm db:studio` | Open Prisma Studio |

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