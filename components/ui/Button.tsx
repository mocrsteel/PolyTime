import { Button as AriaButton } from "react-aria-components/Button"
import Link from "next/link"

type BaseButtonProps = {
  children: React.ReactNode
  primary?: boolean
  name?: string
}

// Onclick is required when it's a regular button. Otherwise we'd have no function at all.
type RegularButtonProps = BaseButtonProps & {
  link?: false
  href?: never
  onClick: () => void
}

// We don't want an onClick when it's a link button.
type LinkButtonProps = BaseButtonProps & {
  link: true
  href: `/${string}`
  onClick?: never
}

type ButtonProps = RegularButtonProps | LinkButtonProps

export default function Button({
  children,
  primary,
  link,
  href,
  onClick,
}: ButtonProps) {

  const baseClass = "inline-flex h-10 items-center justify-center gap-2 rounded-ui-lg border px-4 text-xs font-semibold transition"
  const className: string = primary
    ? baseClass + " bg-app-primary border-app-primary text-white shadow-action hover:bg-app-primary-hover hover:boder-app-primary-hover"
    : baseClass + " border-app-border bg-app-surface text-slate-700 hover:border-slate-300"

  // onPress function has been included for testing purposes with storybook.
  // Not intended for actual use in final app.
  if (link) {
    return (
      <Link href={href}>
        <AriaButton onPress={onClick} className={className}>
          {children}
        </AriaButton>
      </Link>
    )
  }
  return (
    <AriaButton onPress={onClick} className={className}>
      {children}
    </AriaButton>
  )
}
