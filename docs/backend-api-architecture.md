# Backend and API Architecture Proposal

## Why this stack beyond the frontend

Given the current codebase (`Next.js` + TypeScript + existing Prisma setup), the recommended path is:

- TypeScript backend first for speed of delivery and shared frontend/backend language
- Add Rust later for CPU-heavy or high-concurrency workloads

### Primary recommendation (now)

- API runtime: Next.js Route Handlers (`app/api/*`) or a separate `Fastify` service
- Validation: `zod`
- ORM + DB: `Prisma` + `PostgreSQL`
- Auth: `Auth.js` (NextAuth)
- Cache + queue backend: `Redis`
- Background jobs: `BullMQ`
- Observability: `pino`, OpenTelemetry, Sentry

### Strong alternative

- Rust API service (`axum` or `actix-web`)
- SQL access with `sqlx` or `SeaORM`
- Keep Next.js as frontend/BFF

## Why zod, BullMQ, and Redis

### zod

- Runtime validation for request bodies, query params, and env config
- Type inference for TypeScript from the same schemas
- Prevents invalid data from reaching business logic and the database

### Redis

- Fast in-memory datastore used for caching, locks, rate limits, ephemeral state
- Shared state across multiple app instances
- Queue backend for BullMQ

### BullMQ

- Redis-backed background job queue
- Handles retries, delays, backoff, concurrency, progress tracking
- Ideal for async workflows like copy-week, exports, report generation

## Application API flow

## High-level flow

```text
UI (Next.js components)
  -> API Route Handler (app/api/*)
  -> zod validation
  -> auth/authorization
  -> service layer (business rules)
  -> repository/data access (Prisma)
  -> PostgreSQL
  -> JSON response
```

Async branch:

```text
service layer -> enqueue BullMQ job -> worker consumes job -> DB updates -> UI revalidates/polls
```

## Current UI actions mapped to API

From `components/pages/Timesheets.tsx`:

- Add entry
- Copy day
- Copy week

Recommended endpoints:

- `GET /api/timesheets/week?start=YYYY-MM-DD&end=YYYY-MM-DD`
- `POST /api/timesheets/entries`
- `PATCH /api/timesheets/entries/:entryId`
- `DELETE /api/timesheets/entries/:entryId`
- `POST /api/timesheets/copy-day`
- `POST /api/timesheets/copy-week`
- `GET /api/jobs/:jobId` (for async jobs)

## Use-case flows

### 1) Get week data

1. UI week selector changes (`WeekSelect`)
2. Client requests `GET /api/timesheets/week`
3. API validates query with `zod`
4. API checks session and authorization
5. Service reads entries + aggregates via Prisma
6. API returns week payload for `WeekTabs` and `Meter`

### 2) Add entry

1. Client posts to `POST /api/timesheets/entries`
2. Validate payload (`date`, `projectId`, `minutes`, `note`)
3. Authorize user access to project
4. Write in DB transaction
5. Return created entry and updated summary

### 3) Copy day

1. Client posts source/target day
2. Validate + authorize + conflict checks
3. Execute synchronously for small operation
4. Optionally enqueue async job when rules/process become heavy

### 4) Copy week

1. Client posts source/target week start dates
2. API validates and enqueues BullMQ job
3. Worker copies entries with business rules
4. UI polls `GET /api/jobs/:jobId` or revalidates week endpoint

## Proposed API contracts (JSON)

> Dates are ISO strings (`YYYY-MM-DD` for day-level fields, ISO datetime where needed).

### GET /api/timesheets/week

Query:

```json
{
  "start": "2026-08-03",
  "end": "2026-08-09"
}
```

200 Response:

```json
{
  "week": {
    "start": "2026-08-03",
    "end": "2026-08-09",
    "maximumMinutes": 2400,
    "totalMinutes": 1800,
    "completion": 0.75
  },
  "days": [
    {
      "date": "2026-08-03",
      "totalMinutes": 420,
      "entries": [
        {
          "id": "ent_123",
          "projectId": "proj_1",
          "projectName": "Internal",
          "minutes": 180,
          "note": "Planning",
          "startTime": "2026-08-03T08:30:00.000Z",
          "endTime": "2026-08-03T11:30:00.000Z"
        }
      ]
    }
  ]
}
```

