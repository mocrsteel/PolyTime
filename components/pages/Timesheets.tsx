import Heading from "@/components/ui/Heading";
import WeekSelect from "@/components/ui/timesheet/WeekSelect";
import Meter from "@/components/ui/timesheet/Meter";
import Card from "@/components/ui/Card";
import WeekTabs from "@/components/ui/timesheet/WeekTabs";
import TimesheetHeadingButtons from "@/components/ui/timesheet/TimesheetHeadingButtons";

const title = "Timesheets";
const subtitle = "Here's how your week is shaping up";
const eyebrow = "Time tracking";

function WeekMeter({
  weekMaximum,
  value,
  label,
}: {
  weekMaximum: number;
  value: number;
  label: string;
}) {
  return (
    <Card variant={"modal"}>
      <Meter
        formatOptions={{ style: "unit", unit: "hour" }}
        weekMaximum={weekMaximum}
        value={value}
        label={label}
      />
    </Card>
  );
}

export default function Timesheets() {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        buttons={<TimesheetHeadingButtons />}
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
      />
      <WeekSelect date={new Date()} />
      <WeekMeter weekMaximum={40} value={30} label="This week's progress" />
      <WeekTabs date={new Date()} data={[]} />
    </div>
  );
}
