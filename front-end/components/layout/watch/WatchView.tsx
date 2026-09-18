import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { WatchData } from '@/types/watch';
import { BookmarkButton } from '@/components/common/components/BookmarkButton';
import { EpisodeNumberGrid } from '@/components/layout/anime/EpisodeNumberGrid';
import { WatchActionBar } from './WatchActionBar';
import { ExpandableText } from '@/components/common/components/ExpandableText';
import { STATUS_LABEL } from '@/components/common/config/animeMeta.config.';

type WatchViewProps = {
  data: WatchData;
};

export function WatchView({ data }: WatchViewProps) {
  const { videoUrl, episode, anime } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <video key={videoUrl} controls autoPlay className="h-full w-full">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          <WatchActionBar shareUrl={typeof window !== 'undefined' ? window.location.href : ''} />
        </div>

        <div className="lg:sticky lg:top-20">
          <EpisodeNumberGrid
            animeId={anime.id}
            totalEpisodes={anime.totalEpisodes}
            currentEpisode={episode.number}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-1.5">
        <Link href={`/anime/${anime.id}`} className="text-lg font-bold text-foreground hover:text-accent sm:text-xl">
          {anime.title}
        </Link>
        <ChevronRight className="h-4 w-4 text-muted" />
        <span className="text-lg font-bold text-muted sm:text-xl">Episode {episode.number}</span>
      </div>
      <p className="mt-1 text-xs text-muted sm:text-sm">
        {STATUS_LABEL[anime.status]}
        {anime.releaseYear && ` · ${anime.releaseYear}`}
        {` · ${anime.totalEpisodes} Episode`}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex flex-1 flex-wrap gap-2">
          {anime.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
            >
              {genre}
            </span>
          ))}
        </div>
        <BookmarkButton />
      </div>

      <div className="mt-4 max-w-3xl">
        <ExpandableText text={anime.synopsis} collapsedLines={2} />
      </div>
    </div>
  );
}