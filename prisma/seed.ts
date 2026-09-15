
import { db } from './db';
import { generateSeedTimeEntries, seedBusinessUnits, seedUsers } from '../lib/mock';

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing entries cleanly with TRUNCATE CASCADE
  const truncatePlan = db.raw.sql`TRUNCATE TABLE "timeEntry", "project", "asset", "businessUnit", "user", "userGroup" CASCADE;`.affectedCount().build();
  await db.runtime().execute(truncatePlan);

  console.log('🗑️  Cleared existing records');

  // ── User Group ───────────────────────────────────────────────────────────
  const group = await db.orm.public.UserGroup.create({
    name: 'Everyone',
    description: 'Default group for all seeded users',
  });

  console.log('✅ User group seeded');

  // ── Users ───────────────────────────────────────────────────────────────────
  // Managers must be created before the users that report to them.
  const usersByEmail = new Map<string, { id: string }>();
  const managersFirst = [...seedUsers].sort((a) => (a.managerEmail ? 1 : -1));

  for (const seedUser of managersFirst) {
    const created = await db.orm.public.User.create({
      email: seedUser.email,
      name: seedUser.name,
      role: seedUser.role,
      groupId: group.id,
      managerId: seedUser.managerEmail ? usersByEmail.get(seedUser.managerEmail)?.id : undefined,
    });
    usersByEmail.set(seedUser.email, created);
  }

  console.log('✅ Users seeded');

  // ── Business Units, Assets & Projects ────────────────────────────────────────
  const projectsByKey = new Map<string, { id: string }>();

  for (const bu of seedBusinessUnits) {
    const createdBu = await db.orm.public.BusinessUnit.create({
      name: bu.name,
      description: bu.description,
    });

    for (const asset of bu.assets) {
      const createdAsset = await db.orm.public.Asset.create({
        name: asset.name,
        description: asset.description,
        businessUnitId: createdBu.id,
      });

      for (const project of asset.projects) {
        const createdProject = await db.orm.public.Project.create({
          name: project.name,
          description: `${project.name} project`,
          status: project.status,
          businessUnitId: createdBu.id,
          assetId: createdAsset.id,
        });
        projectsByKey.set(`${bu.name}|${asset.name}|${project.name}`, createdProject);
      }
    }
  }

  console.log('✅ Business units, assets and projects seeded');

  // ── Time Entries (two years, generated from mock.ts seed data) ──────────────
  const timeEntries = generateSeedTimeEntries();

  for (const entry of timeEntries) {
    const user = usersByEmail.get(entry.userEmail);
    const project = projectsByKey.get(`${entry.businessUnit}|${entry.asset}|${entry.project}`);
    if (!user || !project) {
      console.warn(`⚠️ Skipping entry, missing user/project for ${entry.userEmail} / ${entry.project}`);
      continue;
    }

    const yyyy = entry.date.getFullYear();
    const mm = String(entry.date.getMonth() + 1).padStart(2, '0');
    const dd = String(entry.date.getDate()).padStart(2, '0');

    await db.orm.public.TimeEntry.create({
      description: entry.description ?? null,
      date: `${yyyy}-${mm}-${dd}`,
      hours: entry.hours.toString(),
      status: 'open',
      userId: user.id,
      projectId: project.id,
    });
  }

  console.log(`✅ Seeded ${timeEntries.length} time entries covering two years across ${seedUsers.length} users`);

  console.log('\n🎉 Database seeded successfully!');
  await db.close();
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
