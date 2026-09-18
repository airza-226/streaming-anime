type UpdateRowSkeletonProps = { count?: number };

export function UpdateRowSkeleton({ count = 10 }: UpdateRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-stretch gap-0 overflow-hidden rounded-xl border border-border">
          <div className="skeleton flex w-14 shrink-0 flex-col items-center justify-center gap-1.5 sm:w-16">
            <div className="h-2 w-6 rounded-sm bg-border" />
            <div className="h-6 w-6 rounded bg-border" />
          </div>
          <div className="skeleton aspect-[2/3] w-16 shrink-0 sm:w-20" />
          <div className="flex flex-1 flex-col justify-center gap-2 bg-surface px-3 py-2 sm:px-4">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-2/5 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}