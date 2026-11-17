"use client";

/**
 * Page shell for account settings and the role-aware prototype workspace.
 * AccountSettings handles profile/password UI; ManagementWorkspace owns demos.
 */
import Heading from "@/components/ui/Heading";
import AccountSettings from "./management/AccountSettings";
import ManagementWorkspace from "./ManagementWorkspace";
import type { ManagementRole } from "./management/model";

export type { ManagementRole } from "./management/model";

export default function ManagementPage({
  role = "User",
}: {
  role?: ManagementRole;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Heading
        title="Management"
        eyebrow="Workspace"
        subtitle="Manage your account and workspace."
        buttons={null}
      />
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded bg-teal-50 px-2 py-1 font-semibold text-teal-800">
          {role}
        </span>
        <span>Prototype data only. Changes are not saved.</span>
      </div>
      <AccountSettings />
      <ManagementWorkspace role={role} />
    </div>
  );
}
