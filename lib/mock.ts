/**
 * Mock data for testing and application development.
 */

import { TimesheetEntry } from "@/components/ui/timesheet/DayEntry";

export const timesheetEntries: TimesheetEntry[] = [
  {
    id: 1,
    businessUnit: "Operations",
    asset: "Plant North",
    project: "Phoenix Upgrade",
    projectColor: 51,
    date: new Date(2026, 6, 1),
    hours: 8,
    comments: ["Closed out onboarding tickets and updated runbook notes.", "Needs additional work to be complete."],
  },
  {
    id: 2,
    businessUnit: "Corporate",
    asset: "Plant South",
    project: "Atlas Migration",
    projectColor: 54,
    date: new Date(2026, 6, 2),
    hours: 9.5,
    comments: [],
  },
  {
    id: 3,
    businessUnit: "Operations",
    asset: "Fleet West",
    project: "Helios Reporting",
    projectColor: 60,
    date: new Date(2026, 6, 3),
    hours: 8,
    comments: ["Reviewed KPI dashboards and aligned report filters."],
  },
  {
    id: 4,
    businessUnit: "Corporate",
    asset: "HQ Systems",
    project: "Orion Compliance",
    projectColor: 5,
    date: new Date(2026, 6, 4),
    hours: 7,
    comments: ["Completed audit checklist prep and follow-up emails."],
  },
  {
    id: 5,
    businessUnit: "Operations",
    asset: "Plant North",
    project: "Nova Rollout",
    projectColor: 7,
    date: new Date(2026, 6, 5),
    hours: 8,
    comments: ["Validated rollout tasks and captured release notes."],
  },
  {
    id: 6,
    businessUnit: "Corporate",
    asset: "Plant South",
    project: "Pulse Optimization",
    projectColor: 11,
    date: new Date(2026, 6, 6),
    hours: 10,
    comments: ["Optimized ETL timings and coordinated with QA on retests."],
  },
  {
    id: 7,
    businessUnit: "Operations",
    asset: "Fleet West",
    project: "Summit Integration",
    projectColor: 69,
    date: new Date(2026, 6, 7),
    hours: 8,
    comments: ["Integrated webhook handlers and verified retry behavior."],
  },
  {
    id: 8,
    businessUnit: "Corporate",
    asset: "HQ Systems",
    project: "Cedar Analytics",
    projectColor: 14,
    date: new Date(2026, 6, 8),
    hours: 2,
    comments: ["Refined event taxonomy and documented data definitions."],
  },
  {
    id: 9,
    businessUnit: "Operations",
    asset: "Plant North",
    project: "Phoenix Upgrade",
    projectColor: 51,
    date: new Date(2026, 6, 8),
    hours: 3,
    comments: ["Patched staging issues and confirmed smoke tests passed."],
  },
  {
    id: 10,
    businessUnit: "Corporate",
    asset: "Plant South",
    project: "Atlas Migration",
    projectColor: 16,
    date: new Date(2026, 6, 8),
    hours: 5,
    comments: ["Ran partial data validation and flagged mapping gaps."],
  },
  {
    id: 11,
    businessUnit: "Operations",
    asset: "Fleet West",
    project: "Helios Reporting",
    projectColor: 60,
    date: new Date(2026, 6, 8),
    hours: 8,
    comments: ["Built report drill-down links and checked access rules."],
  },
  {
    id: 12,
    businessUnit: "Corporate",
    asset: "HQ Systems",
    project: "Orion Compliance",
    projectColor: 5,
    date: new Date(2026, 6, 12),
    hours: 8,
    comments: ["Updated policy references and logged control evidence."],
  },
  {
    id: 13,
    businessUnit: "Operations",
    asset: "Plant North",
    project: "Nova Rollout",
    projectColor: 72,
    date: new Date(2026, 6, 13),
    hours: 8,
    comments: ["Supported rollout QA and resolved one regression defect."],
  },
  {
    id: 14,
    businessUnit: "Corporate",
    asset: "Plant South",
    project: "Pulse Optimization",
    projectColor: 11,
    date: new Date(2026, 6, 14),
    hours: 8,
    comments: ["Benchmarked query plans and documented tuning changes."],
  },
  {
    id: 15,
    businessUnit: "Operations",
    asset: "Fleet West",
    project: "Summit Integration",
    projectColor: 69,
    date: new Date(2026, 6, 15),
    hours: 8,
    comments: ["Completed integration sign-off and wrote handover notes."],
  },
];

/**
 * Seed data used to populate the development database (see prisma/seed.ts).
 * Kept separate from `timesheetEntries` above, which backs UI stories/tests
 * that depend on the exact entries, indices and dates defined there.
 */

export type SeedRole = "user" | "manager" | "admin";

export interface SeedUser {
  readonly name: string;
  readonly email: string;
  readonly role: SeedRole;
  /** Email of this user's manager. Omitted for users with no manager. */
  readonly managerEmail?: string;
}

