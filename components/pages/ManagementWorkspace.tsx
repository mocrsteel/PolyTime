"use client";

import { useState } from "react";
import { eachDayOfInterval, endOfMonth, parseISO } from "date-fns";
import { Button as AriaButton } from "react-aria-components";
import {
  type ManagementEditorState,
  type ManagementRole,
  type ManagementTab,
  type ProjectStatus,
  type Unit,
} from "./management/model";
import {
  initialEntries,
  initialGroups,
  initialPeople,
  initialUnits,
} from "./management/demo-data";
import OrganizationPanel from "./management/OrganizationPanel";
import PeoplePanel from "./management/PeoplePanel";
import GroupsPanel from "./management/GroupsPanel";
import TimeEntriesPanel from "./management/TimeEntriesPanel";
import ManagementEditor from "./management/ManagementEditor";

/**
 * Owns prototype data, role-gated navigation, mutations, derived selections,
 * and notices; management subcomponents render the supplied state and actions.
 */
export default function ManagementWorkspace({
  role,
}: {
  role: ManagementRole;
}) {
  const canManage = role !== "User";
  const [tab, setTab] = useState<ManagementTab>("Organization");
  const [units, setUnits] = useState(initialUnits);
  const [groups, setGroups] = useState(initialGroups);
  const [people, setPeople] = useState(initialPeople);
  const [entries, setEntries] = useState(initialEntries);
  const [lockedMonths, setLockedMonths] = useState<string[]>([]);
  const [month, setMonth] = useState("2026-10");
  const [selectedUserId, setSelectedUserId] = useState(
    initialPeople[0]?.id ?? "",
  );
  const [editor, setEditor] = useState<ManagementEditorState | null>(null);
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
  const tabs: ManagementTab[] = canManage
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
            <AriaButton
              key={item}
              type="button"
              onPress={() => setTab(item)}
              aria-current={tab === item ? "page" : undefined}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold ${tab === item ? "border-teal-700 text-teal-800" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              {item}
            </AriaButton>
          ))}
        </nav>
      )}
      <p role="status" className="text-xs text-teal-800">
        {notice}
      </p>
      {tab === "Organization" && (
        <OrganizationPanel
          units={units}
          canManage={canManage}
          onAddUnit={() => setEditor({ kind: "unit" })}
          onAddProject={() => setEditor({ kind: "project" })}
          onAddAsset={(unitId) => setEditor({ kind: "asset", unitId })}
          onEditUnit={(unit) =>
            setEditor({ kind: "unit", id: unit.id, unitId: unit.id })
          }
          onEditAsset={(unit, asset) =>
            setEditor({ kind: "asset", id: asset.id, unitId: unit.id })
          }
          onEditProject={(unit, asset, project) =>
            setEditor({
              kind: "project",
              id: project.id,
              unitId: unit.id,
              assetId: asset.id,
            })
          }
          onToggleUnitArchived={(unitId) =>
            updateUnit(unitId, (unit) => ({
              ...unit,
              isArchived: !unit.isArchived,
            }))
          }
          onToggleAssetArchived={(unitId, assetId) =>
            updateUnit(unitId, (unit) => ({
              ...unit,
              assets: unit.assets.map((asset) =>
                asset.id === assetId
                  ? { ...asset, isArchived: !asset.isArchived }
                  : asset,
              ),
            }))
          }
          onToggleProjectArchived={(unitId, assetId, projectId) =>
            updateUnit(unitId, (unit) => ({
              ...unit,
              assets: unit.assets.map((asset) =>
                asset.id === assetId
                  ? {
                      ...asset,
                      projects: asset.projects.map((project) =>
                        project.id === projectId
                          ? { ...project, isArchived: !project.isArchived }
                          : project,
                      ),
                    }
                  : asset,
              ),
            }))
          }
        />
      )}
      {canManage && tab === "People" && (
        <PeoplePanel
          people={people}
          groups={groups}
          role={role}
          onAdd={() => setEditor({ kind: "person" })}
          onEdit={(person) => setEditor({ kind: "person", id: person.id })}
          onToggleArchived={(person) =>
            setPeople((current) =>
              current.map((item) =>
                item.id === person.id
                  ? { ...item, isArchived: !item.isArchived }
                  : item,
              ),
            )
          }
          onToggleDisabled={(person) =>
            setPeople((current) =>
              current.map((item) =>
                item.id === person.id
                  ? { ...item, isDisabled: !item.isDisabled }
                  : item,
              ),
            )
          }
          onResetPassword={(person) => {
            setPeople((current) =>
              current.map((item) =>
                item.id === person.id ? { ...item, resetRequired: true } : item,
              ),
            );
            setNotice(
              `Password reset simulated for ${person.name}; no password was generated or sent.`,
            );
          }}
        />
      )}
      {canManage && tab === "Groups" && (
        <GroupsPanel
          groups={groups}
          people={people}
          onAdd={() => setEditor({ kind: "group" })}
          onEdit={(group) => setEditor({ kind: "group", id: group.id })}
          onToggleArchived={(group) =>
            setGroups((current) =>
              current.map((item) =>
                item.id === group.id
                  ? { ...item, isArchived: !item.isArchived }
                  : item,
              ),
            )
          }
        />
      )}
      {canManage && tab === "Time entries" && (
        <TimeEntriesPanel
          people={people}
          projects={projects}
          selectedUser={selectedUser}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
          month={month}
          onMonthChange={setMonth}
          monthStart={monthStart}
          days={days}
          monthlyEntries={monthlyEntries}
          lockedMonths={lockedMonths}
          onToggleMonthLock={() => {
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
          onEditEntry={(entry) => setEditor({ kind: "entry", id: entry.id })}
        />
      )}
      <ManagementEditor
        editor={editor}
        role={role}
        units={units}
        groups={groups}
        projects={projects}
        selectedUnit={selectedUnit}
        selectedAsset={selectedAsset}
        selectedProject={selectedProject}
        selectedPerson={selectedPerson}
        selectedGroup={selectedGroup}
        selectedEntry={selectedEntry}
        onSave={saveEditor}
        onDismiss={() => setEditor(null)}
      />
    </>
  );
}
