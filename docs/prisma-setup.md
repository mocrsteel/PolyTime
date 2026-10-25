# Prisma setup

This project uses Prisma 7 with the schema-first architecture.

## Files

- `prisma/schema.prisma` defines the PostgreSQL models.
- `prisma/db.ts` creates the Prisma client with `@prisma/adapter-pg`.
- `prisma/migrations` contains database migrations.
- `prisma/seed.ts` contains development seed data.

## Commands

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm db:studio
```

Set `DATABASE_URL` in `.env` before running database commands.
