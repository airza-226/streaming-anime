import { Episode } from './animeDetail';

export type WatchData = {
  videoUrl: string;
  episode: Episode;
  anime: {
    id: string;
    title: string;
    posterUrl: string;
    totalEpisodes: number;
    synopsis: string;
    genres: string[];
    status: 'ongoing' | 'completed' | 'upcoming'|'dropped';
    releaseYear?: number;
  };
};