# PolyTime MVP — Project Setup Guide

This guide explains how to set up the GitHub Project board, milestones, and issues for the PolyTime MVP backlog.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [What Gets Created](#what-gets-created)
- [Script Reference](#script-reference)
- [Database Setup](#database-setup)
- [Manual Setup (Alternative)](#manual-setup-alternative)

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Run setup scripts |
| npm / pnpm | any | Install dependencies |
| GitHub Token | — | API access |

### GitHub Token

Create a Personal Access Token at [github.com/settings/tokens/new](https://github.com/settings/tokens/new) with these scopes:

- ✅ `repo` — full repository access
- ✅ `project` — GitHub Projects read/write

---

## Quick Start

### Option A — Full automated setup (recommended)

```bash
# 1. Install script dependencies
npm install @octokit/rest @octokit/graphql

# 2. Run full setup (milestones + issues + GitHub Project + custom fields)
GITHUB_TOKEN=<your-token> node scripts/create-github-project-full.js
```

### Option B — Issues + milestones only

```bash
npm install @octokit/rest
GITHUB_TOKEN=<your-token> node scripts/create-github-project.js
```

### Option C — GitHub CLI helper

```bash
# Requires GitHub CLI: https://cli.github.com/
gh auth login
chmod +x scripts/setup-project-github-cli.sh
./scripts/setup-project-github-cli.sh
```

---

## What Gets Created

### Milestones (6)

| Milestone | Description |
|-----------|-------------|
| MVP 0.1 — App Foundation | App shell, routing, layout, theme tokens, sidebar, Storybook |
| MVP 0.2 — Authentication | User auth, session management, RBAC |
| MVP 0.3 — Data Model & API | Prisma schema, migrations, API routes |
| MVP 0.4 — Timesheet UI | Timesheet entry, editing, submission flows |
| MVP 0.5 — Reports & Management | Reports, approval flows, admin panel |
| Post-MVP | Nice-to-haves and future enhancements |

### Epics (10)

| Epic | Milestone | Priority |
|------|-----------|----------|
| App Foundation | MVP 0.1 | P0 |
| CI/CD & Developer Experience | MVP 0.1 | P0 |
| Authentication & Authorization | MVP 0.2 | P0 |
| User & Team Management | MVP 0.2 | P1 |
| Data Model & Prisma Setup | MVP 0.3 | P0 |
| Project & Asset Management | MVP 0.3 | P1 |
| Timesheet Entry & Management | MVP 0.4 | P0 |
| Approval Workflow | MVP 0.5 | P1 |
| Reporting & Analytics | MVP 0.5 | P1 |
| Notifications & Alerts | Post-MVP | P2 |

### Implementation Issues (39)

39 implementation issues are created and linked to their parent epics, spanning all milestone tracks.

### Labels

**Type:**
- `epic` — High-level feature epic
- `type:feature` — New feature
- `type:task` — Technical task or chore
- `type:bug` — Bug fix
- `type:docs` — Documentation

**Area:**
- `area:foundation` / `area:auth` / `area:data-model` / `area:timesheet`
- `area:projects` / `area:approval` / `area:reports` / `area:admin`
- `area:notifications` / `area:devex`

**Priority:**
- `priority:p0` — Critical, blocks release
- `priority:p1` — High, important for MVP
- `priority:p2` — Medium, nice to have

**Role:**
- `role:user` / `role:manager` / `role:all`

### GitHub Project Custom Fields

| Field | Type | Values |
|-------|------|--------|
| Status | Built-in | Todo, In Progress, Done |
| Epic | Text | Epic title |
| Area | Single select | Foundation, Auth, Data Model, Timesheet, Projects, Approval, Reports, Admin, Notifications, DevEx |
| Priority | Single select | P0 — Critical, P1 — High, P2 — Medium |
| Role | Single select | User, Manager, All |
| Estimate (days) | Number | — |
| Risk | Single select | Low, Medium, High |

---

## Script Reference

### `scripts/create-github-project.js`

Lightweight script — creates milestones and issues only.

```bash
GITHUB_TOKEN=<token> node scripts/create-github-project.js
```

- ✅ Creates 6 milestones
- ✅ Creates 10 epics
- ✅ Creates 39 implementation issues
- ✅ Assigns labels, milestones, cross-links to epics
- ❌ Does not create GitHub Project board

### `scripts/create-github-project-full.js`

Full setup — creates everything including GitHub Project and custom fields.

```bash
npm install @octokit/rest @octokit/graphql
GITHUB_TOKEN=<token> node scripts/create-github-project-full.js
```

- ✅ Everything in the lightweight script
- ✅ Creates "PolyTime MVP" GitHub Project (Projects v2)
- ✅ Adds custom fields (Area, Priority, Role, Estimate, Risk)
- ✅ Adds all issues to the project

> **Note:** Creating a Projects v2 board may require organisation-level permissions. If it fails, the script will create issues/milestones and then display a link to create the project manually.

### `scripts/setup-project-github-cli.sh`

Bash helper using the GitHub CLI.

```bash
gh auth login
./scripts/setup-project-github-cli.sh
```

- ✅ Creates milestones
- ✅ Creates all labels
- ✅ Attempts to create GitHub Project via `gh project create`
- ✅ Adds custom fields if project was created
- ℹ️  Then runs the Node.js script for issue creation

---

## Database Setup

The repository includes a complete Prisma schema and seed script.

### Apply migrations

```bash
# Install Prisma
npm install prisma @prisma/client

# Set DATABASE_URL in your .env
echo "DATABASE_URL=******localhost:5432/polytime" > .env

# Run migration
npx prisma migrate dev

# Seed sample data
npx prisma db seed
```

### Schema overview

| Model | Description |
|-------|-------------|
| `User` | Employees and managers with role-based access |
| `BusinessUnit` | Organisational units (e.g., Engineering, Operations) |
| `EmployeeGroup` | Groups of employees for policy and reporting |
| `Project` | Billable or internal projects |
| `TimeEntry` | Individual time log entries against a project |
| `Asset` | Physical or digital assets linked to projects |

See [`prisma/schema.prisma`](prisma/schema.prisma) for the full schema definition.

---

## Manual Setup (Alternative)

If you prefer to set up the GitHub Project manually:

1. **Create milestones** at [github.com/mocrsteel/PolyTime/milestones/new](https://github.com/mocrsteel/PolyTime/milestones/new)
   - One milestone per line in the table above

2. **Create labels** at [github.com/mocrsteel/PolyTime/labels](https://github.com/mocrsteel/PolyTime/labels)
   - Use the label list from the [Labels](#labels) section

3. **Create GitHub Project** at [github.com/users/mocrsteel/projects/new](https://github.com/users/mocrsteel/projects/new)
   - Title: `PolyTime MVP`
   - Add custom fields from the [Custom Fields](#github-project-custom-fields) table

4. **Create epics** — Create 10 issues with `[Epic]` prefix and assign to milestones

5. **Create implementation issues** — Create 39 issues linking to their parent epics

> For speed, use one of the automated scripts above.

---

## Troubleshooting

### Rate limiting

The scripts include delays between API calls. If you hit rate limits, increase the delay in the script:

```js
await new Promise((r) => setTimeout(r, 600)); // increase from 300ms
```

### Missing project permissions

GitHub Projects v2 creation via API requires `project` scope and may require org-level permissions for repositories owned by organisations. For personal repositories, use the GitHub web UI to create the project manually.

### `DATABASE_URL` not set

Make sure to create a `.env` file (not committed to Git) with your database connection string before running migrations.
