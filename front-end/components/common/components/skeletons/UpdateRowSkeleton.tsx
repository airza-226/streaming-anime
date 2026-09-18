type UpdateRowSkeletonProps = {
  count?: number;
};

export function UpdateRowSkeleton({ count = 10 }: UpdateRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex animate-pulse gap-0 overflow-hidden rounded-xl border border-border">
          <div className="w-14 shrink-0 bg-surface sm:w-16" />
          <div className="aspect-[2/3] w-16 shrink-0 bg-surface sm:w-20" />
          <div className="flex flex-1 flex-col justify-center gap-2 bg-surface px-3 py-2 sm:px-4">
            <div className="h-4 w-3/4 rounded bg-background/40" />
            <div className="h-3 w-1/2 rounded bg-background/40" />
          </div>
        </div>
      ))}
    </>
  );
}