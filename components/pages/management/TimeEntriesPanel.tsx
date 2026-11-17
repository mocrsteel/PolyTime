/**
 * Renders month/user-filtered entries and the shared month-lock control.
 * Date filtering and lock validation stay in ManagementWorkspace; this panel
 * reports the user's selections and entry-edit requests through callbacks.
 */
import { format } from "date-fns";
import { Input, Label, TextField } from "react-aria-components";
import { IoPencilOutline } from "react-icons/io5";
import Button from "@/components/ui/Button";
import { Badge, IconAction, ManagementSelect } from "./presentation";
import { fieldClass, labelClass } from "./model";
import type { Entry, Person, Project } from "./model";

export default function TimeEntriesPanel({
  people,
  projects,
  selectedUser,
  selectedUserId,
  onSelectUser,
  month,
  onMonthChange,
  monthStart,
  days,
  monthlyEntries,
  lockedMonths,
  onToggleMonthLock,
  onEditEntry,
}: {
  people: Person[];
  projects: Project[];
  selectedUser?: Person;
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
  month: string;
  onMonthChange: (month: string) => void;
  monthStart: Date | null;
  days: Date[];
  monthlyEntries: Entry[];
  lockedMonths: string[];
  onToggleMonthLock: () => void;
  onEditEntry: (entry: Entry) => void;
}) {
  return (
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
          <ManagementSelect
            label="User"
            selectedKey={selectedUserId}
            onSelectionChange={(key) =>
              key != null && onSelectUser(String(key))
            }
            options={people.map((person) => ({
              value: person.id,
              label: `${person.name}${person.isArchived ? " (archived)" : ""}${person.isDisabled ? " (disabled)" : ""}`,
            }))}
          />
          <TextField className={labelClass}>
            <Label>Month</Label>
            <Input
              type="month"
              value={month}
              onChange={(event) => onMonthChange(event.target.value)}
              className={fieldClass}
            />
          </TextField>
          <Button style="secondary" onClick={onToggleMonthLock}>
            {lockedMonths.includes(month) ? "Unlock month" : "Lock month"}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-left text-sm">
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
                      {projects.find((project) => project.id === entry.projectId)
                        ?.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {entry.description}
                    </div>
                  </td>
                  <td className="px-3 py-3">{entry.hours}h</td>
                  <td className="px-3 py-3">
                    <Badge>
                      {lockedMonths.includes(month) ? "Month locked" : entry.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    {!lockedMonths.includes(month) &&
                      entry.status !== "Frozen" && (
                        <IconAction
                          label={`Edit entry for ${selectedUser?.name} on ${entry.date}`}
                          onClick={() => onEditEntry(entry)}
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
  );
}