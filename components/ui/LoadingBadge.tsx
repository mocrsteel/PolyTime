type LoadingBadgeProps = {
  children: React.ReactNode,
}

export default function LoadingBadge({children}: LoadingBadgeProps) {
  return (
    <div className="inline-flex items-center gap-3 px-3 py-2 border border-teal-100 bg-teal-50 rounded-xl font-semibold text-slate-600 mt-5 text-xs">
      <span className="w-5 h-5 rounded-full border-[3px] border-teal-100 border-t-teal-700 animate-spin" />
      <p>{children}</p>
    </div>
  )
}
