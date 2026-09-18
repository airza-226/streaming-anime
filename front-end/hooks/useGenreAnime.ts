// useGenreAnime.ts
import { useQuery } from '@tanstack/react-query';
import { getAnimeByGenres } from '@/lib/api/genre';
import { AnimeGenre } from '@/types/animeDetail';
export function useGenreAnime(genres: AnimeGenre[], page = 1) {
  return useQuery({ queryKey: ['genre', genres, page], queryFn: () => getAnimeByGenres(genres, page), staleTime: 60_000 });
}