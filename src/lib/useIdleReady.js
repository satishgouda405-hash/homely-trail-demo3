import { useEffect, useState } from 'react';

/**
 * Returns true once the browser has had a spare moment after first paint.
 *
 * Used to defer the render of below-the-fold sections: their markup (rails of
 * cards, motion wrappers, images) is real DOM-building work that would
 * otherwise sit on the critical path and delay LCP. Because they are offscreen
 * at that point, the deferral is invisible.
 */
export function useIdleReady(timeout = 900) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, [timeout]);

  return ready;
}
