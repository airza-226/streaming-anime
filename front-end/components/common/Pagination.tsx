'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';
import clsx from 'clsx';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  mode?: 'path' | 'query';
};

export function Pagination({ currentPage, totalPages, basePath, mode = 'path' }: PaginationProps) {
  const router = useRouter();
  const [jumpValue, setJumpValue] = useState('');

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const url = mode === 'query' ? `${basePath}=${page}` : `${basePath}/${page}`;
    router.push(url);
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = Number(jumpValue);
    if (!page || page < 1 || page > totalPages) return;
    goToPage(page);
    setJumpValue('');
  };

  const pageNumbers = [1, 2, 3]
    .map((offset) => currentPage - 1 + offset - 1)
    .filter((n) => n >= 1 && n <= totalPages);

  const showStartEllipsis = pageNumbers[0] > 2;
  const showEndEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages - 1;

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <span className="text-xs text-muted sm:text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage <= 1}
          aria-label="Halaman pertama"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Halaman sebelumnya"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {showStartEllipsis && (
          <>
            <button onClick={() => goToPage(1)} className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm text-foreground transition-colors hover:bg-surface">
              1
            </button>
            <span className="px-1 text-sm text-muted">…</span>
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={clsx(
              'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
              page === currentPage ? 'bg-accent text-white' : 'border border-border text-foreground hover:bg-surface'
            )}
          >
            {page}
          </button>
        ))}

        {showEndEllipsis && (
          <>
            <span className="px-1 text-sm text-muted">…</span>
            <button onClick={() => goToPage(totalPages)} className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm text-foreground transition-colors hover:bg-surface">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Halaman berikutnya"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label="Halaman terakhir"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={jumpValue}
          onChange={(e) => setJumpValue(e.target.value)}
          placeholder="No."
          className="h-8 w-16 rounded-md border border-border bg-surface px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button type="submit" className="h-8 rounded-md border border-border px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-surface">
          Go
        </button>
      </form>
    </div>
  );
}