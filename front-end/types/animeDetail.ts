export type Anime = {
  id: string;
  title: string;
  posterUrl: string;
  rating?: number;
  videoUrl?: File;
};

export type Episode = {
  id: string;
  number: number;
  title?: string;
  thumbnailUrl?: string;
  releaseAt: string;
};
export type AnimeGenre =
  | "Action"
  | "Adventure"
  | "Comedy"
  | "Cyberpunk"
  | "Drama"
  | "Ecchi"
  | "Fantasy"
  | "Harem"
  | "Horror"
  | "Isekai"
  | "Iyashikei"
  | "Josei"
  | "Kodomomuke"
  | "Mahou Shoujo"
  | "Mecha"
  | "Music"
  | "Mystery"
  | "Post-Apocalyptic"
  | "Psychological"
  | "Reverse Harem"
  | "Romance"
  | "Sci-Fi"
  | "Seinen"
  | "Shoujo"
  | "Shounen"
  | "Slice of Life"
  | "Sports"
  | "Supernatural"
  | "Superpower";
export type AnimeDetail = Anime & {
  synopsis: string;
  bannerUrl?: string;
  status: "ongoing" | "completed" | "upcoming" | "dropped";
  studio?: string;
  releaseYear?: number;
  totalEpisode?: number;
  episode: Episode[];
  genre:AnimeGenre | AnimeGenre[]
};

export type EpisodeRowProps ={
  animeId:string
  episode:Episode
  isActive?:boolean
}