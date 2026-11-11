"use client";

import { useState } from "react";
import { eachDayOfInterval, endOfMonth, format, parseISO } from "date-fns";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import {
  IoChevronDownOutline,
  IoFolderOpenOutline,
  IoPencilOutline,
  IoArchiveOutline,
  IoRefreshOutline,
  IoBanOutline,
} from "react-icons/io5";
import Button from "@/components/ui/Button";
import type { ManagementRole } from "./ManagementPage";

type ProjectStatus = "Active" | "Inactive" | "Completed" | "Archived";
type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  isArchived: boolean;
};
type Asset = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
  projects: Project[];
};
type Unit = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
  assets: Asset[];
};
type Group = {
  id: string;
  name: string;
  description: string;
  isArchived: boolean;
};
type Person = {
  id: string;
  name: string;
  email: string;
  role: ManagementRole;
  groupId: string;
  isArchived: boolean;
  isDisabled: boolean;
  resetRequired: boolean;
};
type Entry = {
  id: string;
  userId: string;
  projectId: string;
  date: string;
  hours: number;
  description: string;
  status: "Open" | "Frozen";
};
type Tab = "Organization" | "People" | "Groups" | "Time entries";
type Editor = {
  kind: "unit" | "asset" | "project" | "person" | "group" | "entry";
  id?: string;
  unitId?: string;
  assetId?: string;
};

const initialUnits: Unit[] = [
  {
    id: "operations",
    name: "Operations",
    description: "",
    isArchived: false,
    assets: [
      {
        id: "north",
        name: "North facility",
        description: "",
        isArchived: false,
        projects: [
          {
            id: "maintenance",
            name: "Preventive maintenance",
            description: "",
            status: "Active",
            isArchived: false,
          },
          {
            id: "upgrade",
            name: "Equipment upgrade",
            description: "",
            status: "Active",
            isArchived: false,
          },
        ],
      },
      {
        id: "south",
        name: "South facility",
        description: "",
        isArchived: false,
        projects: [
          {
            id: "planning",
            name: "Capacity planning",
            description: "",
            status: "Completed",
            isArchived: false,
          },
        ],
      },
    ],
  },
  {
    id: "digital",
    name: "Digital",
    description: "",
    isArchived: false,
    assets: [
      {
        id: "platform",
        name: "Customer platform",
        description: "",
        isArchived: false,
        projects: [
          {
            id: "redesign",
            name: "Website redesign",
            description: "",
            status: "Active",
            isArchived: false,
          },
        ],
      },
    ],
  },
];
const initialGroups: Group[] = [
  {
    id: "delivery",
    name: "Delivery",
    description: "Project delivery team",
    isArchived: false,
  },
  {
    id: "operations",
    name: "Operations",
    description: "Operations team",
    isArchived: false,
  },
];
const initialPeople: Person[] = [
  {
    id: "alex",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "User",
    groupId: "delivery",
    isArchived: false,
    isDisabled: false,
    resetRequired: false,
  },
  {
    id: "maya",
    name: "Maya Singh",
    email: "maya@example.com",
    role: "Manager",
    groupId: "operations",
    isArchived: false,
    isDisabled: false,
    resetRequired: false,
  },
  {
    id: "jonas",
    name: "Jonas Lee",
    email: "jonas@example.com",
    role: "User",
    groupId: "delivery",
    isArchived: false,
    isDisabled: false,
    resetRequired: false,
  },
];
const initialEntries: Entry[] = [
  {
    id: "entry1",
    userId: "alex",
    projectId: "maintenance",
    date: "2026-10-28",
    hours: 7.5,
    description: "Maintenance review",
    status: "Open",
  },
  {
    id: "entry2",
    userId: "jonas",
    projectId: "redesign",
    date: "2026-10-29",
    hours: 8,
    description: "Design review",
    status: "Open",
  },
  {
    id: "entry3",
    userId: "alex",
    projectId: "maintenance",
    date: "2020-01-15",
    hours: 4,
    description: "Equipment inspection",
    status: "Open",
  },
  {
    id: "entry4",
    userId: "jonas",
    projectId: "redesign",
    date: "2020-01-16",
    hours: 5,
    description: "Project planning",
    status: "Open",
  },
];
const fieldClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";
const iconClass =
  "rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600";
