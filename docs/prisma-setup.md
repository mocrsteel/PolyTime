# Prisma setup

This project uses Prisma 7 with the schema-first architecture.

## Files

- `prisma/schema.prisma` defines the PostgreSQL models.
- `prisma/db.ts` creates the Prisma client with `@prisma/adapter-pg`.
- `prisma/migrations` contains database migrations.
- `prisma/seed.ts` contains development seed data.

## Commands

```bash
mise run db:generate
mise run db:migrate
mise run db:seed
mise run db:studio
```

Set `DATABASE_URL` in `.env` before running database commands.
