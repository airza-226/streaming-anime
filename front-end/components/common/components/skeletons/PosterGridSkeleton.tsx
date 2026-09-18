type PosterGridSkeletonProps = { count?: number; variant?: 'grid' | 'row' };

export function PosterGridSkeleton({ count = 12, variant = 'grid' }: PosterGridSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={variant === 'row' ? 'w-36 shrink-0 sm:w-44' : 'w-full'}>
          <div className="skeleton aspect-[2/3] rounded-xl border border-border" />
          <div className="skeleton mt-2 h-4 w-4/5 rounded" />
        </div>
      ))}
    </>
  );
}