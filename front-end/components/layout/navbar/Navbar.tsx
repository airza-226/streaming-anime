'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { NavMenu } from './NavMenu';
import { SearchBar } from './SearchBar';
import { MenuIcon, XIcon } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useOnClickOutside(headerRef, () => setIsMenuOpen(false));
  useEscapeKey(() => setIsMenuOpen(false));
  useLockBodyScroll(isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const handleSearchOpenChange = (open: boolean) => {
    setIsSearchOpen(open);
    if (open) setIsMenuOpen(false);
  };

  return (
   <header
  ref={headerRef}
  className={clsx(
    'sticky top-0 z-50 bg-transparent transition-all duration-300',
    isScrolled ? 'backdrop-blur-md' : 'backdrop-blur-none'
  )}
>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
              isScrolled
                ? 'text-foreground hover:bg-foreground/10'
                : 'text-neutral-300 hover:bg-white/10 hover:text-white'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="inline-flex"
              >
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span
              className={clsx(
                'text-xl font-bold tracking-tight',
                isScrolled ? 'text-foreground' : 'text-white'
              )}
            >
              Nover<span className="text-violet-500">Anime</span>
            </span>
          </Link>
        </div>

        <SearchBar isOpen={isSearchOpen} onOpenChange={handleSearchOpenChange} />
      </nav>

      <NavMenu isOpen={isMenuOpen} onLinkClick={() => setIsMenuOpen(false)} />
    </header>
  );
}