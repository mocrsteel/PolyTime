
import { db } from './db';
import { timesheetEntries } from '../lib/mock';

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing entries cleanly with TRUNCATE CASCADE
  const truncatePlan = db.raw.sql`TRUNCATE TABLE "timeEntry", "project", "asset", "businessUnit", "user", "userGroup" CASCADE;`.affectedCount().build();
  await db.runtime().execute(truncatePlan);

  console.log('🗑️  Cleared existing records');

  // ── Employee Groups ─────────────────────────────────────────────────────────
  const groupDev = await db.orm.public.UserGroup.create({
    name: 'Developers',
    description: 'Software developers and engineers',
  });

  const groupMgmt = await db.orm.public.UserGroup.create({
    name: 'Management',
    description: 'Team leads and project managers',
  });

  console.log('✅ User groups seeded');

  // ── Users ───────────────────────────────────────────────────────────────────
  const manager = await db.orm.public.User.create({
    email: 'manager@polytime.dev',
    name: 'Jane Manager',
    role: 'manager',
    groupId: groupMgmt.id,
  });

  const alice = await db.orm.public.User.create({
    email: 'alice@polytime.dev',
    name: 'Alice Developer',
    role: 'user',
    groupId: groupDev.id,
    managerId: manager.id,
  });

  console.log('✅ Users seeded');

  // ── Business Units ──────────────────────────────────────────────────────────
  const buOps = await db.orm.public.BusinessUnit.create({
    name: 'Operations',
    description: 'Business operations and site management',
  });

  const buCorp = await db.orm.public.BusinessUnit.create({
    name: 'Corporate',
    description: 'Corporate services and overhead',
  });

  console.log('✅ Business units seeded');

  // ── Assets ──────────────────────────────────────────────────────────────────
  const assetPlantNorth = await db.orm.public.Asset.create({
    name: 'Plant North',
    description: 'Main manufacturing facility north',
    businessUnitId: buOps.id,
  });

  const assetFleetWest = await db.orm.public.Asset.create({
    name: 'Fleet West',
    description: 'Western logistics fleet',
    businessUnitId: buOps.id,
  });

  const assetPlantSouth = await db.orm.public.Asset.create({
    name: 'Plant South',
    description: 'Manufacturing facility south',
    businessUnitId: buCorp.id,
  });

  const assetHQSystems = await db.orm.public.Asset.create({
    name: 'HQ Systems',
    description: 'Corporate headquarters IT infrastructure',
    businessUnitId: buCorp.id,
  });

  const assetMap = {
    'Plant North': assetPlantNorth,
    'Fleet West': assetFleetWest,
    'Plant South': assetPlantSouth,
    'HQ Systems': assetHQSystems,
  };

  console.log('✅ Assets seeded');

  // ── Projects ────────────────────────────────────────────────────────────────
  const projectsData = [
    { name: 'Phoenix Upgrade', asset: 'Plant North', bu: buOps },
    { name: 'Nova Rollout', asset: 'Plant North', bu: buOps },
    { name: 'Helios Reporting', asset: 'Fleet West', bu: buOps },
    { name: 'Summit Integration', asset: 'Fleet West', bu: buOps },
    { name: 'Atlas Migration', asset: 'Plant South', bu: buCorp },
    { name: 'Pulse Optimization', asset: 'Plant South', bu: buCorp },
    { name: 'Orion Compliance', asset: 'HQ Systems', bu: buCorp },
    { name: 'Cedar Analytics', asset: 'HQ Systems', bu: buCorp },
  ];

  const projectMap: Record<string, { id: string }> = {};

  for (const p of projectsData) {
    const created = await db.orm.public.Project.create({
      name: p.name,
      description: `${p.name} project`,
      status: 'active',
      businessUnitId: p.bu.id,
      assetId: assetMap[p.asset as keyof typeof assetMap].id,
    });
    projectMap[p.name] = created;
  }

  console.log('✅ Projects seeded');

  // ── Time Entries (from mock.ts) ─────────────────────────────────────────────
  for (const entry of timesheetEntries) {
    const proj = projectMap[entry.project];
    if (!proj) {
      console.warn(`⚠️ Project not found for entry: ${entry.project}`);
      continue;
    }

    const yyyy = entry.date.getFullYear();
    const mm = String(entry.date.getMonth() + 1).padStart(2, '0');
    const dd = String(entry.date.getDate()).padStart(2, '0');

    await db.orm.public.TimeEntry.create({
      description: entry.comments.length > 0 ? entry.comments.join('\n') : null,
      date: `${yyyy}-${mm}-${dd}`,
      hours: entry.hours.toString(),
      status: 'open',
      userId: alice.id,
      projectId: proj.id,
    });
  }

  console.log('✅ Time entries seeded from mock data');

  console.log('\n🎉 Database seeded successfully!');
  await db.close();
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
