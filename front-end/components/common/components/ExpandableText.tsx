'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type ExpandableTextProps = { text: string; collapsedLines?: number };

export function ExpandableText({ text, collapsedLines = 3 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p className={clsx('text-sm leading-relaxed text-muted sm:text-base', !isExpanded && `line-clamp-${collapsedLines}`)}>
        {text}
      </p>
      <button onClick={() => setIsExpanded((prev) => !prev)} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-accent">
        {isExpanded ? 'Lebih sedikit' : 'Selengkapnya'}
        <ChevronDown className={clsx('h-3.5 w-3.5 transition-transform', isExpanded && 'rotate-180')} />
      </button>
    </div>
  );
}