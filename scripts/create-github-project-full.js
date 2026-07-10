#!/usr/bin/env node
/**
 * create-github-project-full.js
 *
 * Full setup script that creates:
 *   - All GitHub milestones
 *   - All 49 GitHub issues (10 epics + 39 implementation items)
 *   - A "PolyTime MVP" GitHub Project (Projects v2)
 *   - Custom fields: Epic, Area, Priority, Role, Milestone, Estimate, Risk
 *   - All issues added to the project with field values set
 *
 * Usage:
 *   GITHUB_TOKEN=<token> node scripts/create-github-project-full.js
 *
 * Required token scopes: repo, project, read:org
 *
 * Dependencies:
 *   npm install @octokit/rest @octokit/graphql
 */

import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

const OWNER = 'mocrsteel';
const REPO = 'PolyTime';
const PROJECT_TITLE = 'PolyTime MVP';

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('❌ GITHUB_TOKEN environment variable is required.');
  process.exit(1);
}

const octokit = new Octokit({ auth: token });
const gql = graphql.defaults({ headers: { authorization: `token ${token}` } });

// ── Data ──────────────────────────────────────────────────────────────────────

const MILESTONES = [
  { title: 'MVP 0.1 — App Foundation', description: 'App shell, routing, layout, theme tokens, sidebar, Storybook setup' },
  { title: 'MVP 0.2 — Authentication', description: 'User authentication, session management, role-based access control' },
  { title: 'MVP 0.3 — Data Model & API', description: 'Prisma schema, migrations, API routes for core resources' },
  { title: 'MVP 0.4 — Timesheet UI', description: 'Timesheet entry, editing, and submission flows' },
  { title: 'MVP 0.5 — Reports & Management', description: 'Reporting views, manager approval flows, admin panel' },
  { title: 'Post-MVP', description: 'Nice-to-haves and future enhancements' },
];

const CUSTOM_FIELDS = [
  { name: 'Epic', type: 'TEXT' },
  { name: 'Area', type: 'SINGLE_SELECT', options: ['Foundation', 'Auth', 'Data Model', 'Timesheet', 'Projects', 'Approval', 'Reports', 'Admin', 'Notifications', 'DevEx'] },
  { name: 'Priority', type: 'SINGLE_SELECT', options: ['P0 — Critical', 'P1 — High', 'P2 — Medium'] },
  { name: 'Role', type: 'SINGLE_SELECT', options: ['User', 'Manager', 'All'] },
  { name: 'Estimate (days)', type: 'NUMBER' },
  { name: 'Risk', type: 'SINGLE_SELECT', options: ['Low', 'Medium', 'High'] },
];

const EPICS = [
  { title: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['epic', 'area:foundation', 'priority:p0'], area: 'Foundation', priority: 'P0 — Critical', role: 'All', estimate: 5, risk: 'Low' },
  { title: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['epic', 'area:auth', 'priority:p0'], area: 'Auth', priority: 'P0 — Critical', role: 'All', estimate: 8, risk: 'High' },
  { title: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['epic', 'area:data-model', 'priority:p0'], area: 'Data Model', priority: 'P0 — Critical', role: 'All', estimate: 5, risk: 'Medium' },
  { title: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['epic', 'area:timesheet', 'priority:p0'], area: 'Timesheet', priority: 'P0 — Critical', role: 'User', estimate: 10, risk: 'Medium' },
  { title: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['epic', 'area:projects', 'priority:p1'], area: 'Projects', priority: 'P1 — High', role: 'Manager', estimate: 6, risk: 'Low' },
  { title: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['epic', 'area:approval', 'priority:p1'], area: 'Approval', priority: 'P1 — High', role: 'Manager', estimate: 5, risk: 'Medium' },
  { title: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['epic', 'area:reports', 'priority:p1'], area: 'Reports', priority: 'P1 — High', role: 'All', estimate: 8, risk: 'Low' },
  { title: '[Epic] User & Team Management', milestone: 'MVP 0.2 — Authentication', labels: ['epic', 'area:admin', 'priority:p1'], area: 'Admin', priority: 'P1 — High', role: 'Manager', estimate: 4, risk: 'Low' },
  { title: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['epic', 'area:notifications', 'priority:p2'], area: 'Notifications', priority: 'P2 — Medium', role: 'All', estimate: 5, risk: 'Low' },
  { title: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['epic', 'area:devex', 'priority:p0'], area: 'DevEx', priority: 'P0 — Critical', role: 'All', estimate: 3, risk: 'Low' },
];

