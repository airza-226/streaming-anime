// useWatchEpisode.ts
import { useQuery } from '@tanstack/react-query';
import { getEpisodeToWatch } from '@/lib/api/watch';
export function useWatchEpisode(animeId: string, episodeNumber: string) {
  return useQuery({
    queryKey: ['watch', animeId, episodeNumber],
    queryFn: () => getEpisodeToWatch(animeId, episodeNumber),
    enabled: !!animeId && !!episodeNumber,
  });
}