import { EpisodeRowSkeleton } from './EpisodeRowSkeleton';

export function AnimeDetailSkeleton() {
  return (
    <div>
      <div className="skeleton h-40 w-full sm:h-56 lg:h-64" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 flex gap-4 sm:-mt-20 sm:gap-6">
          <div className="skeleton aspect-[2/3] w-28 shrink-0 rounded-xl border-2 border-background sm:w-36 lg:w-44" />
          <div className="flex flex-1 flex-col justify-end gap-2 pb-1">
            <div className="skeleton h-6 w-3/4 rounded sm:h-8" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
        <div className="mt-4 flex gap-2 sm:mt-6">
          <div className="skeleton h-10 flex-1 rounded-md sm:flex-none sm:w-32" />
          <div className="skeleton h-10 w-10 rounded-md" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 pb-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <EpisodeRowSkeleton count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}