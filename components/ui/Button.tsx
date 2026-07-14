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
  let className: string
  if (primary) {
    className =
      "font-semibold text-xs px-4 py-3 bg-teal-700 border border-teal-700 text-white rounded-lg shadow-lg hover:bg-teal-800 transition-colors"
  } else {
    className =
      "font-semibold text-xs px-4 py-3 border text-slate text-slate-900 border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
  }

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
