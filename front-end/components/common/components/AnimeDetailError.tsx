'use client';

import { AlertTriangle } from 'lucide-react';

export default function AnimeDetailError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <AlertTriangle className="h-10 w-10 text-border" strokeWidth={1.5} />
      <p className="text-sm text-foreground">Gagal memuat halaman ini</p>
      <button
        onClick={reset}
        className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
      >
        Coba lagi
      </button>
    </div>
  );
}