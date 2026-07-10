#!/usr/bin/env bash
# setup-project-github-cli.sh
#
# Helper script for setting up the PolyTime MVP GitHub Project using the
# GitHub CLI (gh). Provides step-by-step guidance and automates what it can.
#
# Prerequisites:
#   - GitHub CLI installed: https://cli.github.com/
#   - Authenticated: gh auth login
#   - Correct scopes: gh auth refresh -s repo,project
#
# Usage:
#   chmod +x scripts/setup-project-github-cli.sh
#   ./scripts/setup-project-github-cli.sh

set -euo pipefail

OWNER="mocrsteel"
REPO="PolyTime"
PROJECT_TITLE="PolyTime MVP"

# ── Colour helpers ─────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Colour

info()    { echo -e "${BLUE}ℹ  $*${NC}"; }
success() { echo -e "${GREEN}✅ $*${NC}"; }
warn()    { echo -e "${YELLOW}⚠️  $*${NC}"; }
error()   { echo -e "${RED}❌ $*${NC}"; exit 1; }

# ── Pre-flight checks ──────────────────────────────────────────────────────────
echo ""
echo "🚀 PolyTime MVP — GitHub Project Setup"
echo "======================================="
echo ""

# Check gh is installed
if ! command -v gh &>/dev/null; then
  error "GitHub CLI (gh) is not installed. Install it from https://cli.github.com/"
fi
success "GitHub CLI found: $(gh --version | head -1)"

# Check authentication
if ! gh auth status &>/dev/null; then
  error "Not authenticated. Run: gh auth login"
fi
success "Authenticated as: $(gh api user --jq '.login')"

# Check scopes
SCOPES=$(gh auth status 2>&1 | grep -i "Token scopes" || true)
info "Token scopes: ${SCOPES:-unknown (check manually)}"

# ── Step 1: Create milestones ─────────────────────────────────────────────────
echo ""
info "Step 1: Creating milestones..."

create_milestone() {
  local title="$1"
  local desc="$2"
  if gh api "repos/${OWNER}/${REPO}/milestones" --jq '.[].title' 2>/dev/null | grep -q "^${title}$"; then
    warn "Milestone already exists: ${title}"
  else
    gh api "repos/${OWNER}/${REPO}/milestones" \
      -X POST \
      -f title="${title}" \
      -f description="${desc}" \
      --silent
    success "Created milestone: ${title}"
  fi
}

create_milestone "MVP 0.1 — App Foundation"        "App shell, routing, layout, theme tokens, sidebar, Storybook setup"
create_milestone "MVP 0.2 — Authentication"         "User authentication, session management, role-based access control"
create_milestone "MVP 0.3 — Data Model & API"       "Prisma schema, migrations, API routes for core resources"
create_milestone "MVP 0.4 — Timesheet UI"           "Timesheet entry, editing, and submission flows"
create_milestone "MVP 0.5 — Reports & Management"   "Reporting views, manager approval flows, admin panel"
create_milestone "Post-MVP"                          "Nice-to-haves and future enhancements"

# ── Step 2: Create labels ──────────────────────────────────────────────────────
echo ""
info "Step 2: Creating labels..."

create_label() {
  local name="$1"
  local color="$2"
  local desc="$3"
  if gh api "repos/${OWNER}/${REPO}/labels" --jq '.[].name' 2>/dev/null | grep -q "^${name}$"; then
    warn "Label already exists: ${name}"
  else
    gh api "repos/${OWNER}/${REPO}/labels" \
      -X POST \
      -f name="${name}" \
      -f color="${color}" \
      -f description="${desc}" \
      --silent 2>/dev/null || warn "Could not create label: ${name}"
    success "Created label: ${name}"
  fi
}

# Type labels
create_label "epic"          "3E4B9E" "High-level feature epic"
create_label "type:feature"  "0075ca" "New feature implementation"
create_label "type:task"     "e4e669" "Technical task or chore"
create_label "type:bug"      "d73a4a" "Bug fix"
create_label "type:docs"     "0075ca" "Documentation update"

