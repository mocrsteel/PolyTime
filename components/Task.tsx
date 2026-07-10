export type TaskProps = {
  title: string;
  description?: string;
  status: "draft" | "submitted" | "approved" | "rejected";
}

export default function Task({ title, description, status }: TaskProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-slate-900">{title}</span>
        <span className="rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
          data-status={status}>
          {status}
        </span>
      </div>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
