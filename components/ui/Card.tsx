// TODO: Add some more styling options for full page (and spacious design) and smaller cards.
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof cardVariants.variants.layout;
  children: React.ReactNode;
};

const cardVariants = tv({
  base: "border-polytime-line shadow-soft overflow-hidden rounded-xl border bg-white",
  variants: {
    layout: {
      default: "p-4",
      modal: "p-4",
      container: "p-0",
      page: "p-18",
      custom: "",
    },
  },
});

export default function Card({
  children,
  variant = "page",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(cardVariants({ layout: variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