export const seedUsers: SeedUser[] = [
  { name: "Jane Manager", email: "manager@polytime.dev", role: "manager" },
  { name: "Sam Admin", email: "admin@polytime.dev", role: "admin" },
  { name: "Alice Developer", email: "alice@polytime.dev", role: "user", managerEmail: "manager@polytime.dev" },
];

export interface SeedProject {
  readonly name: string;
  readonly status: "active" | "inactive" | "completed" | "archived";
}

export interface SeedAsset {
  readonly name: string;
  readonly description: string;
  readonly projects: SeedProject[];
}

export interface SeedBusinessUnit {
  readonly name: string;
  readonly description: string;
  readonly assets: SeedAsset[];
}

export const seedBusinessUnits: SeedBusinessUnit[] = [
  {
    name: "Operations",
    description: "Business operations and site management",
    assets: [
      {
        name: "Plant North",
        description: "Main manufacturing facility north",
        projects: [
          { name: "Phoenix Upgrade", status: "active" },
          { name: "Nova Rollout", status: "active" },
        ],
      },
      {
        name: "Fleet West",
        description: "Western logistics fleet",
        projects: [
          { name: "Helios Reporting", status: "active" },
          { name: "Summit Integration", status: "completed" },
        ],
      },
    ],
  },
  {
    name: "Corporate",
    description: "Corporate services and overhead",
    assets: [
      {
        name: "Plant South",
        description: "Manufacturing facility south",
        projects: [
          { name: "Atlas Migration", status: "active" },
          { name: "Pulse Optimization", status: "active" },
        ],
      },
      {
        name: "HQ Systems",
        description: "Corporate headquarters IT infrastructure",
        projects: [
          { name: "Orion Compliance", status: "active" },
          { name: "Cedar Analytics", status: "active" },
        ],
      },
    ],
  },
  {
    name: "Field Services",
    description: "Client-facing field operations and support",
    assets: [
      {
        name: "Regional Depot",
        description: "Regional field operations depot",
        projects: [
          { name: "Meridian Deployment", status: "active" },
          { name: "Vertex Support", status: "active" },
        ],
      },
      {
        name: "Client Site Alpha",
        description: "Primary client on-site engagement",
        projects: [{ name: "Beacon Onboarding", status: "active" }],
      },
    ],
  },
];

export interface SeedTimeEntry {
  readonly userEmail: string;
  readonly businessUnit: string;
  readonly asset: string;
  readonly project: string;
  readonly date: Date;
  readonly hours: number;
  readonly description?: string;
}

const SEED_COMMENTS = [
  "Reviewed backlog and triaged incoming requests.",
  "Paired with the team to resolve a blocking issue.",
  "Prepared status update for stakeholders.",
  "Investigated reported defect and applied a fix.",
  "Attended planning session and updated estimates.",
  "Followed up on outstanding action items.",
];

/** Small deterministic PRNG so seed data is stable across runs. */
function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function projectPoolFor(businessUnitNames: string[]) {
  return seedBusinessUnits
    .filter((bu) => businessUnitNames.includes(bu.name))
    .flatMap((bu) =>
      bu.assets.flatMap((asset) =>
        asset.projects.map((project) => ({
          businessUnit: bu.name,
          asset: asset.name,
          project: project.name,
        })),
      ),
    );
}

/**
 * Generates ~two years of weekday time entries (ending on `referenceDate`) for each
 * seed user, sampling from the projects belonging to that user's business unit(s).
 */
export function generateSeedTimeEntries(referenceDate: Date = new Date()): SeedTimeEntry[] {
  const rng = mulberry32(20260101);
  const entries: SeedTimeEntry[] = [];

  const userProjectPools: Record<string, ReturnType<typeof projectPoolFor>> = {
    "manager@polytime.dev": projectPoolFor(["Field Services"]),
    "admin@polytime.dev": projectPoolFor(["Corporate"]),
    "alice@polytime.dev": projectPoolFor(["Operations"]),
  };

  const end = new Date(referenceDate);
  end.setHours(0, 0, 0, 0);

  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 2);

  for (const [userEmail, pool] of Object.entries(userProjectPools)) {
    for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
      const weekday = day.getDay();
      if (weekday === 0 || weekday === 6) continue; // skip weekends

      if (rng() > 0.65) continue; // account for time off / gaps

      const entryCount = rng() > 0.85 ? 2 : 1;
      let remainingHours = Math.round(6 + rng() * 3);

      for (let i = 0; i < entryCount; i++) {
        const choice = pool[Math.floor(rng() * pool.length)];
        const isLast = i === entryCount - 1;
        const hours = isLast ? remainingHours : Math.round(2 + rng() * 3);
        remainingHours -= hours;

        entries.push({
          userEmail,
          businessUnit: choice.businessUnit,
          asset: choice.asset,
          project: choice.project,
          date: new Date(day),
          hours,
          description: rng() > 0.5 ? SEED_COMMENTS[Math.floor(rng() * SEED_COMMENTS.length)] : undefined,
        });
      }
    }
  }

  return entries;
}
