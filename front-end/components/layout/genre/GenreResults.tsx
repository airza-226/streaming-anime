'use client';

import { useSearchParams } from 'next/navigation';

import { useGenreAnime } from '@/hooks/useGenreAnime';
import DataRender from '@/components/common/DataRender';
import { PosterGridSkeleton } from '@/components/common/components/skeletons/PosterGridSkeleton';
import { Pagination } from '@/components/common/Pagination';
import { AnimeCard } from '@/components/layout/home/AnimeCard';
import GenreFilter from '@/components/ui/GenreFilter';
import { GENRES } from '@/components/common/config/genre.config';
import { useState } from 'react';
export function GenreResults() {
  const searchParams = useSearchParams();
  const selectedGenres = searchParams.get('genres')?.split(',').filter(Boolean) ?? [];
  const page = Number(searchParams.get('page')) || 1;
  const [genre,setGenre] = useState([])
  const { data, isFetching, isError, refetch } = useGenreAnime(selectedGenres, page);

  return (
    <>

    {GENRES.map((item,index)=>(
      <>
      <GenreFilter onSelect={setGenre} genre={genre}/>
      </>
    ))}
      

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        <DataRender
          loading={isFetching}
          error={isError}
          onRetry={refetch}
          data={data?.data}
          skeleton={<PosterGridSkeleton count={12} />}
          empty={
            <p className="col-span-full py-16 text-center text-sm text-muted">
              {selectedGenres.length > 0
                ? 'Belum ada anime untuk genre yang dipilih'
                : 'Pilih genre buat mulai filter'}
            </p>
          }
          item={(anime) => <AnimeCard key={anime.id} anime={anime} />}
        />
      </div>

      {data && data.totalPages > 1 && (
        <div className="mx-auto mt-8 max-w-7xl border-t border-border pt-6">
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            basePath={`/genre?${selectedGenres.length > 0 ? `genres=${selectedGenres.join(',')}&` : ''}page`}
            mode="query"
          />
        </div>
      )}
    </>
  );
}