'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import clsx from 'clsx';
import { Episode } from '@/types/animeDetail';
import { formatRelativeTime } from '@/lib/formatRelativeTime';

type EpisodeRowProps = {
  animeId: string;
  episode: Episode;
  isActive?: boolean;
};

export function EpisodeRow({ animeId, episode, isActive = false }: EpisodeRowProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/watch/${animeId}/${episode.number}`}
      className={clsx(
        'flex items-center gap-3 rounded-lg border p-2 transition-colors',
        isActive
          ? 'border-accent bg-accent/10'
          : 'border-border bg-surface hover:border-accent/50'
      )}
    >
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
        <p className={clsx('truncate text-sm font-medium', isActive ? 'text-accent' : 'text-foreground')}>
          Episode {episode.number}
          {episode.title && ` — ${episode.title}`}
        </p>
        <p className="text-xs text-muted">{formatRelativeTime(episode.releaseAt)}</p>
      </div>
    </Link>
  );
}