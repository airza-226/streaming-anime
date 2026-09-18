import { WatchData } from "@/types/watch";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export async function getEpisodeToWatch(
  animeId: string,
  episodeNumber: string,
): Promise<WatchData> {
  const res = await fetch(
    `${API_URL}/api/anime/${animeId}/episode/${episodeNumber}`,
  );
  if (!res.ok) throw new Error("Gagal memuat episode");
  return res.json();
}
