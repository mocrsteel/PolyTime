import Card from "@/components/ui/Card";
import type { AppIcons } from "@/components/Icons";
import { iconMap } from "@/components/Icons";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export type ReportCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: AppIcons;
  iconTheme: "green" | "red" | "blue" | "yellow" | "purple" | "gray";
};

const ReportCardVariants = tv({
  base: "flex min-h-32 flex-row justify-between gap-4 p-5",
});

const iconVariants = tv({
  base: "flex h-10 w-10 items-center justify-center rounded-xl",
  variants: {
    theme: {
      green: "bg-teal-50 text-teal-700",
      red: "bg-red-50 text-red-700",
      blue: "bg-sky-50 text-sky-700",
      yellow: "bg-amber-50 text-amber-700",
      purple: "bg-indigo-50 text-indigo-700",
      gray: "bg-zinc-50 text-zinc-700",
    },
  },
});

export default function ReportCard(props: ReportCardProps) {
  return (
    <Card variant="custom" className={ReportCardVariants()}>
      <div id={`${props.eyebrow.toLowerCase().replace(/\s+/g, "-")}-content`}>
        <div className="text-polytime-muted text-[10px] tracking-widest uppercase">
          {props.eyebrow}
        </div>
        <div className="text-polytime-ink mt-2 text-2xl font-bold tracking-tight">
          {props.title}
        </div>
        <div className="text-polytime-muted mt-1 text-xs">{props.subtitle}</div>
      </div>
      <div
        id={`${props.eyebrow.toLowerCase().replace(/\s+/g, "-")}-icon`}
        className={iconVariants({ theme: props.iconTheme })}
      >
        {iconMap({
          icon: props.icon,
          className: "h-4 w-4",
        })}
      </div>
    </Card>
  );
}
