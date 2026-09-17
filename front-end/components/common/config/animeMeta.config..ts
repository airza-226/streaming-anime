import { AnimeDetail, AnimeGenre } from "@/types/animeDetail";
export const STATUS_LABEL:Record<AnimeDetail['status'],string> = {
    ongoing:'OnGoing',
    completed:'Completed',
    dropped:'Dropped',
    upcoming:'UpComing'
}

export const STATUS_GENRE: Record<AnimeGenre, string> = {
  Action: "Action",
  Adventure: "Adventure",
  Comedy: "Comedy",
  Cyberpunk: "Cyberpunk",
  Drama: "Drama",
  Ecchi: "Ecchi",
  Fantasy: "Fantasy",
  Harem: "Harem",
  Horror: "Horror",
  Isekai: "Isekai",
  Iyashikei: "Iyashikei",
  Josei: "Josei",
  Kodomomuke: "Kids",
  "Mahou Shoujo": "Magical Girl",
  Mecha: "Mecha",
  Music: "Music",
  Mystery: "Mystery",
  "Post-Apocalyptic": "Post-Apocalyptic",
  Psychological: "Psychological",
  "Reverse Harem": "Reverse Harem",
  Romance: "Romance",
  "Sci-Fi": "Sci-Fi",
  Seinen: "Seinen",
  Shoujo: "Shoujo",
  Shounen: "Shounen",
  Sports: "Sports",
  Supernatural: "Supernatural",
  Superpower: "Superpower",
  "Slice of Life":"Slice of life"
};