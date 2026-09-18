import { Anime, AnimeGenre } from "@/types/animeDetail";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
type GenreAnimeResponse = {
  data: Anime[];
  currentPage: number;
  totalPages: number;
};
export async function getAnimeByGenres(
  genres: AnimeGenre[],
  page = 1,
): Promise<GenreAnimeResponse> {
  const params = new URLSearchParams({ page: String(page), limit: "10" });
  if (genres.length > 0) params.set("genres", genres.join(","));
  const res = await fetch(`${API_URL}/api/anime/genre?${params.toString()}`);
  if (!res.ok) throw new Error("Gagal mengambil data anime berdasarkan genre");
  return res.json();
}