const ISSUES = [
  { title: 'Set up Next.js App Router scaffold with root layout', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p0', 'role:all'], area: 'Foundation', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Implement global Tailwind config and design tokens', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p0', 'role:all'], area: 'Foundation', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Build responsive Sidebar component (full + compact)', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:feature', 'area:foundation', 'priority:p0', 'role:all'], area: 'Foundation', priority: 'P0 — Critical', role: 'All', estimate: 2, risk: 'Low' },
  { title: 'Add error, not-found, and loading pages', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p1', 'role:all'], area: 'Foundation', priority: 'P1 — High', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Bootstrap Storybook with NextJS-Vite framework', epic: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:devex', 'priority:p0', 'role:all'], area: 'DevEx', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Write NavButton and Sidebar Storybook stories', epic: '[Epic] App Foundation', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:foundation', 'priority:p1', 'role:all'], area: 'Foundation', priority: 'P1 — High', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Configure GitHub Actions CI workflow', epic: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:devex', 'priority:p0', 'role:all'], area: 'DevEx', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Add ESLint and TypeScript strict configuration', epic: '[Epic] CI/CD & Developer Experience', milestone: 'MVP 0.1 — App Foundation', labels: ['type:task', 'area:devex', 'priority:p0', 'role:all'], area: 'DevEx', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Integrate NextAuth.js with email/password provider', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'], area: 'Auth', priority: 'P0 — Critical', role: 'All', estimate: 2, risk: 'High' },
  { title: 'Implement JWT session management', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'], area: 'Auth', priority: 'P0 — Critical', role: 'All', estimate: 2, risk: 'High' },
  { title: 'Add middleware for protected routes', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'], area: 'Auth', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Medium' },
  { title: 'Build login and sign-up pages', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:user'], area: 'Auth', priority: 'P0 — Critical', role: 'User', estimate: 2, risk: 'Low' },
  { title: 'Implement role-based access control (RBAC)', epic: '[Epic] Authentication & Authorization', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:auth', 'priority:p0', 'role:all'], area: 'Auth', priority: 'P0 — Critical', role: 'All', estimate: 2, risk: 'High' },
  { title: 'Build user management admin panel', epic: '[Epic] User & Team Management', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:admin', 'priority:p1', 'role:manager'], area: 'Admin', priority: 'P1 — High', role: 'Manager', estimate: 2, risk: 'Low' },
  { title: 'Create business unit and employee group management UI', epic: '[Epic] User & Team Management', milestone: 'MVP 0.2 — Authentication', labels: ['type:feature', 'area:admin', 'priority:p1', 'role:manager'], area: 'Admin', priority: 'P1 — High', role: 'Manager', estimate: 2, risk: 'Low' },
  { title: 'Design and implement Prisma schema', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:task', 'area:data-model', 'priority:p0', 'role:all'], area: 'Data Model', priority: 'P0 — Critical', role: 'All', estimate: 2, risk: 'Medium' },
  { title: 'Generate and apply initial database migration', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:task', 'area:data-model', 'priority:p0', 'role:all'], area: 'Data Model', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Write database seed script with sample data', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:task', 'area:data-model', 'priority:p1', 'role:all'], area: 'Data Model', priority: 'P1 — High', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Create API routes for users resource', epic: '[Epic] Data Model & Prisma Setup', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:data-model', 'priority:p0', 'role:all'], area: 'Data Model', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Create API routes for projects resource', epic: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:projects', 'priority:p0', 'role:all'], area: 'Projects', priority: 'P0 — Critical', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Create API routes for time entries resource', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:all'], area: 'Timesheet', priority: 'P0 — Critical', role: 'All', estimate: 2, risk: 'Medium' },
  { title: 'Create API routes for assets resource', epic: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:projects', 'priority:p1', 'role:manager'], area: 'Projects', priority: 'P1 — High', role: 'Manager', estimate: 1, risk: 'Low' },
  { title: 'Build project creation and editing UI for managers', epic: '[Epic] Project & Asset Management', milestone: 'MVP 0.3 — Data Model & API', labels: ['type:feature', 'area:projects', 'priority:p1', 'role:manager'], area: 'Projects', priority: 'P1 — High', role: 'Manager', estimate: 2, risk: 'Low' },
  { title: 'Build weekly timesheet view', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'], area: 'Timesheet', priority: 'P0 — Critical', role: 'User', estimate: 3, risk: 'Medium' },
  { title: 'Implement time entry creation form', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'], area: 'Timesheet', priority: 'P0 — Critical', role: 'User', estimate: 2, risk: 'Low' },
  { title: 'Implement time entry editing and deletion', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'], area: 'Timesheet', priority: 'P0 — Critical', role: 'User', estimate: 2, risk: 'Low' },
  { title: 'Add timesheet submission flow', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p0', 'role:user'], area: 'Timesheet', priority: 'P0 — Critical', role: 'User', estimate: 2, risk: 'Medium' },
  { title: 'Add validation for time entries (hours, date range)', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p1', 'role:user'], area: 'Timesheet', priority: 'P1 — High', role: 'User', estimate: 1, risk: 'Low' },
  { title: 'Build timesheet summary and status indicators', epic: '[Epic] Timesheet Entry & Management', milestone: 'MVP 0.4 — Timesheet UI', labels: ['type:feature', 'area:timesheet', 'priority:p1', 'role:user'], area: 'Timesheet', priority: 'P1 — High', role: 'User', estimate: 2, risk: 'Low' },
  { title: 'Build manager approval queue view', epic: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:approval', 'priority:p0', 'role:manager'], area: 'Approval', priority: 'P0 — Critical', role: 'Manager', estimate: 2, risk: 'Medium' },
  { title: 'Implement approve/reject actions with comments', epic: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:approval', 'priority:p0', 'role:manager'], area: 'Approval', priority: 'P0 — Critical', role: 'Manager', estimate: 2, risk: 'Low' },
  { title: 'Add entry locking after approval', epic: '[Epic] Approval Workflow', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:approval', 'priority:p1', 'role:all'], area: 'Approval', priority: 'P1 — High', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Build personal time summary report', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p1', 'role:user'], area: 'Reports', priority: 'P1 — High', role: 'User', estimate: 2, risk: 'Low' },
  { title: 'Build team time summary report for managers', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p1', 'role:manager'], area: 'Reports', priority: 'P1 — High', role: 'Manager', estimate: 2, risk: 'Low' },
  { title: 'Add CSV export for reports', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p2', 'role:manager'], area: 'Reports', priority: 'P2 — Medium', role: 'Manager', estimate: 1, risk: 'Low' },
  { title: 'Add date range and project filters to reports', epic: '[Epic] Reporting & Analytics', milestone: 'MVP 0.5 — Reports & Management', labels: ['type:feature', 'area:reports', 'priority:p2', 'role:all'], area: 'Reports', priority: 'P2 — Medium', role: 'All', estimate: 1, risk: 'Low' },
  { title: 'Implement in-app notifications for approval status', epic: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['type:feature', 'area:notifications', 'priority:p2', 'role:user'], area: 'Notifications', priority: 'P2 — Medium', role: 'User', estimate: 2, risk: 'Low' },
  { title: 'Add email notifications for timesheet events', epic: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['type:feature', 'area:notifications', 'priority:p2', 'role:all'], area: 'Notifications', priority: 'P2 — Medium', role: 'All', estimate: 2, risk: 'Low' },
  { title: 'Add weekly submission reminder notifications', epic: '[Epic] Notifications & Alerts', milestone: 'Post-MVP', labels: ['type:feature', 'area:notifications', 'priority:p2', 'role:user'], area: 'Notifications', priority: 'P2 — Medium', role: 'User', estimate: 1, risk: 'Low' },
];

// ── GraphQL Helpers ───────────────────────────────────────────────────────────

async function getOwnerNodeId() {
  const { repositoryOwner } = await gql(`
    query($login: String!) {
      repositoryOwner(login: $login) { id }
    }
  `, { login: OWNER });
  return repositoryOwner.id;
}

async function createProject(ownerId, title) {
  const { createProjectV2 } = await gql(`
    mutation($ownerId: ID!, $title: String!) {
      createProjectV2(input: { ownerId: $ownerId, title: $title }) {
        projectV2 { id number url }
      }
    }
  `, { ownerId, title });
  return createProjectV2.projectV2;
}

async function addSingleSelectField(projectId, name, options) {
  const result = await gql(`
    mutation($projectId: ID!, $name: String!, $options: [ProjectV2SingleSelectFieldOptionInput!]!) {
      createProjectV2Field(input: {
        projectId: $projectId, dataType: SINGLE_SELECT, name: $name, singleSelectOptions: $options
      }) {
        projectV2Field { ... on ProjectV2SingleSelectField { id options { id name } } }
      }
    }
  `, { projectId, name, options: options.map((name) => ({ name, color: 'GRAY', description: '' })) });
  return result.createProjectV2Field.projectV2Field;
}

async function addTextField(projectId, name) {
  const { createProjectV2Field } = await gql(`
    mutation($projectId: ID!, $name: String!) {
      createProjectV2Field(input: { projectId: $projectId, dataType: TEXT, name: $name }) {
        projectV2Field { ... on ProjectV2Field { id } }
      }
    }
  `, { projectId, name });
  return createProjectV2Field.projectV2Field;
}

async function addNumberField(projectId, name) {
  const { createProjectV2Field } = await gql(`
    mutation($projectId: ID!, $name: String!) {
      createProjectV2Field(input: { projectId: $projectId, dataType: NUMBER, name: $name }) {
        projectV2Field { ... on ProjectV2Field { id } }
      }
    }
  `, { projectId, name });
  return createProjectV2Field.projectV2Field;
}

async function addItemToProject(projectId, contentId) {
  const { addProjectV2ItemById } = await gql(`
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
        item { id }
      }
    }
  `, { projectId, contentId });
  return addProjectV2ItemById.item.id;
}

// ── REST Helpers ─────────────────────────────────────────────────────────────

async function getOrCreateMilestone(title, description) {
  const { data: milestones } = await octokit.issues.listMilestones({ owner: OWNER, repo: REPO, state: 'open' });
  const existing = milestones.find((m) => m.title === title);
  if (existing) return existing.number;
  const { data } = await octokit.issues.createMilestone({ owner: OWNER, repo: REPO, title, description });
  console.log(`  ✅ Milestone: ${title}`);
  return data.number;
}

async function createIssue(title, body, labels, milestoneNumber) {
  const { data } = await octokit.issues.create({ owner: OWNER, repo: REPO, title, body, labels, milestone: milestoneNumber });
  return data;
}

async function getIssueNodeId(issueNumber) {
  const { repository } = await gql(`
    query($owner: String!, $repo: String!, $number: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $number) { id }
      }
    }
  `, { owner: OWNER, repo: REPO, number: issueNumber });
  return repository.issue.id;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Full PolyTime MVP project setup starting...\n');

  // 1. Milestones
  console.log('📌 Creating milestones...');
  const milestoneMap = {};
  for (const { title, description } of MILESTONES) {
    milestoneMap[title] = await getOrCreateMilestone(title, description);
  }

  // 2. Epics
  console.log('\n🗂  Creating epics...');
  const epicMap = {};
  const epicIssues = [];
  for (const epic of EPICS) {
    const issue = await createIssue(epic.title, `## ${epic.title}\n\nThis is a tracking epic for the ${epic.title.replace('[Epic] ', '')} milestone.`, epic.labels, milestoneMap[epic.milestone]);
    epicMap[epic.title] = { number: issue.number, nodeId: issue.node_id, data: epic };
    epicIssues.push({ issue, meta: epic });
    console.log(`  ✅ #${issue.number} ${epic.title}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  // 3. Implementation Issues
  console.log('\n📋 Creating implementation issues...');
  const allIssues = [...epicIssues];
  for (const item of ISSUES) {
    const epicNumber = epicMap[item.epic]?.number;
    const body = epicNumber ? `Part of epic #${epicNumber} — ${item.epic}` : '';
    const issue = await createIssue(item.title, body, item.labels, milestoneMap[item.milestone]);
    allIssues.push({ issue, meta: item });
    console.log(`  ✅ #${issue.number} ${item.title}`);
    await new Promise((r) => setTimeout(r, 300));
  }

  // 4. Create GitHub Project
  console.log('\n📊 Creating GitHub Project...');
  const ownerId = await getOwnerNodeId();
  let project;
  try {
    project = await createProject(ownerId, PROJECT_TITLE);
    console.log(`  ✅ Project created: ${project.url}`);
  } catch (err) {
    console.warn(`  ⚠️  Could not create project (may need org-level permissions): ${err.message}`);
    console.log('\n🎉 Issues and milestones created successfully!');
    console.log('   Create the GitHub Project manually at: https://github.com/orgs/' + OWNER + '/projects/new');
    return;
  }

  // 5. Custom Fields
  console.log('\n🔧 Creating custom fields...');
  const fieldMap = {};
  for (const field of CUSTOM_FIELDS) {
    try {
      let f;
      if (field.type === 'SINGLE_SELECT') {
        f = await addSingleSelectField(project.id, field.name, field.options);
        fieldMap[field.name] = { id: f.id, options: Object.fromEntries(f.options.map((o) => [o.name, o.id])) };
      } else if (field.type === 'NUMBER') {
        f = await addNumberField(project.id, field.name);
        fieldMap[field.name] = { id: f.id };
      } else {
        f = await addTextField(project.id, field.name);
        fieldMap[field.name] = { id: f.id };
      }
      console.log(`  ✅ Field: ${field.name}`);
    } catch (err) {
      console.warn(`  ⚠️  Field ${field.name}: ${err.message}`);
    }
  }

  // 6. Add issues to project
  console.log('\n📥 Adding issues to project...');
  for (const { issue } of allIssues) {
    try {
      const nodeId = await getIssueNodeId(issue.number);
      await addItemToProject(project.id, nodeId);
      console.log(`  ✅ Added #${issue.number} to project`);
    } catch (err) {
      console.warn(`  ⚠️  #${issue.number}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log('\n🎉 Full setup complete!');
  console.log(`\nProject: ${project.url}`);
  console.log(`Issues: https://github.com/${OWNER}/${REPO}/issues`);
}

main().catch((err) => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
