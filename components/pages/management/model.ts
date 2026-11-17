/**
 * Shared contracts and small visual primitives for the management workspace.
 * The coordinator owns mutations; panels and the editor consume these types.
 */
export type ManagementRole = "User" | "Manager" | "Admin";

export type ProjectStatus = "Active" | "Inactive" | "Completed" | "Archived";
export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  isArchived: boolean;
};
export type Asset = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
  projects: Project[];
};
export type Unit = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
  assets: Asset[];
};
export type Group = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
};
export type Person = {
  id: string;
  name: string;
  email: string;
  role: ManagementRole;
  groupId: string;
  isArchived: boolean;
  isDisabled: boolean;
  resetRequired: boolean;
};
export type Entry = {
  id: string;
  userId: string;
  projectId: string;
  date: string;
  hours: number;
  description: string;
  status: "Open" | "Frozen";
};
export type ManagementTab = "Organization" | "People" | "Groups" | "Time entries";
export type ManagementEditorState = {
  kind: "unit" | "asset" | "project" | "person" | "group" | "entry";
  id?: string;
  unitId?: string;
  assetId?: string;
};

export const fieldClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";
export const labelClass = "grid gap-1.5 text-xs font-semibold text-slate-600";