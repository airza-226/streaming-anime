'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Clapperboard } from 'lucide-react';
import { Anime } from '@/types/anime';

type AnimeCardProps = {
  anime: Anime;
};

export function AnimeCard({ anime }: AnimeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group w-36 shrink-0 cursor-pointer sm:w-44">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow">
        {!imgError ? (
          <Image
            src={anime.posterUrl}
            alt={anime.title}
            fill
            sizes="(max-width: 640px) 144px, 176px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
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