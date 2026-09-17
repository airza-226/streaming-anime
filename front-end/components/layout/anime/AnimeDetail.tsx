'use client';

import { useState } from 'react';
import { Play, Bookmark, Clapperboard } from 'lucide-react';
import { AnimeDetail, Episode } from '@/types/animeDetail';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { buildMetaLine, getGenre, getSynopsis, resolveBanner } from '@/components/common/utils/animeDisplay';
import clsx from 'clsx';

type AnimeDetailViewProps = {
  anime: AnimeDetail;
};


export function AnimeDetailView({ anime }: AnimeDetailViewProps) {
  const banner = resolveBanner(anime)
  const metaLine = buildMetaLine(anime)
  const synopsis = getSynopsis(anime)
  const genre = getGenre(anime)
  return (
    <div>
      <div className="relative h-40 w-full overflow-hidden bg-surface sm:h-56 lg:h-64">
        <img src={banner.url} alt="Poster" className={clsx(
          'h-full w-full object-cover',
          banner.isFallback && 'scale-110 blur-2xl'
        )} />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 flex gap-4 sm:-mt-20 sm:gap-6">
          <div className="relative aspect-2/3 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-background shadow-lg sm:w-36 lg:w-44">
            <img
              src={anime.posterUrl}
              alt={anime.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-end pb-1">
            <h1 className="line-clamp-2 text-lg font-bold text-foreground sm:text-2xl lg:text-3xl">
              {anime.title}
            </h1>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              {metaLine && <p className="mt-1 text-xs text-muted sm:text-sm">{metaLine}</p>}
            </p>
          </div>
        </div>

        {genre.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {genre.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2 sm:mt-6">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:flex-none sm:px-8">
            <Play className="h-4 w-4 fill-white" />
            Tonton
          </button>
          <button
            aria-label="Simpan ke daftar"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 pb-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-foreground sm:text-base">Sinopsis</h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{synopsis}</p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
              Episode{anime.totalEpisode ? ` (${anime.totalEpisode})` : ''}
            </h2>
            <div className="flex flex-col gap-2">
              {anime.episode.map((episode) => (
                <EpisodeRow key={episode.id} episode={episode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EpisodeRow({ episode }: { episode: Episode }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2 text-left transition-colors hover:border-accent/50">
      <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-md sm:w-24">
        {!imgError && episode.thumbnailUrl ? (
          <img
            src={episode.thumbnailUrl}
            alt=""
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-background">
            <Clapperboard className="h-5 w-5 text-muted/50" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          Episode {episode.number}
          {episode.title && ` — ${episode.title}`}
        </p>
        <p className="text-xs text-muted">{formatRelativeTime(episode.releaseAt)}</p>
      </div>
    </button>
  );
}