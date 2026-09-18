'use client';

import { useLatestUpdates } from '@/hooks/useLatestUpdates';
import { DataRender } from '@/common/components/DataRender';
import { UpdateRowSkeleton } from '@/common/components/skeletons/UpdateRowSkeleton';
import { LatestUpdateCard } from './LatestUpdateCard';
import { Pagination } from '@/common/components/Pagination';

type LatestUpdatesContainerProps = {
  title: string;
  page: number;
};

export function LatestUpdatesContainer({ title, page }: LatestUpdatesContainerProps) {
  const { data, isFetching, isError, refetch } = useLatestUpdates(page);

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-3 text-lg font-semibold text-foreground sm:mb-4 sm:text-xl">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <DataRender
            loading={isFetching}
            error={isError}
            onRetry={refetch}
            data={data?.data}
            skeleton={<UpdateRowSkeleton count={10} />}
            empty={
              <p className="col-span-full py-8 text-center text-sm text-muted">
                Belum ada update terbaru
              </p>
            }
            item={(anime) => <LatestUpdateCard key={anime.id} anime={anime} />}
          />
        </div>

        {data && data.totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              basePath="/updates"
              mode="path"
            />
          </div>
        )}
      </div>
    </section>
  );
}