const labelClass = "grid gap-1.5 text-xs font-semibold text-slate-600";

function IconAction({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={iconClass}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}

export default function ManagementWorkspace({
  role,
}: {
  role: ManagementRole;
}) {
  const canManage = role !== "User";
  const [tab, setTab] = useState<Tab>("Organization");
  const [units, setUnits] = useState(initialUnits);
  const [groups, setGroups] = useState(initialGroups);
  const [people, setPeople] = useState(initialPeople);
  const [entries, setEntries] = useState(initialEntries);
  const [lockedMonths, setLockedMonths] = useState<string[]>([]);
  const [month, setMonth] = useState("2026-10");
  const [selectedUserId, setSelectedUserId] = useState(
    initialPeople[0]?.id ?? "",
  );
  const [editor, setEditor] = useState<Editor | null>(null);
  const [notice, setNotice] = useState("");
  const projects = units.flatMap((unit) =>
    unit.assets.flatMap((asset) => asset.projects),
  );
  const selectedUser = people.find((person) => person.id === selectedUserId);
  const monthStart = /^\d{4}-(0[1-9]|1[0-2])$/.test(month)
    ? parseISO(`${month}-01`)
    : null;
  const monthlyEntries = monthStart
    ? entries.filter(
        (entry) =>
          entry.userId === selectedUserId && entry.date.startsWith(month),
      )
    : [];
  const days = monthStart
    ? eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) })
    : [];
  const selectedUnit = units.find((unit) => unit.id === editor?.unitId);
  const selectedAsset = selectedUnit?.assets.find(
    (asset) =>
      asset.id === (editor?.kind === "asset" ? editor.id : editor?.assetId),
  );
  const selectedProject = selectedAsset?.projects.find(
    (project) => project.id === editor?.id,
  );
  const selectedPerson = people.find((person) => person.id === editor?.id);
  const selectedGroup = groups.find((group) => group.id === editor?.id);
  const selectedEntry = entries.find((entry) => entry.id === editor?.id);
  const tabs: Tab[] = canManage
    ? ["Organization", "People", "Groups", "Time entries"]
    : ["Organization"];

  function updateUnit(unitId: string, update: (unit: Unit) => Unit) {
    setUnits((current) =>
      current.map((unit) => (unit.id === unitId ? update(unit) : unit)),
    );
  }

  function saveEditor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor) return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const id = editor.id ?? crypto.randomUUID();
    if (editor.kind === "unit") {
      if (editor.id)
        updateUnit(editor.id, (unit) => ({
          ...unit,
          name: value("name"),
          description: value("description"),
        }));
      else
        setUnits((current) => [
          ...current,
          {
            id,
            name: value("name"),
            description: value("description"),
            isArchived: false,
            assets: [],
          },
        ]);
    }
    if (editor.kind === "asset" && editor.unitId) {
      updateUnit(editor.unitId, (unit) => ({
        ...unit,
        assets: editor.id
          ? unit.assets.map((asset) =>
              asset.id === id
                ? {
                    ...asset,
                    name: value("name"),
                    description: value("description"),
                  }
                : asset,
            )
          : [
              ...unit.assets,
              {
                id,
                name: value("name"),
                description: value("description"),
                isArchived: false,
                projects: [],
              },
            ],
      }));
    }
    if (editor.kind === "project") {
      const [selectedUnitId, selectedAssetId] = value("assetId").split(":");
      const unitId = editor.unitId ?? selectedUnitId;
      const assetId = editor.assetId ?? selectedAssetId;
      updateUnit(unitId, (unit) => ({
        ...unit,
        assets: unit.assets.map((asset) =>
          asset.id === assetId
            ? {
                ...asset,
                projects: editor.id
                  ? asset.projects.map((project) =>
                      project.id === id
                        ? {
                            ...project,
                            name: value("name"),
                            description: value("description"),
                            status: value("status") as ProjectStatus,
                          }
                        : project,
                    )
                  : [
                      ...asset.projects,
                      {
                        id,
                        name: value("name"),
                        description: value("description"),
                        status: "Active",
                        isArchived: false,
                      },
                    ],
              }
            : asset,
        ),
      }));
    }
    if (editor.kind === "group") {
      if (editor.id)
        setGroups((current) =>
          current.map((group) =>
            group.id === id
              ? {
                  ...group,
                  name: value("name"),
                  description: value("description"),
                }
              : group,
          ),
        );
      else
        setGroups((current) => [
          ...current,
          {
            id,
            name: value("name"),
            description: value("description"),
            isArchived: false,
          },
        ]);
    }
    if (editor.kind === "person") {
      const personRole =
        role === "Admin"
          ? (value("role") as ManagementRole)
          : (selectedPerson?.role ?? "User");
      const person = {
        id,
        name: value("name"),
        email: value("email"),
        groupId: value("groupId"),
        role: personRole,
        isArchived: selectedPerson?.isArchived ?? false,
        isDisabled: selectedPerson?.isDisabled ?? false,
        resetRequired: selectedPerson?.resetRequired ?? false,
      };
      setPeople((current) =>
        editor.id
          ? current.map((item) => (item.id === id ? person : item))
          : [...current, person],
      );
    }
    if (
      editor.kind === "entry" &&
      selectedEntry &&
      !lockedMonths.includes(selectedEntry.date.slice(0, 7)) &&
      !lockedMonths.includes(value("date").slice(0, 7))
    ) {
      setEntries((current) =>
        current.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                date: value("date"),
                hours: Number(value("hours")),
                description: value("description"),
                projectId: value("projectId"),
              }
            : entry,
        ),
      );
    } else if (editor.kind === "entry") {
      setNotice(
        "Entries in a locked month cannot be edited or moved into a locked month.",
      );
      setEditor(null);
      return;
    }
    setNotice("Change applied to prototype data.");
    setEditor(null);
  }

  return (
    <>
      {tabs.length > 1 && (
        <nav
          aria-label="Management sections"
          className="flex gap-1 overflow-x-auto border-b border-slate-200"
        >
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              aria-current={tab === item ? "page" : undefined}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold ${tab === item ? "border-teal-700 text-teal-800" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              {item}
            </button>
          ))}
        </nav>
      )}
      <p role="status" className="text-xs text-teal-800">
        {notice}
      </p>
      {tab === "Organization" && (
        <section
          aria-labelledby="organization-heading"
          className="rounded-lg border border-slate-200 bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2
                id="organization-heading"
                className="text-base font-bold text-slate-900"
              >
                Organization
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Business units, assets and projects
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {canManage && (
                <Button
                  style="secondary"
                  onClick={() => setEditor({ kind: "unit" })}
                >
                  Add business unit
                </Button>
              )}
              <Button
                style="primary"
                onClick={() => setEditor({ kind: "project" })}
              >
                Add project
              </Button>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {units.map((unit) => (
              <div key={unit.id} className="px-5 py-3">
                <div className="flex items-start gap-2">
                  <details open className="group/unit min-w-0 flex-1">
                    <summary className="flex cursor-pointer list-none items-center gap-2 py-1 text-sm font-bold text-slate-900 marker:content-none">
                      <IoChevronDownOutline className="h-4 w-4 shrink-0 -rotate-90 text-slate-400 group-open/unit:rotate-0" />
                      <IoFolderOpenOutline className="h-4 w-4 shrink-0 text-teal-700" />
                      <span className="break-words">{unit.name}</span>
                      {unit.isArchived && <Badge>Archived</Badge>}
                      <span className="ml-auto text-xs font-normal whitespace-nowrap text-slate-500">
                        {unit.assets.length} assets
                      </span>
                    </summary>
                    <div className="mt-2 ml-2 border-l border-slate-200 pl-3 sm:ml-5 sm:pl-5">
                      {unit.assets.map((asset) => (
                        <div key={asset.id} className="flex items-start gap-2">
                          <details open className="group/asset min-w-0 flex-1">
                            <summary className="flex cursor-pointer list-none items-center gap-2 py-2 text-sm font-semibold text-slate-700 marker:content-none">
                              <IoChevronDownOutline className="h-3.5 w-3.5 shrink-0 -rotate-90 text-slate-400 group-open/asset:rotate-0" />
                              <span className="break-words">{asset.name}</span>
                              {asset.isArchived && <Badge>Archived</Badge>}
                              <span className="ml-auto text-xs font-normal whitespace-nowrap text-slate-500">
                                {asset.projects.length} projects
                              </span>
                            </summary>
                            <div className="pl-5">
                              {asset.projects.map((project) => (
                                <div
                                  key={project.id}
                                  className="flex min-h-10 items-center gap-2 border-t border-slate-50 text-sm text-slate-600"
                                >
                                  <span className="min-w-0 flex-1 break-words">
                                    {project.name}
                                  </span>
                                  <Badge>
                                    {project.isArchived
                                      ? "Archived"
                                      : project.status}
                                  </Badge>
                                  {canManage && (
                                    <>
                                      <IconAction
                                        label={`Edit ${project.name}`}
                                        onClick={() =>
                                          setEditor({
                                            kind: "project",
                                            id: project.id,
                                            unitId: unit.id,
                                            assetId: asset.id,
                                          })
                                        }
                                      >
                                        <IoPencilOutline />
                                      </IconAction>
                                      <IconAction
                                        label={`${project.isArchived ? "Restore" : "Archive"} ${project.name}`}
                                        onClick={() =>
                                          updateUnit(unit.id, (item) => ({
                                            ...item,
                                            assets: item.assets.map((child) =>
                                              child.id === asset.id
                                                ? {
                                                    ...child,
                                                    projects:
                                                      child.projects.map(
                                                        (entry) =>
                                                          entry.id ===
                                                          project.id
                                                            ? {
                                                                ...entry,
                                                                isArchived:
                                                                  !entry.isArchived,
                                                              }
                                                            : entry,
                                                      ),
                                                  }
                                                : child,
                                            ),
                                          }))
                                        }
                                      >
                                        <IoArchiveOutline />
                                      </IconAction>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </details>
                          {canManage && (
                            <div className="flex shrink-0">
                              <IconAction
                                label={`Edit ${asset.name}`}
                                onClick={() =>
                                  setEditor({
                                    kind: "asset",
                                    id: asset.id,
                                    unitId: unit.id,
                                  })
                                }
                              >
                                <IoPencilOutline />
                              </IconAction>
                              <IconAction
                                label={`${asset.isArchived ? "Restore" : "Archive"} ${asset.name}`}
                                onClick={() =>
                                  updateUnit(unit.id, (item) => ({
                                    ...item,
                                    assets: item.assets.map((child) =>
                                      child.id === asset.id
                                        ? {
                                            ...child,
                                            isArchived: !child.isArchived,
                                          }
                                        : child,
                                    ),
                                  }))
                                }
                              >
                                <IoArchiveOutline />
                              </IconAction>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                  {canManage && (
                    <div className="flex shrink-0">
                      <IconAction
                        label={`Edit ${unit.name} business unit`}
                        onClick={() =>
                          setEditor({
                            kind: "unit",
                            id: unit.id,
                            unitId: unit.id,
                          })
                        }
                      >
                        <IoPencilOutline />
                      </IconAction>
                      <IconAction
                        label={`${unit.isArchived ? "Restore" : "Archive"} ${unit.name} business unit`}
                        onClick={() =>
                          updateUnit(unit.id, (item) => ({
                            ...item,
                            isArchived: !item.isArchived,
                          }))
                        }
                      >
                        <IoArchiveOutline />
                      </IconAction>
                      <Button
                        style="secondary"
                        size="custom"
                        className="px-2 py-1.5"
                        onClick={() =>
                          setEditor({ kind: "asset", unitId: unit.id })
                        }
                      >
                        Add asset
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {canManage && tab === "People" && (
        <section
          className="rounded-lg border border-slate-200 bg-white"
          aria-labelledby="people-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 id="people-heading" className="text-base font-bold">
                People
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Accounts and group membership
              </p>
            </div>
            <Button
              style="primary"
              onClick={() => setEditor({ kind: "person" })}
            >
              Add user
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-5 py-3">User</th>
                  <th className="px-3 py-3">Group</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {people.map((person) => (
                  <tr key={person.id}>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-slate-800">
                        {person.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {person.email}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {groups.find((group) => group.id === person.groupId)
                        ?.name ?? "Unknown"}
                    </td>
                    <td className="px-3 py-3">
                      <Badge>{person.role}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {person.isArchived && <Badge>Archived</Badge>}
                        {person.isDisabled && <Badge>Disabled</Badge>}
                        {person.resetRequired && <Badge>Reset required</Badge>}
                        {!person.isArchived &&
                          !person.isDisabled &&
                          !person.resetRequired && <Badge>Active</Badge>}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      {(role === "Admin" || person.role === "User") && (
                        <>
                          <IconAction
                            label={`Edit ${person.name}`}
                            onClick={() =>
                              setEditor({ kind: "person", id: person.id })
                            }
                          >
                            <IoPencilOutline />
                          </IconAction>
                          <IconAction
                            label={`${person.isArchived ? "Restore" : "Archive"} ${person.name}`}
                            onClick={() =>
                              setPeople((current) =>
                                current.map((item) =>
                                  item.id === person.id
                                    ? { ...item, isArchived: !item.isArchived }
                                    : item,
                                ),
                              )
                            }
                          >
                            <IoArchiveOutline />
                          </IconAction>
                          <IconAction
                            label={`${person.isDisabled ? "Enable" : "Disable"} ${person.name}`}
                            onClick={() =>
                              setPeople((current) =>
                                current.map((item) =>
                                  item.id === person.id
                                    ? { ...item, isDisabled: !item.isDisabled }
                                    : item,
                                ),
                              )
                            }
                          >
                            <IoBanOutline />
                          </IconAction>
                          <IconAction
                            label={`Reset password for ${person.name}`}
                            onClick={() => {
                              setPeople((current) =>
                                current.map((item) =>
                                  item.id === person.id
                                    ? { ...item, resetRequired: true }
                                    : item,
                                ),
                              );
                              setNotice(
                                `Password reset simulated for ${person.name}; no password was generated or sent.`,
                              );
                            }}
                          >
                            <IoRefreshOutline />
                          </IconAction>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {canManage && tab === "Groups" && (
        <section
          className="rounded-lg border border-slate-200 bg-white"
          aria-labelledby="groups-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 id="groups-heading" className="text-base font-bold">
                User groups
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Organize people into teams
              </p>
            </div>
            <Button
              style="primary"
              onClick={() => setEditor({ kind: "group" })}
            >
              Add group
            </Button>
          </div>
          <div className="divide-y divide-slate-100">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                    {group.name}
                    {group.isArchived && <Badge>Archived</Badge>}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {group.description || "No description"} ·{" "}
                    {
                      people.filter((person) => person.groupId === group.id)
                        .length
                    }{" "}
                    members
                  </div>
                </div>
                <IconAction
                  label={`Edit ${group.name} group`}
                  onClick={() => setEditor({ kind: "group", id: group.id })}
                >
                  <IoPencilOutline />
                </IconAction>
                <IconAction
                  label={`${group.isArchived ? "Restore" : "Archive"} ${group.name} group`}
                  onClick={() =>
                    setGroups((current) =>
                      current.map((item) =>
                        item.id === group.id
                          ? { ...item, isArchived: !item.isArchived }
                          : item,
                      ),
                    )
                  }
                >
                  <IoArchiveOutline />
                </IconAction>
              </div>
            ))}
          </div>
        </section>
      )}
      {canManage && tab === "Time entries" && (
        <section
          className="rounded-lg border border-slate-200 bg-white"
          aria-labelledby="entries-heading"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 id="entries-heading" className="text-base font-bold">
                Time entries
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review the selected month. Monthly locks apply to all users.
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <label className={labelClass}>
                User
                <select
                  value={selectedUserId}
                  onChange={(event) => setSelectedUserId(event.target.value)}
                  className={fieldClass}
                >
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                      {person.isArchived ? " (archived)" : ""}
                      {person.isDisabled ? " (disabled)" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Month
                <input
                  type="month"
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <Button
                style="secondary"
                onClick={() => {
                  const current = new Date();
                  const currentMonth = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
                  if (!month || month >= currentMonth) {
                    setNotice("Only completed months can be locked.");
                    return;
                  }
                  setLockedMonths((months) =>
                    months.includes(month)
                      ? months.filter((item) => item !== month)
                      : [...months, month],
                  );
                  setNotice(
                    `${month} ${lockedMonths.includes(month) ? "unlocked" : "locked"} for all users in this prototype.`,
                  );
                }}
              >
                {lockedMonths.includes(month) ? "Unlock month" : "Lock month"}
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-3 py-3">Project</th>
                  <th className="px-3 py-3">Hours</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.flatMap((day) => {
                  const date = format(day, "yyyy-MM-dd");
                  const dayEntries = monthlyEntries.filter(
                    (entry) => entry.date === date,
                  );
                  if (dayEntries.length === 0) {
                    return (
                      <tr key={date}>
                        <td className="px-5 py-3">{date}</td>
                        <td className="px-3 py-3 text-slate-400" colSpan={4}>
                          No entries
                        </td>
                      </tr>
                    );
                  }
                  return dayEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-5 py-3">{entry.date}</td>
                      <td className="px-3 py-3">
                        <div>
                          {
                            projects.find(
                              (project) => project.id === entry.projectId,
                            )?.name
                          }
                        </div>
                        <div className="text-xs text-slate-500">
                          {entry.description}
                        </div>
                      </td>
                      <td className="px-3 py-3">{entry.hours}h</td>
                      <td className="px-3 py-3">
                        <Badge>
                          {lockedMonths.includes(month)
                            ? "Month locked"
                            : entry.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-3">
                        {!lockedMonths.includes(month) &&
                          entry.status !== "Frozen" && (
                            <IconAction
                              label={`Edit entry for ${selectedUser?.name} on ${entry.date}`}
                              onClick={() =>
                                setEditor({ kind: "entry", id: entry.id })
                              }
                            >
                              <IoPencilOutline />
                            </IconAction>
                          )}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
            {monthlyEntries.length === 0 && (
              <p className="px-5 py-8 text-sm text-slate-500">
                {!selectedUser
                  ? "Select a user to view entries."
                  : !monthStart
                    ? "Select a month to view entries."
                    : `No entries for ${selectedUser.name} in this month.`}
              </p>
            )}
          </div>
        </section>
      )}
      <ModalOverlay
        isOpen={editor !== null}
        onOpenChange={(open) => {
          if (!open) setEditor(null);
        }}
        isDismissable
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-sm"
      >
        <Modal className="w-full max-w-md outline-none">
          <Dialog
            aria-label={
              editor ? `${editor.id ? "Edit" : "Add"} ${editor.kind}` : "Edit"
            }
            className="max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl outline-none"
          >
            {editor && (
              <form onSubmit={saveEditor} className="grid gap-4">
                <div>
                  <p className="text-xs font-semibold text-teal-700 uppercase">
                    {editor.kind === "entry" ? "Time entry" : "Management"}
                  </p>
                  <h2 className="mt-1 text-xl font-bold capitalize">
                    {editor.id ? "Edit" : "Add"}{" "}
                    {editor.kind === "unit"
                      ? "business unit"
                      : editor.kind === "person"
                        ? "user"
                        : editor.kind}
                  </h2>
                </div>
                {editor.kind === "project" && !editor.id && (
                  <label className={labelClass}>
                    Asset
                    <select
                      name="assetId"
                      required
                      className={fieldClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select an asset
                      </option>
                      {units
                        .filter((unit) => !unit.isArchived)
                        .flatMap((unit) =>
                          unit.assets
                            .filter((asset) => !asset.isArchived)
                            .map((asset) => (
                              <option
                                key={asset.id}
                                value={`${unit.id}:${asset.id}`}
                              >
                                {unit.name} / {asset.name}
                              </option>
                            )),
                        )}
                    </select>
                  </label>
                )}
                {editor.kind !== "entry" && (
                  <label className={labelClass}>
                    Name
                    <input
                      name="name"
                      required
                      defaultValue={
                        selectedProject?.name ??
                        (editor.kind === "asset"
                          ? selectedAsset?.name
                          : undefined) ??
                        (editor.kind === "unit"
                          ? selectedUnit?.name
                          : undefined) ??
                        selectedPerson?.name ??
                        selectedGroup?.name ??
                        ""
                      }
                      className={fieldClass}
                    />
                  </label>
                )}
                {editor.kind === "person" && (
                  <>
                    <label className={labelClass}>
                      Email
                      <input
                        name="email"
                        type="email"
                        required
                        defaultValue={selectedPerson?.email ?? ""}
                        className={fieldClass}
                      />
                    </label>
                    <label className={labelClass}>
                      Group
                      <select
                        name="groupId"
                        required
                        defaultValue={selectedPerson?.groupId ?? ""}
                        className={fieldClass}
                      >
                        <option value="" disabled>
                          Select a group
                        </option>
                        {groups
                          .filter(
                            (group) =>
                              !group.isArchived ||
                              group.id === selectedPerson?.groupId,
                          )
                          .map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                              {group.isArchived ? " (archived)" : ""}
                            </option>
                          ))}
                      </select>
                    </label>
                    {role === "Admin" && (
                      <label className={labelClass}>
                        Role
                        <select
                          name="role"
                          defaultValue={selectedPerson?.role ?? "User"}
                          className={fieldClass}
                        >
                          <option>User</option>
                          <option>Manager</option>
                          <option>Admin</option>
                        </select>
                      </label>
                    )}
                  </>
                )}
                {editor.kind !== "person" && editor.kind !== "entry" && (
                  <label className={labelClass}>
                    Description
                    <input
                      name="description"
                      defaultValue={
                        selectedProject?.description ??
                        (editor.kind === "asset"
                          ? selectedAsset?.description
                          : undefined) ??
                        (editor.kind === "unit"
                          ? selectedUnit?.description
                          : undefined) ??
                        selectedGroup?.description ??
                        ""
                      }
                      className={fieldClass}
                    />
                  </label>
                )}
                {editor.kind === "project" && editor.id && (
                  <label className={labelClass}>
                    Status
                    <select
                      name="status"
                      defaultValue={selectedProject?.status}
                      className={fieldClass}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Completed</option>
                      <option>Archived</option>
                    </select>
                  </label>
                )}
                {editor.kind === "entry" && selectedEntry && (
                  <>
                    <label className={labelClass}>
                      Date
                      <input
                        name="date"
                        type="date"
                        required
                        defaultValue={selectedEntry.date}
                        className={fieldClass}
                      />
                    </label>
                    <label className={labelClass}>
                      Project
                      <select
                        name="projectId"
                        defaultValue={selectedEntry.projectId}
                        className={fieldClass}
                      >
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className={labelClass}>
                      Hours
                      <input
                        name="hours"
                        type="number"
                        min="0.01"
                        max="24"
                        step="0.01"
                        required
                        defaultValue={selectedEntry.hours}
                        className={fieldClass}
                      />
                    </label>
                    <label className={labelClass}>
                      Description
                      <input
                        name="description"
                        defaultValue={selectedEntry.description}
                        className={fieldClass}
                      />
                    </label>
                  </>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button style="secondary" onClick={() => setEditor(null)}>
                    Cancel
                  </Button>
                  <button
                    type="submit"
                    className="rounded-md bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
