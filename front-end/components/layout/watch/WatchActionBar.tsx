'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

type WatchActionBarProps = {
  shareUrl: string;
};

export function WatchActionBar({ shareUrl }: WatchActionBarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ url: shareUrl }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2 flex items-center gap-1.5 border-b border-border pb-3">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted transition-colors hover:bg-surface hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
        {copied ? 'Tersalin' : 'Bagikan'}
      </button>
    </div>
  );
}