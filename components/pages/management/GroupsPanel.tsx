/**
 * Shows prototype groups and their current membership counts.
 * ManagementWorkspace owns edits and archive toggles supplied as callbacks.
 */
import { IoArchiveOutline, IoPencilOutline } from "react-icons/io5";
import Button from "@/components/ui/Button";
import { Badge, IconAction } from "./presentation";
import type { Group, Person } from "./model";

export default function GroupsPanel({
  groups,
  people,
  onAdd,
  onEdit,
  onToggleArchived,
}: {
  groups: Group[];
  people: Person[];
  onAdd: () => void;
  onEdit: (group: Group) => void;
  onToggleArchived: (group: Group) => void;
}) {
  return (
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
        <Button style="primary" onClick={onAdd}>
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
                {people.filter((person) => person.groupId === group.id).length}{" "}
                members
              </div>
            </div>
            <IconAction
              label={`Edit ${group.name} group`}
              onClick={() => onEdit(group)}
            >
              <IoPencilOutline />
            </IconAction>
            <IconAction
              label={`${group.isArchived ? "Restore" : "Archive"} ${group.name} group`}
              onClick={() => onToggleArchived(group)}
            >
              <IoArchiveOutline />
            </IconAction>
          </div>
        ))}
      </div>
    </section>
  );
}