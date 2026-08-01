import DayEntry, { type TimesheetEntry } from "./DayEntry";

type DayListProps = {
  entries: TimesheetEntry[];
};

export default function DayList({ entries }: DayListProps) {
  return (
    <div className="flex flex-col bg-white">
      {entries.map((entry, index) => (
        <DayEntry
          key={`day-entry-${entry.id}`}
          {...entry}
          className="px-8 py-4"
        />
      ))}
    </div>
  );
}
