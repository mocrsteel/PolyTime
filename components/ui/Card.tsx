// TODO: Add some more styling options for full page (and spacious design) and smaller cards.

type CardProps = {
  children: React.ReactNode;
}

export default function Card({children}: CardProps) {
  return (
    <div
      className="rounded-ui-xl border border-app-border bg-app-surface shadow-soft flex flex-col items-center justify-center gap-4  p-18"
    >
      {children}
    </div>
  )
}
