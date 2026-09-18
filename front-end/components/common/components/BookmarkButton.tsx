'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import clsx from 'clsx';

type BookmarkButtonProps = {
  initialBookmarked?: boolean;
  // TODO: sambungin ke API watchlist begitu endpoint-nya jadi
  onToggle?: (next: boolean) => void;
};

export function BookmarkButton({ initialBookmarked = false, onToggle }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleClick = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    onToggle?.(next);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isBookmarked ? 'Hapus dari daftar' : 'Simpan ke daftar'}
      aria-pressed={isBookmarked}
      className={clsx(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
        isBookmarked
          ? 'border-accent bg-accent text-white'
          : 'border-border bg-surface text-foreground hover:bg-background'
      )}
    >
      <Bookmark className={clsx('h-4 w-4', isBookmarked && 'fill-current')} />
    </button>
  );
}