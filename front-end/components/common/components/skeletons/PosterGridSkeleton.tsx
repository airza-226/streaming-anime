type PosterGridSkeletonProps = {
  count?: number;
};

export function PosterGridSkeleton({ count = 12 }: PosterGridSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-2/3 animate-pulse rounded-xl bg-surface" />
      ))}
    </>
  );
}