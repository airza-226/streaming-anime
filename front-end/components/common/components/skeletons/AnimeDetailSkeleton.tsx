export function AnimeDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-40 w-full bg-surface sm:h-56 lg:h-64" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 flex gap-4 sm:-mt-20 sm:gap-6">
          <div className="aspect-[2/3] w-28 shrink-0 rounded-xl border-2 border-background bg-surface sm:w-36 lg:w-44" />
          <div className="flex flex-1 flex-col justify-end gap-2 pb-1">
            <div className="h-6 w-3/4 rounded bg-surface sm:h-8" />
            <div className="h-4 w-1/2 rounded bg-surface" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-surface" />
          <div className="h-6 w-20 rounded-full bg-surface" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-2/3 rounded bg-surface" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-surface" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}