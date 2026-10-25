"use client";

import { format, getQuarter } from "date-fns";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, TabPanels, Tabs } from "react-aria-components/Tabs";

import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import PeriodTabSelector, {
  PeriodTabKeys,
} from "@/components/ui/PeriodTabSelector";
import PeriodPicker, { type DateRange } from "@/components/ui/PeriodPicker";
import ReportCard from "@/components/ui/reports/ReportCard";
import { initializeDateRangeSelection } from "@/lib/reports/period";
import type { ReportData } from "@/lib/reports/types";

const TAB_KEYS: PeriodTabKeys[] = ["month", "quarter", "year"];

function isTabKey(key: Key): key is PeriodTabKeys {
  return TAB_KEYS.includes(key as PeriodTabKeys);
}

function formatHours(hours: number): string {
  return `${Math.round(hours)}h`;
}

function formatPeriodBadge(
  tab: PeriodTabKeys,
  selectedDateRange: DateRange,
): string {
  switch (tab) {
    case "month":
      return format(selectedDateRange.start, "MMM yyyy");
    case "quarter":
      return `Q${getQuarter(selectedDateRange.start)} ${format(selectedDateRange.start, "yyyy")}`;
    default:
      return format(selectedDateRange.start, "yyyy");
  }
}

function formatPeriodSubtitle(selectedDateRange: DateRange): string {
  return `${format(selectedDateRange.start, "MMM d, yyyy")} - ${format(selectedDateRange.end, "MMM d, yyyy")}`;
}

function formatCommentDate(date: Date): string {
  return format(date, "d MMM");
}

type ReportPageProps = {
  data: ReportData;
  initialTab: PeriodTabKeys;
  initialSelectedDateRange: DateRange;
  availableDateRange: [Date, Date];
  expectedBusinessHours: number;
};

export default function ReportPage({
  data,
  initialTab,
  initialSelectedDateRange,
  availableDateRange,
  expectedBusinessHours,
}: ReportPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<PeriodTabKeys>(initialTab);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(
    initialSelectedDateRange,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const nextStart = selectedDateRange.start.toISOString();
    const nextEnd = selectedDateRange.end.toISOString();

    const hasChanged =
      params.get("granularity") !== tab ||
      params.get("startDate") !== nextStart ||
      params.get("endDate") !== nextEnd;

    if (!hasChanged) {
      return;
    }

    params.set("granularity", tab);
    params.set("startDate", nextStart);
    params.set("endDate", nextEnd);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, selectedDateRange, tab]);

  const handleTabChange = (nextTab: PeriodTabKeys) => {
    setTab(nextTab);
    setSelectedDateRange((prev) =>
      initializeDateRangeSelection(prev.end, nextTab),
    );
  };

  const topUser = data.users.toSorted((a, b) => b.hours - a.hours)[0];
  const completionPercent = Math.round(data.completion.completion * 1000) / 10;
  const periodBadge = formatPeriodBadge(tab, selectedDateRange);
  const periodSubtitle = formatPeriodSubtitle(selectedDateRange);
  const groupedComments = data.comments;

  return (
    <div>
      <Heading
        title="Reports"
        eyebrow="Insights"
        subtitle="Understand where your time goes."
        buttons={
          <Button style="primary" onClick={() => {}}>
            Export report
          </Button>
        }
      />
      <div className="grid grid-cols-[1fr_auto] items-center gap-y-4">
        <Tabs
          selectedKey={tab}
          onSelectionChange={(key: Key) => {
            if (isTabKey(key)) {
              handleTabChange(key);
            }
          }}
          className="contents"
        >
          <div aria-label="period buttons" className="order-1">
            <PeriodTabSelector />
          </div>
          <TabPanels className="order-3 col-span-2">
            <div aria-label="summary cards" className="grid grid-cols-3 gap-4">
              <ReportCard
                eyebrow="Total hours"
                title={formatHours(data.completion.actual)}
                subtitle={periodSubtitle}
                icon="barChart"
                iconTheme="green"
              />
              <ReportCard
                eyebrow="Top contributor"
                title={topUser?.name ?? "No entries"}
                subtitle={
                  topUser
                    ? `${formatHours(topUser.hours)} logged`
                    : "No data in selected period"
                }
                icon="users2"
                iconTheme="red"
              />
              <ReportCard
                eyebrow="Completeness"
                title={`${completionPercent}%`}
                subtitle={`${formatHours(data.completion.actual)} of ${formatHours(data.completion.expected)}`}
                icon="users2"
                iconTheme="purple"
              />
              <div className="col-span-full">
                <div className="grid gap-4 lg:grid-cols-2">
                  <ReportCard
                    eyebrow="Allocation"
                    title="Hours by business unit"
                    subtitle="Allocation across the selected period."
                    badge={periodBadge}
                    allocationItems={data.businessUnits.map((item) => ({
                      label: item.name,
                      value: item.hours,
                      valueLabel: formatHours(item.hours),
                    }))}
                  />
                  <ReportCard
                    eyebrow="Manpower"
                    title="Summary per employee"
                    subtitle={`Expected total: ${formatHours(expectedBusinessHours)}`}
                    badge={periodBadge}
                    allocationItems={data.users.map((item) => ({
                      label: item.name,
                      value: item.hours,
                      valueLabel: formatHours(item.hours),
                    }))}
                    allocationMaxValue={expectedBusinessHours}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-app-primary text-xs font-bold tracking-widest uppercase">
                        Daily detail
                      </p>
                      <h2 className="text-polytime-ink mt-2 text-2xl font-bold tracking-tight">
                        Work comments by project
                      </h2>
                      <p className="text-polytime-muted mt-1 text-sm">
                        Context from daily time logs, including who added each
                        comment.
                      </p>
                    </div>
                    <span className="border-app-border text-app-text rounded-xl border px-4 py-2 text-sm font-medium">
                      {periodBadge}
                    </span>
                  </div>
                  {groupedComments.length === 0 ? (
                    <p className="text-polytime-muted text-sm">
                      No comments for the selected period.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {groupedComments.map((project) => (
                        <section
                          key={project.project}
                          className="border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-polytime-ink text-lg font-semibold">
                                {project.project}
                              </h3>
                              <p className="text-polytime-muted text-sm">
                                {project.asset}
                              </p>
                            </div>
                            <span className="text-polytime-muted rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                              {project.comments.length} comment
                              {project.comments.length === 1 ? "" : "s"}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {project.comments.map((entry, idx) => (
                              <div
                                key={`${project.project}-${entry.date.toISOString()}-${entry.user}-${idx}`}
                                className="grid grid-cols-[84px_1fr_auto] items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2"
                              >
                                <span className="text-sm font-semibold text-slate-500">
                                  {formatCommentDate(entry.date)}
                                </span>
                                <span className="text-app-text text-sm">
                                  {entry.comment}
                                </span>
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                  {entry.user}
                                </span>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanels>
        </Tabs>
        <div className="order-2">
          <PeriodPicker
            granularity={tab}
            dateRange={availableDateRange}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
          />
        </div>
      </div>
    </div>
  );
}
