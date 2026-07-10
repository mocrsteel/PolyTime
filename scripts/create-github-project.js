#!/usr/bin/env node
/**
 * create-github-project.js
 *
 * Lightweight script to create GitHub milestones and issues for the PolyTime
 * MVP backlog. Run this after obtaining a personal access token with `repo`
 * and `project` scopes.
 *
 * Usage:
 *   GITHUB_TOKEN=<token> node scripts/create-github-project.js
 *
 * Dependencies:
 *   npm install @octokit/rest
 */

import { Octokit } from '@octokit/rest';

const OWNER = 'mocrsteel';
const REPO = 'PolyTime';

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('❌ GITHUB_TOKEN environment variable is required.');
  process.exit(1);
}

const octokit = new Octokit({ auth: token });

// ── Milestones ────────────────────────────────────────────────────────────────

const MILESTONES = [
  { title: 'MVP 0.1 — App Foundation', description: 'App shell, routing, layout, theme tokens, sidebar, Storybook setup' },
  { title: 'MVP 0.2 — Authentication', description: 'User authentication, session management, role-based access control' },
  { title: 'MVP 0.3 — Data Model & API', description: 'Prisma schema, migrations, API routes for core resources' },
  { title: 'MVP 0.4 — Timesheet UI', description: 'Timesheet entry, editing, and submission flows' },
  { title: 'MVP 0.5 — Reports & Management', description: 'Reporting views, manager approval flows, admin panel' },
  { title: 'Post-MVP', description: 'Nice-to-haves and future enhancements' },
];

// ── Epics ─────────────────────────────────────────────────────────────────────

const EPICS = [
  {
    title: '[Epic] App Foundation',
    milestone: 'MVP 0.1 — App Foundation',
    labels: ['epic', 'area:foundation', 'priority:p0'],
    body: `## Epic: App Foundation

Provide the app shell, routing, global layout, theme tokens, responsive sidebar, and active navigation state for the PolyTime Next.js App Router application.

### Acceptance Criteria
- Next.js App Router scaffold exists with root/app layout, error, not-found, and loading pages
- Global Tailwind config and token system are in place and documented
- Sidebar component implemented (full + compact icon-only) and included in app layout
- Active navigation state works and is testable
- Storybook is bootstrapped and includes Sidebar and NavButton stories`,
  },
  {
    title: '[Epic] Authentication & Authorization',
    milestone: 'MVP 0.2 — Authentication',
    labels: ['epic', 'area:auth', 'priority:p0'],
    body: `## Epic: Authentication & Authorization

Implement secure user authentication and role-based access control using NextAuth.js.

### Acceptance Criteria
- Users can sign in with email/password
- JWT sessions are issued and validated
- Role-based access control enforced on API routes and pages
- Protected routes redirect unauthenticated users to login`,
  },
  {
    title: '[Epic] Data Model & Prisma Setup',
    milestone: 'MVP 0.3 — Data Model & API',
    labels: ['epic', 'area:data-model', 'priority:p0'],
    body: `## Epic: Data Model & Prisma Setup

Design and implement the core database schema covering users, time entries, projects, assets, business units, and employee groups.

### Acceptance Criteria
- Prisma schema covers all core entities
- Initial migration is generated and applied
- Seed script populates sample data
- Prisma Client is accessible from API routes`,
  },
  {
    title: '[Epic] Timesheet Entry & Management',
    milestone: 'MVP 0.4 — Timesheet UI',
    labels: ['epic', 'area:timesheet', 'priority:p0'],
    body: `## Epic: Timesheet Entry & Management

Build the core timesheet UI allowing users to create, edit, and submit time entries against projects.

### Acceptance Criteria
- Users can create, edit, and delete time entries
- Weekly view shows all entries for the current week
- Users can submit entries for manager approval
- Validation prevents duplicate or invalid entries`,
  },
  {
    title: '[Epic] Project & Asset Management',
    milestone: 'MVP 0.3 — Data Model & API',
    labels: ['epic', 'area:projects', 'priority:p1'],
    body: `## Epic: Project & Asset Management

Allow managers to create and manage projects and associated assets that time can be logged against.

### Acceptance Criteria
- Managers can create, edit, and archive projects
- Projects can be associated with business units
- Assets can be linked to projects
- Users see only active projects in timesheet`,
  },
  {
    title: '[Epic] Approval Workflow',
    milestone: 'MVP 0.5 — Reports & Management',
    labels: ['epic', 'area:approval', 'priority:p1'],
    body: `## Epic: Approval Workflow

Enable managers to review, approve, or reject submitted time entries from their team.

### Acceptance Criteria
- Managers see a queue of submitted entries
- Managers can approve or reject entries with comments
- Users are notified of approval status changes
- Approved entries are locked for editing`,
  },
  {
    title: '[Epic] Reporting & Analytics',
    milestone: 'MVP 0.5 — Reports & Management',
    labels: ['epic', 'area:reports', 'priority:p1'],
    body: `## Epic: Reporting & Analytics

Provide reports and analytics views for users and managers to track time logged.

### Acceptance Criteria
- Users can view their own time summary by week/month
- Managers can view team time summaries
- Export to CSV is supported
- Reports can be filtered by project, date range, and user`,
  },
  {
    title: '[Epic] User & Team Management',
    milestone: 'MVP 0.2 — Authentication',
    labels: ['epic', 'area:admin', 'priority:p1'],
    body: `## Epic: User & Team Management

Admin interface for managing users, business units, and employee groups.

### Acceptance Criteria
- Admins can create, edit, and deactivate users
- Business units and employee groups can be managed
- User roles can be assigned by admins
- Audit log tracks user management actions`,
  },
  {
    title: '[Epic] Notifications & Alerts',
    milestone: 'Post-MVP',
    labels: ['epic', 'area:notifications', 'priority:p2'],
    body: `## Epic: Notifications & Alerts

In-app and email notifications for key workflow events.

### Acceptance Criteria
- Users are notified when entries are approved or rejected
- Managers are notified when entries are submitted
- Reminders are sent for missing timesheet submissions
- Notification preferences can be configured per user`,
  },
  {
    title: '[Epic] CI/CD & Developer Experience',
    milestone: 'MVP 0.1 — App Foundation',
    labels: ['epic', 'area:devex', 'priority:p0'],
    body: `## Epic: CI/CD & Developer Experience

Set up GitHub Actions CI/CD pipeline, linting, testing, and developer tooling.

### Acceptance Criteria
- GitHub Actions CI runs on every PR
- ESLint and TypeScript type checking pass
- Storybook tests run in CI
- Deployment pipeline to staging is configured`,
  },
];

