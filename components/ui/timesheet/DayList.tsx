import DayEntry, {type TimesheetEntry} from "./DayEntry";


type DayListProps = {
  entries: TimesheetEntry[]
}

export default function DayList({entries}: DayListProps) {
  return (
    <div className="flex flex-col bg-white">
      {entries.map((entry, index) => (
        <DayEntry key={index} {...entry} className="py-4 px-8"/>
      ))}
    </div>
  )
}
