"use client";

import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import WeekSelect from "@/components/ui/timesheet/WeekSelect";
import Meter from "@/components/ui/timesheet/Meter";
import Card from "@/components/ui/Card";
import WeekTabs from "@/components/ui/timesheet/WeekTabs";

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
  const buttons = (
    <>
      <Button style="secondary" icon="copy" onClick={() => {}}>
        Copy day
      </Button>
      <Button style="secondary" icon="copy" onClick={() => {}}>
        Copy week
      </Button>
      <Button style="primary" icon="plus" onClick={() => {}}>
        Add entry
      </Button>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <Heading
        buttons={buttons}
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
