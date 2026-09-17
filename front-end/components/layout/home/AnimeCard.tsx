'use client';

import { useState } from 'react';
import { Star, Clapperboard } from 'lucide-react';
import { Anime } from '@/types/animeDetail';

type AnimeCardProps = {
  anime: Anime;
};

export function AnimeCard({ anime }: AnimeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group w-36 shrink-0 cursor-pointer sm:w-44 pt-2">
      <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow">
        {!imgError ? (
          <img
            src={anime.posterUrl}
            alt={anime.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          // cuma icon, judulnya udah ada di <p> luar, gak perlu diulang di sini
          <div className="flex h-full w-full items-center justify-center bg-surface">
            <Clapperboard className="h-8 w-8 text-muted/50" />
          </div>
        )}

        {anime.rating && (
          <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm">
            <Star className="h-3 w-3 fill-current" />
            {anime.rating}
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-1 text-sm font-medium text-foreground">{anime.title}</p>
    </div>
  );
}