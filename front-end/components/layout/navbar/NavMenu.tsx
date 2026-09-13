'use client';

import { AnimatePresence, motion } from "framer-motion";
import { NavLinks } from './NavLinks';

type NavMenuProps = {
  isOpen: boolean;
  onLinkClick: () => void;
};

export function NavMenu({ isOpen, onLinkClick }: NavMenuProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-x-0 top-full overflow-hidden border-t border-border bg-background md:inset-x-auto md:left-4 md:top-full md:mt-2 md:w-64 md:rounded-xl md:border md:border-border md:bg-surface md:shadow-xl "
        >
          <div className="px-4 py-4 md:p-2">
            <NavLinks onLinkClick={onLinkClick} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}