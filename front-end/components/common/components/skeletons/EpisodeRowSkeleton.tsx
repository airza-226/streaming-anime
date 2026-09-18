type EpisodeRowSkeletonProps = { count?: number };

export function EpisodeRowSkeleton({ count = 3 }: EpisodeRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2">
          <div className="skeleton aspect-video w-20 shrink-0 rounded-md sm:w-24" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/3 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}