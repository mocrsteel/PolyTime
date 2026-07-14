/**
 * Loading Skeleton for pages.
 *
 * Split per page, intended to be used as a placeholder while the page is loading.
 * Counting on the page itself to load the default titles etc.
 */

// I probably want to give a few options for the pages. See placeholder type below.
type SkeletonType = "timesheets" | "overview" | "profile" | "management" | "reports"

type LoadingSkeletonProps = {
  page: SkeletonType,
}

// function OverviewSkeleton() {
//   return (
//     <div id="overview-skeleton" className="bg-slate-50 h-full w-full">
//       <div id="summary-skeleton" className="grid grid-cols-3 gap-4 mb-5 px-4 sm:px-6 lg:px-10">
//         <div className="h-30 bg-slate-200 animate-pulse rounded-lg"></div>
//         <div className="h-30 bg-slate-200 animate-pulse rounded-lg"></div>
//         <div className="h-30 bg-slate-200 animate-pulse rounded-lg"></div>
//       </div>
//       <div id="month-skeleton" className="mb-5 px-4 sm:px-6 lg:px-10">
//         <div className="h-60 bg-slate-200 animate-pulse rounded-lg"></div>
//       </div>
//       <div id="actions-skeleton" className="mb-5 px-4 sm:px-6 lg:px-10">
//         <div className="h-40 bg-slate-200 animate-pulse rounded-lg"></div>
//       </div>
//     </div>
//   )
// }

// function TimesheetSkeleton() {
//   return (
//     <div id="timesheet-skeleton" className="bg-slate-50 h-full w-full">
//       <div id="week-skeleton" className="mb-5 px-4 sm:px-6 lg:px-10">
//         <div className="h-16 bg-slate-200 animate-pulse rounded-lg"></div>
//       </div>
//       <div id="progress-skeleton" className="mb-5 px-4 sm:px-6 lg:px-10">
//         <div className="h-12 bg-slate-200 animate-pulse rounded-lg"></div>
//       </div>
//       <div id="full-in-skeleton" className="mb-5 px-4 sm:px-6 lg:px-10">
//         <div className="h-80 bg-slate-200 animate-pulse rounded-lg"></div>
//       </div>
//     </div>
//   )
// }
//
// function ProfileSkeleton() {
//   return (
//     <div id="skeleton">
//
//     </div>
//   )
// }
//
// function ManagementSkeleton() {
//   return (
//     <div id="skeleton">
//
//     </div>
//   )
// }
//
// function ReportsSkeleton() {
//   return (
//     <div id="skeleton">
//
//     </div>
//   )
// }

function Skeleton({ className = "" }: {className?: string}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
      aria-hidden="true"
    />
  );
}

function SkeletonCard({ children, className = "" }: {children: React.ReactNode, className?: string}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function PageHeaderSkeleton({ actions = 1 }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Skeleton className="mb-3 h-3 w-24" />
        <Skeleton className="h-9 w-56" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: actions }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-28" />
        ))}
      </div>
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <section>
      <PageHeaderSkeleton actions={1} />

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <SkeletonCard key={item}>
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-4 h-8 w-28" />
                <Skeleton className="mt-3 h-4 w-36" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
          </SkeletonCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
        <SkeletonCard className="overflow-hidden p-0">
          <div className="border-b border-slate-200 bg-teal-50/50 p-6">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-4 h-7 w-72" />
            <Skeleton className="mt-3 h-4 w-full max-w-lg" />
          </div>

          <div className="grid gap-4 p-5">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <div className="grid gap-2 sm:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className="h-24 rounded-2xl" />
              ))}
            </div>
          </div>
        </SkeletonCard>

        <SkeletonCard>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-6 w-56" />
          <Skeleton className="mt-2 h-4 w-64" />

          <div className="mt-5 grid gap-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-16 rounded-2xl" />
            ))}
          </div>

          <Skeleton className="mt-5 h-20 rounded-2xl" />
        </SkeletonCard>
      </div>
    </section>
  );
}

