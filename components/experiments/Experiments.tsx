import { startOfWeek, addWeeks, addDays, format } from "date-fns";

export default function Experiments() {
  const today = new Date();
  const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
  const nextWeekDate = addWeeks(today, 1);
  const previousWeek = addWeeks(today, -1);

  const weekDays = [
    ...Array.from({ length: 7 }, (_, i) => addDays(startOfWeekDate, i)),
  ];

  return (
    <div>
      <div>Today: {format(today, "dd/MMM/y")}</div>
      <div>Start of Week: {format(startOfWeekDate, "dd/MMM/y --> I")}</div>
      <div>Week number and quarter: {format(today, "I --> QQQ")}</div>
      <div>Next Week: {format(nextWeekDate, "dd/MMM/y --> I")}</div>
      <div>Previous Week: {format(previousWeek, "dd/MMM/y --> I")}</div>
      {weekDays.map((day) => (
        <div key={day.getTime()}>{format(day, "EEEEEE dd/MMM/y -> I")}</div>
      ))}
    </div>
  );
}
