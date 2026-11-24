import { useEffect, useState } from 'react';

/** Subscribe to a CSS media query. SSR-safe (defaults to false). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

export const useFinePointer = () =>
  useMediaQuery('(hover: hover) and (pointer: fine)');

export const useCoarsePointer = () =>
  useMediaQuery('(hover: none) and (pointer: coarse)');
