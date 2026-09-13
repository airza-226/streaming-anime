'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchBar({ isOpen, onOpenChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useOnClickOutside(containerRef, () => onOpenChange(false));
  useEscapeKey(() => onOpenChange(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="flex items-center">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="w-50 sm:w-65">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari anime..."
                className="h-10 w-full rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-label="Toggle search"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </div>
  );
}