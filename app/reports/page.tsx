import Heading from "@/components/ui/Heading";
import ReportsHeadingButtons from "@/components/ui/reports/ReportsHeadingButtons";

const title = "Reports";
const subtitle = "Understand where time is spent";
const eyebrow = "Insights";

export default function Reports() {
  return (
    <div>
      <Heading
        buttons={<ReportsHeadingButtons />}
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
      />
    </div>
  );
}
