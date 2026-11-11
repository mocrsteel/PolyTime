"use client";

import Heading from "@/components/ui/Heading";
import type { TimeLogSubmitHandler } from "@/components/forms/TimeLog";
import WeekSelect from "@/components/ui/timesheet/WeekSelect";
import Meter from "@/components/ui/timesheet/Meter";
import Card from "@/components/ui/Card";
import WeekTabs from "@/components/ui/timesheet/WeekTabs";
import TimesheetHeadingButtons from "@/components/ui/timesheet/TimesheetHeadingButtons";
import TimeLog from "@/components/forms/TimeLog";
import { useState } from "react";
import {
  Button as AriaButton,
  Dialog,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

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

export default function Timesheets({
  onTimeLogSubmit,
}: {
  onTimeLogSubmit?: TimeLogSubmitHandler;
}) {
  const router = useRouter();
  const [isTimeLogOpen, setIsTimeLogOpen] = useState(false);

  const handleTimeLogSubmit: TimeLogSubmitHandler = async (values) => {
    await onTimeLogSubmit?.(values);
    router.refresh();
    setIsTimeLogOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading
        buttons={
          <TimesheetHeadingButtons onAddEntry={() => setIsTimeLogOpen(true)} />
        }
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
      />
      <WeekSelect date={new Date()} />
      <WeekMeter weekMaximum={40} value={30} label="This week's progress" />
      <WeekTabs
        date={new Date()}
        data={[]}
        onAddEntry={() => setIsTimeLogOpen(true)}
      />
      <ModalOverlay
        isOpen={isTimeLogOpen}
        onOpenChange={setIsTimeLogOpen}
        isDismissable
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 p-4 backdrop-blur-sm"
      >
        <Modal className="w-full max-w-xl outline-none">
          <Dialog aria-label="Add time entry" className="outline-none">
            <div className="max-h-[90vh] overflow-y-auto">
              <Card variant="modal">
                <div className="-mb-5 flex justify-end">
                  <AriaButton
                    aria-label="Close dialog"
                    onPress={() => setIsTimeLogOpen(false)}
                    className="text-polytime-muted focus-visible:outline-polytime-teal cursor-pointer rounded p-1 outline-none hover:bg-slate-100 focus-visible:outline-2"
                  >
                    <IoCloseOutline aria-hidden />
                  </AriaButton>
                </div>
                <TimeLog onSubmit={handleTimeLogSubmit} />
              </Card>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </div>
  );
}
