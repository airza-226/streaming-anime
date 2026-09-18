
import { useQuery } from '@tanstack/react-query';
import { getLatestUpdates } from '@/lib/api/latestUpdate';
export function useLatestUpdates(page: number) {
  return useQuery({ queryKey: ['latestUpdates', page], queryFn: () => getLatestUpdates(page), staleTime: 60_000 });
}