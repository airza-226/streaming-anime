import { AnimeDetail, AnimeGenre } from "@/types/animeDetail";
import { STATUS_LABEL,STATUS_GENRE } from "../config/animeMeta.config.";

export function resolveBanner(anime:Pick<AnimeDetail,'bannerUrl' | 'posterUrl'>) {
    if(anime.bannerUrl) {
        return {url:anime.bannerUrl,isFallback:false}
    }
    return {url:anime.posterUrl,isFallback:true}
}

export function buildMetaLine(anime:Pick<AnimeDetail,'status' | 'releaseYear' | 'studio'>) {
    return [STATUS_LABEL[anime.status],anime.releaseYear,anime.studio]
    .filter(Boolean)
    .join(' · ');
}

export function getSynopsis(anime:Pick<AnimeDetail,'synopsis'>):string {
    return anime.synopsis?.trim() || 'Synopsis belum tersedia untuk anime ini'
}

export function getGenre(anime: Pick<AnimeDetail, 'genre'>): AnimeGenre[] {
  if (!anime.genre) return [];
  return Array.isArray(anime.genre) ? anime.genre : [anime.genre];
}