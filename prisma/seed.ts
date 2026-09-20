
import { db } from './db';
import { ProjectStatus, Role } from '@prisma/client';
import { generateSeedTimeEntries, seedBusinessUnits, seedUsers } from '../lib/mock';

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing entries cleanly with TRUNCATE CASCADE
  await db.$executeRawUnsafe(
    'TRUNCATE TABLE "timeEntry", "project", "asset", "businessUnit", "user", "userGroup" CASCADE;',
  );

  console.log('🗑️  Cleared existing records');

  // ── User Group ───────────────────────────────────────────────────────────
  const group = await db.userGroup.create({
    data: {
      name: 'Everyone',
      description: 'Default group for all seeded users',
    },
  });

  console.log('✅ User group seeded');

  // ── Users ───────────────────────────────────────────────────────────────────
  // Managers must be created before the users that report to them.
  const usersByEmail = new Map<string, { id: string }>();
  const managersFirst = [...seedUsers].sort((a) => (a.managerEmail ? 1 : -1));

  for (const seedUser of managersFirst) {
    const created = await db.user.create({
      data: {
        email: seedUser.email,
        name: seedUser.name,
        role: Role[seedUser.role === 'user' ? 'User' : seedUser.role === 'manager' ? 'Manager' : 'Admin'],
        groupId: group.id,
        managerId: seedUser.managerEmail ? usersByEmail.get(seedUser.managerEmail)?.id : undefined,
      },
    });
    usersByEmail.set(seedUser.email, created);
  }

  console.log('✅ Users seeded');

  // ── Business Units, Assets & Projects ────────────────────────────────────────
  const projectsByKey = new Map<string, { id: string }>();

  for (const bu of seedBusinessUnits) {
    const createdBu = await db.businessUnit.create({
      data: {
        name: bu.name,
        description: bu.description,
      },
    });

    for (const asset of bu.assets) {
      const createdAsset = await db.asset.create({
        data: {
          name: asset.name,
          description: asset.description,
          businessUnitId: createdBu.id,
        },
      });

      for (const project of asset.projects) {
        const createdProject = await db.project.create({
          data: {
            name: project.name,
            description: `${project.name} project`,
            status: ProjectStatus[project.status[0].toUpperCase() + project.status.slice(1) as keyof typeof ProjectStatus],
            businessUnitId: createdBu.id,
            assetId: createdAsset.id,
          },
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

    await db.timeEntry.create({
      data: {
        description: entry.description ?? null,
        date: entry.date,
        hours: entry.hours.toString(),
        status: 'Open',
        userId: user.id,
        projectId: project.id,
      },
    });
  }

  console.log(`✅ Seeded ${timeEntries.length} time entries covering two years across ${seedUsers.length} users`);

  console.log('\n🎉 Database seeded successfully!');
  await db.$disconnect();
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
