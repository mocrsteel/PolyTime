// TODO: Add some more styling options for full page (and spacious design) and smaller cards.
import { tv } from "tailwind-variants";

type CardProps = {
  variant?: "modal" | "container" | "page";
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
    },
  },
});

export default function Card({ children, variant = "default" }: CardProps) {
  return <div className={cardVariants({ layout: variant })}>{children}</div>;
}
