import Button from "@/components/ui/Button";

export default function TimesheetHeadingButtons() {
  return (
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
}
