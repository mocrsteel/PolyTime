import { Button as AriaButton } from "react-aria-components/Button";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { AppIcons, iconMap } from "@/components/Icons";

type BaseButtonProps = {
  children?: React.ReactNode;
  id?: string;
  name?: string;
  primary?: boolean;
  tiny?: boolean;
  style?: "primary" | "secondary" | "tertiary";
  size?: "default" | "tiny";
  icon?: AppIcons;
  className?: string;
  ariaLabel?: string;
};

// Onclick is required when it's a regular button. Otherwise we'd have no function at all.
type RegularButtonProps = BaseButtonProps & {
  link?: false;
  href?: never;
  onClick: () => void;
};

// We don't want an onClick when it's a link button.
type LinkButtonProps = BaseButtonProps & {
  link: true;
  href: `/${string}`;
  onClick?: never;
};

type ButtonProps = RegularButtonProps | LinkButtonProps;

const buttonVariants = tv({
  base: "rounded-ui-lg inline-flex items-center justify-center gap-2 border text-xs font-semibold transition",
  variants: {
    // Keeping primary in here to avoid breaking changes.
    // TODO: Refactor buttons to use `style` instead of `primary` in the futue to capture the removal of this item.
    primary: {
      true: "bg-app-primary border-app-primary shadow-action hover:bg-app-primary-hover hover:border-app-primary-hover text-white",
      false:
        "border-app-border bg-app-surface text-slate-700 hover:border-slate-300",
    },
    style: {
      primary:
        "bg-app-primary border-app-primary shadow-action hover:bg-app-primary-hover hover:border-app-primary-hover text-white",
      secondary:
        "border-app-border bg-app-surface text-slate-700 hover:border-slate-300",
      tertiary:
        "text-polytime-teal hover:text-polytime-teal-dark border-dashed border-slate-300 bg-slate-50 transition-colors hover:border-slate-400/80 hover:bg-slate-100/50",
    },
    tiny: {
      true: "rounded-ui-sm h-6 w-6 p-0",
    },
    size: {
      default: "rounded-ui-lg h-10 px-4",
      tiny: "rounded-ui-sm h-6 w-6 p-0",
    },
  },
});

export default function Button({
  children,
  id,
  primary,
  link,
  href,
  onClick,
  icon,
  tiny = false,
  style,
  size = "default",
  className,
  ariaLabel,
}: ButtonProps) {
  // let baseClass =
  //   "inline-flex items-center justify-center gap-2 rounded-ui-lg border text-xs font-semibold transition";
  // if (tiny) {
  //   baseClass += " h-6 w-6 rounded-ui-sm p-0";
  // } else {
  //   baseClass += " h-10 rounded-ui-lg px-4";
  // }
  // const internalClassName: string = primary
  //   ? baseClass +
  //     " bg-app-primary border-app-primary text-white shadow-action hover:bg-app-primary-hover hover:boder-app-primary-hover"
  //   : baseClass +
  //     " border-app-border bg-app-surface text-slate-700 hover:border-slate-300";

  // onPress function has been included for testing purposes with storybook.
  // Not intended for actual use in final app.
  if (link) {
    return (
      <Link href={href}>
        <AriaButton
          id={id}
          onPress={onClick}
          className={twMerge(
            buttonVariants({
              primary: primary,
              tiny: tiny,
              style: style,
              size: size,
            }),
            className,
          )}
          aria-label={ariaLabel}
        >
          {icon && iconMap({ icon, className: "h-4 w-4" })}
          {children}
        </AriaButton>
      </Link>
    );
  }
  return (
    <AriaButton
      id={id}
      onPress={onClick}
      className={twMerge(
        buttonVariants({
          primary: primary,
          tiny: tiny,
          style: style,
          size: size,
        }),
        className,
      )}
      aria-label={ariaLabel}
    >
      {icon && iconMap({ icon, className: "h-4 w-4" })}
      {children}
    </AriaButton>
  );
}
