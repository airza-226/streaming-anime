export function WatchSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="skeleton aspect-video w-full rounded-xl" />
        <div className="skeleton hidden rounded-xl lg:block" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-6 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
      <div className="mt-3 flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  );
}