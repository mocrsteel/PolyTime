devDependencies:
+ prisma 8.0.0-rc.10 (8.0.0-rc.13 is available)

[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: msgpackr-extract@3.0.4, workerd@1.20260704.1

Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
✘ pnpm add -D prisma@next
│  target:     postgres
│  authoring:  psl
│  schema:     prisma/contract.prisma

written
├─ prisma/contract.prisma
├─ prisma.config.ts
├─ prisma/db.ts
├─ prisma-next.md
├─ .env.example
├─ tsconfig.json
└─ package.json

⚠ Scaffold written. Finish the steps above to complete setup.
→ Set DATABASE_URL in your environment (export it or add it to .env)
→ Emit the contract: prisma contract emit
→ Edit your schema at prisma/contract.prisma, then emit again
→ Open prisma-next.md for a quick reference on writing your first typed query
→ Set up the Prisma agent skills for your coding agent: prisma init