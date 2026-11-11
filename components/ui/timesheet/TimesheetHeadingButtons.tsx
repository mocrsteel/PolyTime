import Button from "@/components/ui/Button";

export default function TimesheetHeadingButtons({
  onAddEntry,
}: {
  onAddEntry?: () => void;
}) {
  return (
    <>
      <Button style="secondary" icon="copy" onClick={() => {}}>
        Copy day
      </Button>
      <Button style="secondary" icon="copy" onClick={() => {}}>
        Copy week
      </Button>
      <Button style="primary" icon="plus" onClick={onAddEntry}>
        Add entry
      </Button>
    </>
  );
}
