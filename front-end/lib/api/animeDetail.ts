import { AnimeDetail } from "@/types/animeDetail";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export async function getAnimeDetail(id: string): Promise<AnimeDetail> {
  const res = await fetch(`${API_URL}/api/anime/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil detail anime");
  return res.json();
}
