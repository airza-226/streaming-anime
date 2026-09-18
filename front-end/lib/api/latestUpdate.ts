
import { Anime } from "@/types/animeDetail";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
type LatestUpdatesResponse = { data: Anime[]; currentPage: number; totalPages: number };
export async function getLatestUpdates(page: number): Promise<LatestUpdatesResponse> {
  const res = await fetch(`${API_URL}/api/anime/latest?page=${page}&limit=10`);
  if (!res.ok) throw new Error('Gagal mengambil data update terbaru');
  return res.json();
}