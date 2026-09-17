import Link from 'next/link';
import { useState } from 'react';
import { Clapperboard } from 'lucide-react';
import { Anime } from '@/types/animeDetail';
import { formatRelativeTime } from '@/lib/formatRelativeTime';

type LatestUpdateCardProps = {
  anime: Anime;
};

export function LatestUpdateCard({ anime }: LatestUpdateCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/anime/${anime.id}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow">
        {!imgError ? (
          <img
            src={anime.posterUrl}
            alt={anime.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface">
            <Clapperboard className="h-8 w-8 text-muted/50" />
          </div>
        )}

        {anime.latestEpisode && (
          <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold text-white">
            EP {anime.latestEpisode}
          </span>
        )}

        {anime.updatedAt && (
          <span className="absolute bottom-2 right-2 rounded-md bg-background/70 px-1.5 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
            {formatRelativeTime(anime.updatedAt)}
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-1 text-sm font-medium text-foreground">{anime.title}</p>
    </Link>
  );
}