// ── Implementation Issues ─────────────────────────────────────────────────────

const ISSUES = [
  // MVP 0.1 — App Foundation
  { title: 'Set up Next.js App Router scaffold with root layout', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p0', 'role:all'] },
  { title: 'Implement global Tailwind config and design tokens', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p0', 'role:all'] },
  { title: 'Build responsive Sidebar component (full + compact)', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:feature', 'area:foundation', 'priority:p0', 'role:all'] },
  { title: 'Add error, not-found, and loading pages', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p1', 'role:all'] },
  { title: 'Bootstrap Storybook with NextJS-Vite framework', epic: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:devex', 'priority:p0', 'role:all'] },
  { title: 'Write NavButton and Sidebar Storybook stories', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p1', 'role:all'] },
  { title: 'Configure GitHub Actions CI workflow', epic: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:devex', 'priority:p0', 'role:all'] },
  { title: 'Add ESLint and TypeScript strict configuration', epic: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:devex', 'priority:p0', 'role:all'] },

  // MVP 0.2 — Authentication
  { title: 'Integrate NextAuth.js with email/password provider', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'] },
  { title: 'Implement JWT session management', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'] },
  { title: 'Add middleware for protected routes', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'] },
  { title: 'Build login and sign-up pages', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:user'] },
  { title: 'Implement role-based access control (RBAC)', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'] },
  { title: 'Build user management admin panel', epic: '[Epic] User & Team Management', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:admin', 'priority:p1', 'role:manager'] },
  { title: 'Create business unit and employee group management UI', epic: '[Epic] User & Team Management', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:admin', 'priority:p1', 'role:manager'] },

  // MVP 0.3 — Data Model & API
  { title: 'Design and implement Prisma schema', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:task', 'area:data-model', 'priority:p0', 'role:all'] },
  { title: 'Generate and apply initial database migration', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:task', 'area:data-model', 'priority:p0', 'role:all'] },
  { title: 'Write database seed script with sample data', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:task', 'area:data-model', 'priority:p1', 'role:all'] },
  { title: 'Create API routes for users resource', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:data-model', 'priority:p0', 'role:all'] },
  { title: 'Create API routes for projects resource', epic: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:projects', 'priority:p0', 'role:all'] },
  { title: 'Create API routes for time entries resource', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:all'] },
  { title: 'Create API routes for assets resource', epic: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:projects', 'priority:p1', 'role:manager'] },
  { title: 'Build project creation and editing UI for managers', epic: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:projects', 'priority:p1', 'role:manager'] },

  // MVP 0.4 — Timesheet UI
  { title: 'Build weekly timesheet view', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'] },
  { title: 'Implement time entry creation form', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'] },
  { title: 'Implement time entry editing and deletion', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'] },
  { title: 'Add timesheet submission flow', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'] },
  { title: 'Add validation for time entries (hours, date range)', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p1', 'role:user'] },
  { title: 'Build timesheet summary and status indicators', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p1', 'role:user'] },

  // MVP 0.5 — Reports & Management
  { title: 'Build manager approval queue view', epic: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:approval', 'priority:p0', 'role:manager'] },
  { title: 'Implement approve/reject actions with comments', epic: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:approval', 'priority:p0', 'role:manager'] },
  { title: 'Add entry locking after approval', epic: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:approval', 'priority:p1', 'role:all'] },
  { title: 'Build personal time summary report', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p1', 'role:user'] },
  { title: 'Build team time summary report for managers', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p1', 'role:manager'] },
  { title: 'Add CSV export for reports', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p2', 'role:manager'] },
  { title: 'Add date range and project filters to reports', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p2', 'role:all'] },

  // Post-MVP
  { title: 'Implement in-app notifications for approval status', epic: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['type:feature', 'area:notifications', 'priority:p2', 'role:user'] },
  { title: 'Add email notifications for timesheet events', epic: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['type:feature', 'area:notifications', 'priority:p2', 'role:all'] },
  { title: 'Add weekly submission reminder notifications', epic: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['type:feature', 'area:notifications', 'priority:p2', 'role:user'] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

async function getOrCreateMilestone(title, description) {
  const { data: milestones } = await octokit.issues.listMilestones({ owner: OWNER, repo: REPO, state: 'open' });
  const existing = milestones.find((m) => m.title === title);
  if (existing) {
    console.log(`  ↩  Milestone already exists: ${title}`);
    return existing.number;
  }
  const { data } = await octokit.issues.createMilestone({ owner: OWNER, repo: REPO, title, description });
  console.log(`  ✅ Created milestone: ${title}`);
  return data.number;
}

async function createIssue(title, body, labels, milestoneNumber) {
  const { data } = await octokit.issues.create({
    owner: OWNER,
    repo: REPO,
    title,
    body,
    labels,
    milestone: milestoneNumber,
  });
  return data;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting PolyTime MVP backlog setup...\n');

  // 1. Create milestones
  console.log('📌 Creating milestones...');
  const milestoneMap = {};
  for (const { title, description } of MILESTONES) {
    milestoneMap[title] = await getOrCreateMilestone(title, description);
  }

  // 2. Create epics
  console.log('\n🗂  Creating epics...');
  const epicMap = {};
  for (const epic of EPICS) {
    const issue = await createIssue(epic.title, epic.body, epic.labels, milestoneMap[epic.milestone]);
    epicMap[epic.title] = issue.number;
    console.log(`  ✅ #${issue.number} ${epic.title}`);
    await new Promise((r) => setTimeout(r, 300)); // rate limit safety
  }

  // 3. Create implementation issues
  console.log('\n📋 Creating implementation issues...');
  for (const issue of ISSUES) {
    const epicNumber = epicMap[issue.epic];
    const body = epicNumber
      ? `Part of epic #${epicNumber} — ${issue.epic}`
      : '';
    const created = await createIssue(issue.title, body, issue.labels, milestoneMap[issue.milestone]);
    console.log(`  ✅ #${created.number} ${issue.title}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log('\n🎉 Done! All milestones and issues have been created.');
  console.log(`\nView issues at: https://github.com/${OWNER}/${REPO}/issues`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
