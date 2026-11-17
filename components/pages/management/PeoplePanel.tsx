/**
 * Displays prototype accounts and their group, role, and status.
 * The coordinator passes only the actions allowed for the current manager role.
 */
import {
  IoArchiveOutline,
  IoBanOutline,
  IoPencilOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import Button from "@/components/ui/Button";
import { Badge, IconAction } from "./presentation";
import type { Group, ManagementRole, Person } from "./model";

export default function PeoplePanel({
  people,
  groups,
  role,
  onAdd,
  onEdit,
  onToggleArchived,
  onToggleDisabled,
  onResetPassword,
}: {
  people: Person[];
  groups: Group[];
  role: ManagementRole;
  onAdd: () => void;
  onEdit: (person: Person) => void;
  onToggleArchived: (person: Person) => void;
  onToggleDisabled: (person: Person) => void;
  onResetPassword: (person: Person) => void;
}) {
  return (
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
        <Button style="primary" onClick={onAdd}>
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
                  <div className="text-xs text-slate-500">{person.email}</div>
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {groups.find((group) => group.id === person.groupId)?.name ??
                    "Unknown"}
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
                        onClick={() => onEdit(person)}
                      >
                        <IoPencilOutline />
                      </IconAction>
                      <IconAction
                        label={`${person.isArchived ? "Restore" : "Archive"} ${person.name}`}
                        onClick={() => onToggleArchived(person)}
                      >
                        <IoArchiveOutline />
                      </IconAction>
                      <IconAction
                        label={`${person.isDisabled ? "Enable" : "Disable"} ${person.name}`}
                        onClick={() => onToggleDisabled(person)}
                      >
                        <IoBanOutline />
                      </IconAction>
                      <IconAction
                        label={`Reset password for ${person.name}`}
                        onClick={() => onResetPassword(person)}
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
  );
}