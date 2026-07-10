import { PrismaClient, Role, ProjectStatus, EntryStatus, AssetType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear time entries first so the seed is idempotent (no unique natural key)
  await prisma.timeEntry.deleteMany({});
  console.log('🗑️  Cleared existing time entries');

  // ── Business Units ──────────────────────────────────────────────────────────
  const buEngineering = await prisma.businessUnit.upsert({
    where: { code: 'ENG' },
    update: {},
    create: {
      name: 'Engineering',
      code: 'ENG',
      description: 'Software engineering and product development',
    },
  });

  const buOperations = await prisma.businessUnit.upsert({
    where: { code: 'OPS' },
    update: {},
    create: {
      name: 'Operations',
      code: 'OPS',
      description: 'Business operations and administration',
    },
  });

  console.log('✅ Business units seeded');

  // ── Employee Groups ─────────────────────────────────────────────────────────
  const groupDev = await prisma.employeeGroup.upsert({
    where: { id: 'group-dev' },
    update: {},
    create: {
      id: 'group-dev',
      name: 'Developers',
      description: 'Software developers and engineers',
    },
  });

  const groupManagement = await prisma.employeeGroup.upsert({
    where: { id: 'group-management' },
    update: {},
    create: {
      id: 'group-management',
      name: 'Management',
      description: 'Team leads and project managers',
    },
  });

  console.log('✅ Employee groups seeded');

  // ── Users ───────────────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'admin@polytime.dev' },
    update: {},
    create: {
      email: 'admin@polytime.dev',
      name: 'Admin User',
      role: Role.ADMIN,
      businessUnitId: buEngineering.id,
      employeeGroupId: groupManagement.id,
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@polytime.dev' },
    update: {},
    create: {
      email: 'manager@polytime.dev',
      name: 'Jane Manager',
      role: Role.MANAGER,
      businessUnitId: buEngineering.id,
      employeeGroupId: groupManagement.id,
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@polytime.dev' },
    update: {},
    create: {
      email: 'alice@polytime.dev',
      name: 'Alice Developer',
      role: Role.USER,
      businessUnitId: buEngineering.id,
      employeeGroupId: groupDev.id,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@polytime.dev' },
    update: {},
    create: {
      email: 'bob@polytime.dev',
      name: 'Bob Operations',
      role: Role.USER,
      businessUnitId: buOperations.id,
      employeeGroupId: groupDev.id,
    },
  });

  console.log('✅ Users seeded');

  // ── Projects ────────────────────────────────────────────────────────────────
  const projectPolytime = await prisma.project.upsert({
    where: { code: 'PT-CORE' },
    update: {},
    create: {
      name: 'PolyTime Core',
      code: 'PT-CORE',
      description: 'Core timesheeting application development',
      status: ProjectStatus.ACTIVE,
      businessUnitId: buEngineering.id,
    },
  });

  const projectInfra = await prisma.project.upsert({
    where: { code: 'PT-INFRA' },
    update: {},
    create: {
      name: 'Infrastructure',
      code: 'PT-INFRA',
      description: 'Cloud infrastructure and DevOps',
      status: ProjectStatus.ACTIVE,
      businessUnitId: buOperations.id,
    },
  });

  const projectInternal = await prisma.project.upsert({
    where: { code: 'PT-INT' },
    update: {},
    create: {
      name: 'Internal Admin',
      code: 'PT-INT',
      description: 'Internal administration and overhead',
      status: ProjectStatus.ACTIVE,
      businessUnitId: buOperations.id,
    },
  });

  console.log('✅ Projects seeded');

  // ── Assets ──────────────────────────────────────────────────────────────────
  await prisma.asset.upsert({
    where: { code: 'ASSET-LAPTOP-001' },
    update: {},
    create: {
      name: 'MacBook Pro 14"',
      code: 'ASSET-LAPTOP-001',
      type: AssetType.EQUIPMENT,
      description: 'Development laptop',
      projectId: projectPolytime.id,
    },
  });

  await prisma.asset.upsert({
    where: { code: 'ASSET-SW-FIGMA' },
    update: {},
    create: {
      name: 'Figma License',
      code: 'ASSET-SW-FIGMA',
      type: AssetType.SOFTWARE,
      description: 'Design and prototyping tool',
      projectId: projectPolytime.id,
    },
  });

  await prisma.asset.upsert({
    where: { code: 'ASSET-SW-GITHUB' },
    update: {},
    create: {
      name: 'GitHub Enterprise',
      code: 'ASSET-SW-GITHUB',
      type: AssetType.SOFTWARE,
      description: 'Source control and CI/CD',
      projectId: projectInfra.id,
    },
  });

  console.log('✅ Assets seeded');

  // ── Time Entries ────────────────────────────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  // Alice's approved entries
  await prisma.timeEntry.create({
    data: {
      userId: alice.id,
      projectId: projectPolytime.id,
      date: twoDaysAgo,
      hours: 8,
      description: 'Implemented NavButton and Navbar components with accessibility improvements',
      status: EntryStatus.APPROVED,
      approvedById: manager.id,
      approvedAt: yesterday,
    },
  });

  await prisma.timeEntry.create({
    data: {
      userId: alice.id,
      projectId: projectPolytime.id,
      date: yesterday,
      hours: 7.5,
      description: 'Set up Storybook with core UI component stories',
      status: EntryStatus.SUBMITTED,
    },
  });

  await prisma.timeEntry.create({
    data: {
      userId: alice.id,
      projectId: projectPolytime.id,
      date: today,
      hours: 6,
      description: 'Prisma schema design and initial migration',
      status: EntryStatus.DRAFT,
    },
  });

  // Bob's entries
  await prisma.timeEntry.create({
    data: {
      userId: bob.id,
      projectId: projectInfra.id,
      date: yesterday,
      hours: 8,
      description: 'Configure GitHub Actions CI/CD pipeline',
      status: EntryStatus.SUBMITTED,
    },
  });

  await prisma.timeEntry.create({
    data: {
      userId: bob.id,
      projectId: projectInternal.id,
      date: today,
      hours: 2,
      description: 'Team sync and planning',
      status: EntryStatus.DRAFT,
    },
  });

  // Manager's entries
  await prisma.timeEntry.create({
    data: {
      userId: manager.id,
      projectId: projectPolytime.id,
      date: yesterday,
      hours: 3,
      description: 'Sprint planning and backlog grooming',
      status: EntryStatus.APPROVED,
      approvedById: admin.id,
      approvedAt: today,
    },
  });

  console.log('✅ Time entries seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\nSample accounts:');
  console.log('  admin@polytime.dev  (Admin)');
  console.log('  manager@polytime.dev  (Manager)');
  console.log('  alice@polytime.dev  (User)');
  console.log('  bob@polytime.dev  (User)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
