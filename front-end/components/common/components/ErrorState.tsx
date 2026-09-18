'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message = 'Gagal memuat data, coba lagi', onRetry }: ErrorStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
      <AlertTriangle className="h-8 w-8 text-border" strokeWidth={1.5} />
      <p className="text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Coba lagi
        </button>
      )}
    </div>
  );
}