export function TimesheetSkeleton() {
  return (
    <section>
      <PageHeaderSkeleton actions={3} />

      <SkeletonCard className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8" />
        </div>
        <div className="text-center">
          <Skeleton className="mx-auto h-5 w-40" />
          <Skeleton className="mx-auto mt-2 h-3 w-24" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-6 w-32" />
        </div>
      </SkeletonCard>

      <SkeletonCard className="my-3">
        <div className="mb-2 flex justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </SkeletonCard>

      <Skeleton className="mb-3 h-10 w-56" />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="border-r border-slate-200 p-3 last:border-r-0">
              <Skeleton className="mx-auto h-2 w-8" />
              <Skeleton className="mx-auto mt-2 h-6 w-6" />
              <Skeleton className="mx-auto mt-2 h-3 w-12" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>

        <div className="px-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="grid grid-cols-[minmax(220px,2fr)_minmax(140px,1fr)_150px_32px] gap-3 border-t border-slate-100 px-2 py-3">
              <div className="flex gap-3">
                <Skeleton className="h-12 w-2 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="mt-2 h-3 w-20" />
                  <Skeleton className="mt-3 h-5 w-56" />
                </div>
              </div>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReportsSkeleton() {
  return (
    <section>
      <PageHeaderSkeleton actions={1} />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-9 w-40" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <SkeletonCard key={item}>
            <div className="flex min-h-24 justify-between gap-4">
              <div>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-4 h-8 w-28" />
                <Skeleton className="mt-3 h-4 w-36" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </div>
          </SkeletonCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(360px,.85fr)]">
        <SkeletonCard>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-6 w-52" />
          <Skeleton className="mt-2 h-4 w-72" />

          <div className="mt-6 grid gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="grid gap-2 sm:grid-cols-[120px_1fr_64px] sm:items-center sm:gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </SkeletonCard>

        <SkeletonCard>
          <div className="flex justify-between gap-4">
            <div>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-4 h-6 w-44" />
              <Skeleton className="mt-2 h-4 w-56" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="mt-5 grid gap-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-20 rounded-2xl" />
            ))}
          </div>
        </SkeletonCard>
      </div>

      <SkeletonCard className="mt-4">
        <div className="flex justify-between gap-4">
          <div>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-4 h-6 w-52" />
            <Skeleton className="mt-2 h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="mt-6 grid gap-3">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-16 rounded-2xl" />
          ))}
        </div>
      </SkeletonCard>
    </section>
  );
}

export function ManagementSkeleton() {
  return (
    <section>
      <PageHeaderSkeleton actions={1} />

      <div className="mb-4 flex gap-2 border-b border-slate-200 pb-2">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-9 w-28" />
        ))}
      </div>

      <SkeletonCard>
        <div className="flex justify-between gap-4">
          <div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="mt-5 grid gap-4">
          {[1, 2].map((item) => (
            <div key={item} className="grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-[1.3fr_.8fr_1.2fr]">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          ))}
        </div>
      </SkeletonCard>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex justify-between p-4">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
          <Skeleton className="h-3 w-full" />
        </div>

        {[1, 2, 3].map((item) => (
          <div key={item} className="grid grid-cols-[2fr_.8fr_1fr_.7fr_30px] items-center gap-4 border-t border-slate-200 px-5 py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-2 h-3 w-44" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-6" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProfileSkeleton() {
  return (
    <div>To be built</div>
  )
}

export default function LoadingSkeleton({page}: LoadingSkeletonProps) {
  switch (page) {
    case "timesheets":
      return <TimesheetSkeleton/>
    case "overview":
      return <OverviewSkeleton/>
    case "profile":
      return <ProfileSkeleton/>
    case "management":
      return <ManagementSkeleton/>
    case "reports":
      return <ReportsSkeleton/>
    default:
      return <OverviewSkeleton/>
  }
}