# Area labels
create_label "area:foundation"    "bfd4f2" "App shell and navigation"
create_label "area:auth"          "d4c5f9" "Authentication and authorisation"
create_label "area:data-model"    "c2e0c6" "Database schema and Prisma"
create_label "area:timesheet"     "fef2c0" "Timesheet entry and management"
create_label "area:projects"      "f9d0c4" "Project and asset management"
create_label "area:approval"      "e99695" "Approval workflows"
create_label "area:reports"       "c5def5" "Reporting and analytics"
create_label "area:admin"         "d4c5f9" "Admin panel"
create_label "area:notifications" "fef2c0" "Notifications and alerts"
create_label "area:devex"         "bfdadc" "Developer experience and tooling"

# Priority labels
create_label "priority:p0" "e11d48" "Critical — blocks release"
create_label "priority:p1" "f59e0b" "High — important for MVP"
create_label "priority:p2" "6b7280" "Medium — nice to have"

# Role labels
create_label "role:user"    "dbeafe" "Feature for standard users"
create_label "role:manager" "fce7f3" "Feature for managers"
create_label "role:all"     "f3f4f6" "Feature for all roles"

# ── Step 3: Create GitHub Project ──────────────────────────────────────────────
echo ""
info "Step 3: Creating GitHub Project..."

PROJECT_ID=$(gh project create \
  --owner "${OWNER}" \
  --title "${PROJECT_TITLE}" \
  --format json \
  --jq '.id' 2>/dev/null || echo "")

if [ -z "${PROJECT_ID}" ]; then
  warn "Could not create project via CLI (may require org-level access)."
  info "Create it manually at: https://github.com/users/${OWNER}/projects/new"
  info "Then re-run this script with PROJECT_ID=<id> set to add issues."
else
  success "Created project '${PROJECT_TITLE}' (ID: ${PROJECT_ID})"

  # Add custom fields
  echo ""
  info "Adding custom fields..."

  gh project field-create "${PROJECT_ID}" \
    --owner "${OWNER}" \
    --name "Area" \
    --data-type "SINGLE_SELECT" \
    --single-select-options "Foundation,Auth,Data Model,Timesheet,Projects,Approval,Reports,Admin,Notifications,DevEx" \
    2>/dev/null && success "Field: Area" || warn "Field Area may already exist"

  gh project field-create "${PROJECT_ID}" \
    --owner "${OWNER}" \
    --name "Priority" \
    --data-type "SINGLE_SELECT" \
    --single-select-options "P0 — Critical,P1 — High,P2 — Medium" \
    2>/dev/null && success "Field: Priority" || warn "Field Priority may already exist"

  gh project field-create "${PROJECT_ID}" \
    --owner "${OWNER}" \
    --name "Role" \
    --data-type "SINGLE_SELECT" \
    --single-select-options "User,Manager,All" \
    2>/dev/null && success "Field: Role" || warn "Field Role may already exist"

  gh project field-create "${PROJECT_ID}" \
    --owner "${OWNER}" \
    --name "Estimate (days)" \
    --data-type "NUMBER" \
    2>/dev/null && success "Field: Estimate (days)" || warn "Field Estimate may already exist"

  gh project field-create "${PROJECT_ID}" \
    --owner "${OWNER}" \
    --name "Risk" \
    --data-type "SINGLE_SELECT" \
    --single-select-options "Low,Medium,High" \
    2>/dev/null && success "Field: Risk" || warn "Field Risk may already exist"
fi

# ── Step 4: Run Node.js script for issues ──────────────────────────────────────
echo ""
info "Step 4: Creating issues..."
echo ""
echo "To create all 49 issues, run the Node.js script:"
echo ""
echo "  npm install @octokit/rest @octokit/graphql"
echo "  GITHUB_TOKEN=\$(gh auth token) node scripts/create-github-project-full.js"
echo ""

# ── Summary ────────────────────────────────────────────────────────────────────
echo ""
success "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run: GITHUB_TOKEN=\$(gh auth token) node scripts/create-github-project-full.js"
echo "  2. View issues:  https://github.com/${OWNER}/${REPO}/issues"
echo "  3. View project: https://github.com/users/${OWNER}/projects"
echo ""
