# PolyTime MVP Scope & Approach Reference

**Last Updated:** July 10, 2026  
**Target Release:** Q3 2026  
**Version:** 0.5 (Final MVP Release)

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [MVP Goals & Non-Goals](#mvp-goals--non-goals)
3. [Core Features by Epic](#core-features-by-epic)
4. [Architecture & Technology Stack](#architecture--technology-stack)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Data Model Overview](#data-model-overview)
7. [Release Roadmap](#release-roadmap)
8. [Success Metrics](#success-metrics)

---

## Executive Summary

**PolyTime** is a lightweight, responsive timesheet application designed for small to medium-sized organizations to track employee time allocation across projects, assets, and business units. The MVP focuses on core timesheet logging for users and reporting/management for managers.

### Key Stats
- **49 Total Issues** across 10 epics
- **6 Milestones** (Foundation → Polish & Release)
- **2 User Roles** (User, Manager)
- **Tech Stack** TypeScript (93.4%), React/Next.js, Tailwind, Prisma

---

## MVP Goals & Non-Goals

### ✅ MVP Goals

1. **User Timesheet Logging**
   - Users can record daily time entries (project, asset, duration, comments)
   - View day and week summaries
   - Validate against max hours per day
   - Copy day/week for recurring patterns

2. **Manager Oversight**
   - Dashboard to manage users, projects, assets, business units
   - Reports with filtering and aggregation (by employee, project, asset, business unit)
   - CSV export for external analysis
   - Time entry comments visible in reports

3. **Responsive & Accessible**
   - Works on mobile (320px), tablet (768px), desktop (1440px)
   - WCAG 2.1 AA accessibility compliance
   - Keyboard navigation throughout
   - Screen reader compatible

4. **Authentication & Roles**
   - Sign-in/sign-out with role-based access
   - Manager-only UI and API endpoints
   - Session-based auth with server-side protection

5. **Developer Experience**
   - Next.js App Router with clear folder structure
   - Tailwind CSS with token system
   - Storybook for component documentation
   - Unit and integration tests (60%+ coverage)

### ❌ Non-Goals (Post-MVP)

- Mobile app (web only for MVP)
- Advanced approval workflows
- Time tracking (automatic clocking in/out)
- Expense tracking or integration with accounting
- Multi-organization/tenant support
- Advanced analytics or forecasting
- Mobile notifications
- Offline mode

---

## Core Features by Epic

### **Epic 1: App Foundation** (Issues #9–#14)
*Establish the baseline UX and developer patterns.*

**Scope:**
- Next.js App Router structure with root layout, error, not-found, loading pages
- Tailwind CSS + design tokens system
- Responsive sidebar (full/compact)
- Active navigation state (testable)
- Storybook bootstrap with NavButton & Sidebar stories

**Key Outcomes:**
- Clean, scalable folder structure
- Consistent theming across app
- Accessible navigation components
- Developer-friendly documentation

**Rationale:** Strong foundation ensures all future features follow consistent patterns.

---

### **Epic 2: Authentication & Roles** (Issues #15–#18)
*Secure user access and role-based permissions.*

**Scope:**
- User authentication (sign-in, sign-out, session management)
- Role model: User, Manager
- Manager badge UI indicator
- Manager-only route/API protection

**Key Outcomes:**
- Secure session handling
- Role-based access control (RBAC)
- Server-side protection on all manager endpoints
- Clear permission boundary testing

**Rationale:** Authentication is foundational for tracking ownership of time entries and enforcing manager permissions.

---

### **Epic 3: Data Model** (Issues #19–#22)
*Core database schema and soft-delete support.*

**Scope:**
- Users, Projects, Assets, Business Units, Employee Groups tables
- Time Entries with project, asset, business unit, date, duration, comments
- Comments table for time entry annotations
- Audit fields (created_by, created_at, updated_by, updated_at)
- Soft-delete/archive pattern for manager-managed entities

**Key Outcomes:**
- Relational schema with referential integrity
- Audit trail for compliance
- Soft-delete prevents accidental data loss
- Indexed queries for report performance

**Rationale:** A well-designed schema enables reliable reporting and maintains data integrity.

---

### **Epic 4: Timesheet Logging** (Issues #23–#31)
*Core user workflow for recording time.*

**Scope:**
- Day view: all time entries for a date + form to add entries
- Week view: daily totals and all entries for the week
- Time entry form: project, asset, business unit, duration, comments
- Max hours per day validation
- Copy day / copy week actions
- Work schedule rules (optional enforcement)

**Key Outcomes:**
- Users can log time quickly and accurately
- Validation prevents over-booking
- Copy actions improve UX for recurring patterns
- Comments enable context capture

**Rationale:** The core workflow that delivers value to end users.

---

### **Epic 5: Overview Dashboard** (Issues #32–#35)
*User dashboard for timesheet progress.*

**Scope:**
- Dashboard showing timesheet status
- Highlight incomplete days in current month
- Link incomplete days to day timesheet view for editing
- Quick stats (e.g., "5 incomplete days")

**Key Outcomes:**
- Users see progress at a glance
- Easy navigation to catch-up on missing entries
- Encourages timely timesheet completion

**Rationale:** Provides visibility into compliance without forcing users to navigate deep into the app.

---

### **Epic 6: Management** (Issues #36–#42)
*Manager CRUD interfaces for organizational data.*

**Scope:**
- Management dashboard with links to all sections
- Manage users (create, edit, archive/restore, assign roles)
- Manage projects (create, edit, archive)
- Manage assets (create, edit, archive)
- Manage business units (create, edit, archive)
- Manage employee group timesheet rules (create, edit, delete)

**Key Outcomes:**
- Managers can self-serve organizational setup
- Consistent CRUD patterns across all entities
- Bulk operations possible (archive, restore)
- Soft-delete prevents data loss

**Rationale:** Reduces admin overhead and keeps org data current without dev intervention.

---

### **Epic 7: Reports** (Issues #43–#48)
*Manager reporting and data export.*

**Scope:**
- Reports page with filters (date range, employee, project, asset, business unit)
- Aggregation options (by employee, by project, by asset, by business unit)
- Totals (hours, entry count)
- Comments grouped by project
- CSV export

**Key Outcomes:**
- Managers gain visibility into time allocation
- Can export for external analysis or billing
- Comments visible in context of project work
- Responsive table layout

**Rationale:** Reports are the primary value for manager users; export enables integration with external systems.

---

### **Epic 8: Responsive UI & Accessibility** (Issues #49–#51)
*Ensure app works across devices and is WCAG 2.1 AA compliant.*

**Scope:**
- Responsive CSS/layout (320px–1440px+)
- Keyboard navigation throughout
- Screen reader semantics
- Color contrast WCAG AA (4.5:1)
- Form labels, error messages, alt text

**Key Outcomes:**
- No user left behind (works on any device)
- Accessible to users with disabilities
- Meets compliance standards

**Rationale:** Accessibility is a moral and legal imperative; responsive design ensures broad device support.

---

### **Epic 9: Storybook & Testing** (Issues #52–#57)
*Component documentation and test coverage.*

**Scope:**
- Storybook for all shared components
- NavButton, Sidebar, form controls, badges stories
- Stories with variations (states, sizes, themes)
- Unit tests for validation, nav state, calculations
- Integration tests for protected routes, form submission
- Aim for 60%+ code coverage

**Key Outcomes:**
- Living documentation
- Developers can prototype components in isolation
- Regression prevention via tests
- QA confidence

**Rationale:** Storybook + tests reduce bugs and accelerate future development.

---

### **Epic 10: MVP Release** (Issues #58–#60)
*Prepare app for launch.*

**Scope:**
- Database seed script (demo users, projects, assets, business units, sample time entries)
- Release checklist (security, performance, functional, accessibility, browser compatibility)
- Deployment guide
- Breaking changes documentation

**Key Outcomes:**
- Demo-ready app with realistic data
- Pre-release verification checklist
- Documented deployment process
- Clear upgrade path for future versions

**Rationale:** Professional release ensures smooth launch and supports future iterations.

---

## Architecture & Technology Stack

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + Design Tokens
- **UI Components:** React Aria (accessible primitives)
- **Forms:** react-hook-form (validation)
- **State:** React Context / Server State (tRPC or fetch)
- **Documentation:** Storybook 7+
- **Testing:** Jest + React Testing Library

### Backend
- **Runtime:** Node.js 18+
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API:** RESTful (Next.js API routes) or tRPC
- **Auth:** NextAuth.js or custom JWT
- **Logging:** Console (dev), structured (prod)

### DevOps & CI/CD
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Linting:** ESLint, Prettier, husky pre-commit hooks
- **Testing:** Jest (unit), React Testing Library (integration)
- **Deployment:** (TBD — AWS Lambda, Vercel, or self-hosted)

### Key Architectural Decisions
1. **Server Components First:** Use Next.js server components for layouts, data fetching; client components for interactivity
2. **Type Safety:** Strict TypeScript everywhere; shared types between client/server
3. **Accessibility by Default:** React Aria components, semantic HTML, keyboard support baked in
4. **Database-First Design:** Schema drives business logic; migrations versioned

---

## User Roles & Permissions

### Role: **User** (Regular Employee)
**Permissions:**
- View own timesheet (day, week, month)
- Create, edit, delete own time entries
- View own dashboard and incomplete days
- View own profile (read-only for manager)
- Cannot access management or reports UI

**Routes:**
- `/` (overview/dashboard)
- `/timesheets` (day/week views)
- `/profile` (read-only)

### Role: **Manager** (Team Lead, Admin)
**Permissions:**
- All User permissions
- Manage users (CRUD, role assignment)
- Manage projects, assets, business units
- Manage employee group rules
- View all timesheets (read-only)
- Access reports and filtering
- Export reports to CSV
- Archive/restore entities

**Routes:**
- All user routes
- `/management` (dashboard)
- `/management/users`
- `/management/projects`
- `/management/assets`
- `/management/business-units`
- `/management/rules`
- `/reports`

### Permission Enforcement
- **Server-side:** All API routes check session role; return 403 if unauthorized
- **Client-side:** Hide manager-only UI for non-managers
- **Routes:** Protect with middleware or server component checks

---

## Data Model Overview

### Core Tables

```
users
  ├─ id (UUID)
  ├─ name, email
  ├─ role (USER | MANAGER | ADMIN)
  ├─ employee_group_id (FK → employee_groups)
  ├─ archived (soft-delete)
  └─ audit fields (created_by, created_at, updated_by, updated_at)

time_entries
  ├─ id (UUID)
  ├─ user_id (FK → users)
  ├─ project_id (FK → projects)
  ├─ asset_id (FK → assets)
  ├─ business_unit_id (FK → business_units)
  ├─ date (date, no time component)
  ├─ duration_minutes (int)
  ├─ comments (optional text)
  ├─ archived (soft-delete)
  └─ audit fields

projects
  ├─ id (UUID)
  ├─ name, code
  ├─ business_unit_id (FK → business_units)
  ├─ archived
  └─ audit fields

assets
  ├─ id (UUID)
  ├─ name, code
  ├─ project_id (FK → projects)
  ├─ archived
  └─ audit fields

business_units
  ├─ id (UUID)
  ├─ name
  ├─ archived
  └─ audit fields

employee_groups
  ├─ id (UUID)
  ├─ name
  ├─ max_hours_per_day_default (int, minutes or hours)
  └─ audit fields

comments
  ├─ id (UUID)
  ├─ time_entry_id (FK → time_entries)
  ├─ project_id (FK → projects, optional)
  ├─ author_id (FK → users)
  ├─ text (varchar)
  └─ created_at
```

### Key Indexes
- `time_entries(user_id, date)` — fast lookup for user's entries on a day
- `time_entries(project_id, date_range)` — aggregation by project
- `time_entries(business_unit_id, date_range)` — aggregation by BU
- `users(email)` — auth lookups

---

## Release Roadmap

### **Milestone 1: Foundation** (MVP 0.1)
- Next.js app shell, routing, layouts
- Tailwind tokens, responsive sidebar
- Storybook bootstrap
- Basic auth
- Database schema

**Target:** Week 1–2

### **Milestone 2: Timesheets** (MVP 0.2)
- User timesheet UI (day, week)
- Time entry CRUD
- Comments
- Copy day/week
- Overview dashboard
- Manager roles & permissions

**Target:** Week 3–4

### **Milestone 3: Management** (MVP 0.3)
- Manager dashboard & CRUD (users, projects, assets, business units)
- Employee group rules
- Soft-delete/archive

**Target:** Week 5–6

### **Milestone 4: Reports** (MVP 0.4)
- Reports page with filters
- Aggregation queries
- CSV export

**Target:** Week 7

### **Milestone 5: Polish & Release** (MVP 0.5)
- Responsive design (mobile, tablet, desktop)
- Accessibility audit & fixes
- Storybook documentation
- Unit & integration tests
- Seed data
- Release checklist

**Target:** Week 8–9

---

## Success Metrics

### Functional Metrics
- [ ] Users can log time entries and view timesheets without errors
- [ ] Managers can view and filter reports
- [ ] All routes enforce correct permissions (no 403 leaks)
- [ ] Data persists correctly across sessions

### Quality Metrics
- [ ] 60%+ unit/integration test coverage
- [ ] Zero critical security issues (OWASP top 10)
- [ ] 90+ Lighthouse accessibility score
- [ ] <3 sec page load time (core vitals)

### User Experience Metrics
- [ ] Keyboard navigation works on all pages
- [ ] Sidebar responsive on 320px–1440px+ without horizontal scroll
- [ ] Form validation errors clear and actionable
- [ ] Incomplete days badge visible on dashboard

### Documentation Metrics
- [ ] All UI components have Storybook stories
- [ ] README includes local dev + deployment instructions
- [ ] Release checklist completed before launch
- [ ] Migration guide for future versions

---

## Development Workflow

### Branch Strategy
- `main` — production-ready, tagged releases
- `develop` — integration branch for features
- `epic/[name]` — long-running feature branches (e.g., `epic/timesheet-logging`)
- `feature/[name]` — short-lived feature branches

### PR Requirements
- [ ] Tests pass (jest, lint)
- [ ] Code review approved
- [ ] Storybook stories added (if UI component)
- [ ] Docs updated

### Local Development
```bash
# Install
npm install

# Dev server
npm run dev

# Storybook
npm run storybook

# Tests
npm run test

# Linting
npm run lint
```

---

## Known Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Scope creep on features | Delay release | Lock epic scope; defer to Post-MVP |
| Database performance at scale | Slow reports | Index early; test with 10k+ time entries |
| Accessibility compliance | Legal risk | Audit with axe, NVDA, VoiceOver in M5 |
| Auth token expiry edge cases | Session loss | Test session refresh flows thoroughly |
| Mobile UI breaks | Poor UX on phones | Test on real devices starting M5 |
| CSV export large datasets | Export timeout | Paginate exports; add progress indicator |

---

## Next Steps

1. **Create Prisma Schema** (Issue #20)
2. **Set Up Next.js App Shell** (Issue #10)
3. **Implement Auth** (Issue #16)
4. **Build Timesheet UI** (Issues #24–#30)
5. **Add Reports** (Issues #43–#48)
6. **Polish & Release** (Issues #49–#60)

---

## Questions & Clarifications

### Q: Why no mobile app for MVP?
**A:** Web-first allows faster iteration; responsive design covers mobile browsers; native apps deferred to Post-MVP based on user demand.

### Q: Can users see other users' timesheets?
**A:** No; for MVP, users only see their own. Managers see all (read-only). Team/department visibility deferred to Post-MVP.

### Q: How are comments handled in reports?
**A:** Comments are grouped by project; managers can expand to see details. Full text search deferred to Post-MVP.

### Q: What happens if a user is archived mid-month?
**A:** Their time entries remain (soft-delete doesn't cascade). Archived users are hidden from UI but accessible via archive filter.

### Q: Can managers override max hours per day?
**A:** For MVP, no; validation is hard-coded. Post-MVP will add override flag or per-user exceptions.

---

## Glossary

- **Epic** — Large feature area spanning multiple issues (e.g., "Timesheet Logging")
- **Issue** — Actionable work item with acceptance criteria
- **User** — Regular employee logging time
- **Manager** — Team lead with oversight/reporting permissions
- **Soft-delete** — Mark as archived instead of deleting from DB
- **WCAG 2.1 AA** — Web Content Accessibility Guidelines Level AA (mid-level compliance)
- **Storybook** — Component documentation & development environment

---

## Document Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-10 | Initial MVP scope document |

---

**Last Updated:** July 10, 2026  
**Owner:** Development Team  
**Status:** Active (MVP Development Phase)