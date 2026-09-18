import { Anime } from "@/types/animeDetail";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
type SearchResponse = {
  data: Anime[];
  currentPage: number;
  totalPages: number;
};
export async function searchAnime(
  query: string,
  page = 1,
): Promise<SearchResponse> {
  if (!query.trim()) return { data: [], currentPage: 1, totalPages: 1 };
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: "10",
  });
  const res = await fetch(`${API_URL}/api/search?${params.toString()}`);
  if (!res.ok) throw new Error("Gagal mengambil hasil pencarian");
  return res.json();
}
