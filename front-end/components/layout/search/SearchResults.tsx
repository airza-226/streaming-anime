'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useSearchAnime } from '@/hooks/useSearchAnime';
import { DataRender } from '@/common/components/DataRender';
import { PosterGridSkeleton } from '@/common/components/skeletons/PosterGridSkeleton';
import { Pagination } from '@/common/components/Pagination';
import { AnimeCard } from '@/components/layout/home/AnimeCard';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isFetching, isError, refetch } = useSearchAnime(query, page);

  if (!query.trim()) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <Search className="h-10 w-10 text-border" strokeWidth={1.5} />
        <p className="text-sm text-muted">Ketik judul anime yang mau kamu cari</p>
      </div>
    );
  }

  const hasResults = (data?.data.length ?? 0) > 0;

  return (
    <>
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          &quot;{query}&quot;
        </h1>
        {!isFetching && !isError && (
          <p className="mt-1 text-sm text-muted">
            {hasResults
              ? `${data?.data.length} hasil di halaman ini${data && data.totalPages > 1 ? ` — ${data.totalPages} halaman total` : ''}`
              : 'Tidak ada hasil'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        <DataRender
          loading={isFetching}
          error={isError}
          onRetry={refetch}
          data={data?.data}
          skeleton={<PosterGridSkeleton count={12} />}
          empty={
            <div className="col-span-full flex flex-col items-center gap-2 py-16 text-center">
              <p className="text-sm text-foreground">
                Gak ketemu anime dengan judul &quot;{query}&quot;
              </p>
              <p className="text-xs text-muted">Coba kata kunci lain atau periksa ejaannya</p>
            </div>
          }
          item={(anime) => <AnimeCard key={anime.id} anime={anime} />}
        />
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-8 border-t border-border pt-6">
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            basePath={`/search?q=${encodeURIComponent(query)}&page`}
            mode="query"
          />
        </div>
      )}
    </>
  );
}