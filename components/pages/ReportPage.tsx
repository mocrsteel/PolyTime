import ReportCard from "@/components/ui/reports/ReportCard";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import PeriodTabSelector from "@/components/ui/PeriodTabSelector";
import { Tabs } from "react-aria-components/Tabs";

export type ReportPageProps = {};

export default function ReportPage(props: ReportPageProps) {
  return (
    <div>
      <Heading
        title="Reports"
        eyebrow="Insights"
        subtitle="Understand where your time is goes."
        buttons={
          <Button style="primary" onClick={() => {}}>
            Export report
          </Button>
        }
      />
      <Tabs>
        <PeriodTabSelector />
      </Tabs>
    </div>
  );
}
