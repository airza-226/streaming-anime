'use client';

import Link from 'next/link';
import { WatchData } from '@/types/watch';
import { EpisodeRow } from '@/components/layout/anime/EpisodeRow';

type WatchViewProps = {
  data: WatchData;
};

export function WatchView({ data }: WatchViewProps) {
  const { videoUrl, episode, anime, episodes } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Video player */}
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video
          key={videoUrl}
          controls
          autoPlay
          className="h-full w-full"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="mt-4 flex gap-3 sm:mt-6 sm:gap-4">
        <Link href={`/anime/${anime.id}`} className="shrink-0">
          <img
            src={anime.posterUrl}
            alt={anime.title}
            className="aspect-[2/3] w-16 rounded-lg object-cover sm:w-20"
          />
        </Link>

        <div className="min-w-0">
          <Link href={`/anime/${anime.id}`}>
            <h1 className="line-clamp-2 text-base font-bold text-foreground hover:text-accent sm:text-lg">
              {anime.title}
            </h1>
          </Link>
          <p className="mt-1 text-sm text-muted">
            Episode {episode.number} dari {anime.totalEpisodes}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
          Semua Episode
        </h2>
        <div className="flex flex-col gap-2">
          {episodes.map((ep) => (
            <EpisodeRow
              key={ep.id}
              animeId={anime.id}
              episode={ep}
              isActive={ep.number === episode.number}
            />
          ))}
        </div>
      </div>
    </div>
  );
}