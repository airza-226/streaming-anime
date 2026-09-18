
import { useQuery } from '@tanstack/react-query';
import { searchAnime } from '@/lib/api/search';
export function useSearchAnime(query: string, page = 1) {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchAnime(query, page),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
  });
}