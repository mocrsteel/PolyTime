# Management prototype

The management page uses local sample data. Its role prop only chooses a view;
it is not authorization. The route deliberately renders the `User` variant
until a server-authenticated identity is available. Nothing is persisted and no
password, account, role, time entry, or monthly lock is actually changed.

## Schema and implementation gaps

- `User.name` is displayed as the disabled username; the schema has no
  separate username. Decide whether a distinct unique login name is needed.
- Authentication is not represented in the schema. Use the chosen identity
  provider's credential storage or add a secure credential model. Never store
  plaintext passwords. Prefer an expiring, single-use reset link; enforce a
  password change before further access when an administrator initiates one.
  The prototype only marks a reset as required and does not generate a secret.
- `User.isArchived` exists, but disabling an account independently of archival
  requires a separate status or field and session revocation. Specify how
  archived, disabled, and reset-required states interact.
- A month-wide lock needs a persistent period-lock model with a unique month,
  lock/unlock actor and timestamps, and an agreed timezone. Enforce it for all
  entry writes on the server, including concurrent writes. `TimeEntry.status`
  alone cannot protect a month against newly created entries. Decide how
  individual `Frozen` entries interact with a period unlock.
- Add an audit trail for user, role, group, hierarchy, time-entry and period-lock
  changes, including actor, timestamp, and before/after values. Define retention
  and whether corrections require a reason.
- A user has exactly one required `groupId`, and a project has exactly one
  asset and business unit. Multiple memberships or unassigned users require a
  schema change. Ensure a project's business unit matches its asset's business
  unit with server validation and, ideally, a database constraint.
- `Project.status` includes `Archived` as well as a separate `isArchived`
  field. Define their relationship to avoid contradictory states. The existing
  uniqueness constraints also apply to archived names; define restore and name
  reuse rules before persisting the prototype.
- `User.managerId` can represent a reporting line, but the prototype does not
  scope managers to reports or groups. Define this scope explicitly before
  exposing other users' entries or personal data.

## Authorization recommendation

Start with role-based access control using the existing `Role` enum and a
central server-side policy mapping roles to named actions. Add resource checks
for ownership, manager scope, account status, and period locks. Only admins may
assign roles; managers should not reset, disable, or modify privileged accounts.
Protect against self-lockout and removal of the last admin. Apply these checks
to every server read and mutation, not just the UI, and audit sensitive actions.

Bit flags are not needed for the current three roles. They complicate migrations,
inspection, and context-dependent rules without solving ownership or scope. If
delegation becomes a real requirement, introduce named permissions and explicit
role-to-permission assignments, retaining resource-level policy checks rather
than exposing raw bit masks as the authorization model.

## Useful additions for regular users

Consider searching the hierarchy, viewing project descriptions and status,
seeing their own entry history and locked periods, and a secure self-service
password reset. Favorites or recent projects could reduce repetitive time-entry
work. Define visibility and data-retention rules before adding exports.
