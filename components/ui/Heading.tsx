/**
 * TODO: Build the recurring page heading that is transformed into the correct one for  every page.
 */
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type HeadingProps = React.HTMLAttributes<HTMLDivElement> & {
  buttons: React.ReactNode;
  title: string;
  subtitle: string;
  eyebrow: string;
};

const headingVariants = tv({
  base: "border-polytime-line flex flex-row items-end justify-between pb-4",
});

export default function Heading({
  buttons,
  title,
  subtitle,
  eyebrow,
  ...props
}: HeadingProps) {
  return (
    <div className={twMerge(headingVariants(), props.className)}>
      <div>
        <div className="text-polytime-teal mb-2 text-[10px] font-bold tracking-widest uppercase">
          {eyebrow}
        </div>
        <div className="text-3xl font-bold tracking-tight">{title}</div>
        <div className="text-hourwise-muted mt-2 text-sm">{subtitle}</div>
      </div>
      <div className="flex flex-row gap-2">{buttons}</div>
    </div>
  );
}
