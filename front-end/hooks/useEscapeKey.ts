import { useEffect } from 'react';

export function useEscapeKey(handler: () => void) {
  useEffect(() => {
    function listener(event: KeyboardEvent) {
      if (event.key === 'Escape') handler();
    }
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handler]);
}