
import { useQuery } from "@tanstack/react-query";
import { getAnimeDetail } from "@/lib/api/animeDetail";
export function useAnimeDetail(id: string) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeDetail(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}
