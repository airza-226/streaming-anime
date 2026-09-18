'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type EpisodeNumberGridProps = {
  animeId: string;
  totalEpisodes: number;
  currentEpisode: number;
  chunkSize?: number;
};

export function EpisodeNumberGrid({
  animeId,
  totalEpisodes,
  currentEpisode,
  chunkSize = 24,
}: EpisodeNumberGridProps) {
  const ranges = useMemo(() => {
    const result: { start: number; end: number }[] = [];
    for (let start = 1; start <= totalEpisodes; start += chunkSize) {
      result.push({ start, end: Math.min(start + chunkSize - 1, totalEpisodes) });
    }
    return result;
  }, [totalEpisodes, chunkSize]);

  const activeRangeIndex = ranges.findIndex(
    (r) => currentEpisode >= r.start && currentEpisode <= r.end
  );
  const [selectedRange, setSelectedRange] = useState(Math.max(activeRangeIndex, 0));
  const current = ranges[selectedRange];

  const episodesInRange = current
    ? Array.from({ length: current.end - current.start + 1 }, (_, i) => current.start + i)
    : [];

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Daftar Episode {current ? `${current.start}-${current.end}` : ''}
        </h2>
        {ranges.length > 1 && (
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(Number(e.target.value))}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
          >
            {ranges.map((r, i) => (
              <option key={r.start} value={i}>
                {r.start}-{r.end}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-3 grid grid-cols-6 gap-2">
        {episodesInRange.map((number) => {
          const isActive = number === currentEpisode;
          return (
            <Link
              key={number}
              href={`/watch/${animeId}/${number}`}
              className={clsx(
                'flex h-9 items-center justify-center rounded-md border text-sm font-medium transition-colors',
                isActive
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-background text-foreground hover:border-accent/50'
              )}
            >
              {number}
            </Link>
          );
        })}
      </div>
    </div>
  );
}