### POST /api/timesheets/entries

Request:

```json
{
  "date": "2026-08-06",
  "projectId": "proj_1",
  "minutes": 120,
  "note": "Code review",
  "startTime": "2026-08-06T09:00:00.000Z",
  "endTime": "2026-08-06T11:00:00.000Z"
}
```

201 Response:

```json
{
  "entry": {
    "id": "ent_456",
    "date": "2026-08-06",
    "projectId": "proj_1",
    "minutes": 120,
    "note": "Code review",
    "startTime": "2026-08-06T09:00:00.000Z",
    "endTime": "2026-08-06T11:00:00.000Z",
    "createdAt": "2026-08-08T10:12:34.000Z",
    "updatedAt": "2026-08-08T10:12:34.000Z"
  },
  "week": {
    "start": "2026-08-03",
    "end": "2026-08-09",
    "maximumMinutes": 2400,
    "totalMinutes": 1920,
    "completion": 0.8
  }
}
```

### PATCH /api/timesheets/entries/:entryId

Request:

```json
{
  "minutes": 150,
  "note": "Code review + fixes"
}
```

200 Response:

```json
{
  "entry": {
    "id": "ent_456",
    "minutes": 150,
    "note": "Code review + fixes",
    "updatedAt": "2026-08-08T10:20:12.000Z"
  }
}
```

### DELETE /api/timesheets/entries/:entryId

200 Response:

```json
{
  "deleted": true,
  "entryId": "ent_456"
}
```

### POST /api/timesheets/copy-day

Request:

```json
{
  "sourceDate": "2026-08-04",
  "targetDate": "2026-08-05",
  "mode": "merge"
}
```

200 Response (sync):

```json
{
  "copiedCount": 4,
  "targetDate": "2026-08-05",
  "week": {
    "start": "2026-08-03",
    "end": "2026-08-09",
    "totalMinutes": 2040
  }
}
```

202 Response (async):

```json
{
  "accepted": true,
  "jobId": "job_copy_day_789",
  "status": "queued"
}
```

### POST /api/timesheets/copy-week

Request:

```json
{
  "sourceWeekStart": "2026-07-27",
  "targetWeekStart": "2026-08-03",
  "mode": "overwrite"
}
```

202 Response:

```json
{
  "accepted": true,
  "jobId": "job_copy_week_101",
  "status": "queued"
}
```

### GET /api/jobs/:jobId

200 Response:

```json
{
  "jobId": "job_copy_week_101",
  "type": "copy-week",
  "status": "active",
  "progress": 65,
  "result": null,
  "error": null,
  "createdAt": "2026-08-08T10:30:00.000Z",
  "updatedAt": "2026-08-08T10:31:10.000Z"
}
```

Completed response example:

```json
{
  "jobId": "job_copy_week_101",
  "type": "copy-week",
  "status": "completed",
  "progress": 100,
  "result": {
    "copiedCount": 23,
    "targetWeekStart": "2026-08-03"
  },
  "error": null,
  "createdAt": "2026-08-08T10:30:00.000Z",
  "updatedAt": "2026-08-08T10:32:00.000Z"
}
```

## Common error contract

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request payload is invalid",
    "details": [
      {
        "path": "minutes",
        "message": "Must be greater than 0"
      }
    ],
    "requestId": "req_abc123"
  }
}
```

Suggested code mapping:

- `400` validation error
- `401` unauthenticated
- `403` unauthorized
- `404` not found
- `409` conflict
- `422` business rule violation
- `500` internal error

## Suggested backend structure in this repo

```text
docs/
  backend-api-architecture.md
app/
  api/
    timesheets/
      week/route.ts
      entries/route.ts
      entries/[entryId]/route.ts
      copy-day/route.ts
      copy-week/route.ts
    jobs/
      [jobId]/route.ts
lib/
  schemas/timesheet.ts
  services/timesheet-service.ts
  repositories/timesheet-repo.ts
  queues/
    copy-week-queue.ts
workers/
  copy-week-worker.ts
```

## Delivery strategy

1. Start with synchronous `GET /week` and `POST /entries`
2. Add `copy-day` sync
3. Add Redis + BullMQ for `copy-week` async
4. Add job status endpoint and UI polling/revalidation
5. Add observability and retry policies

