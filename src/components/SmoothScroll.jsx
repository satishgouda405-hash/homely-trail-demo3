import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../lib/motion';
import { lenisRef, scrollToTarget } from '../lib/scroll';

/**
 * Lenis smooth scrolling + delegated anchor handling.
 * Disabled entirely for users who prefer reduced motion.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    let lenis;
    let raf = 0;
    let cancelled = false;

    // Wait until the browser is idle so smooth scrolling never competes with
    // hydration and first paint.
    const start = () => {
      if (cancelled) return;
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const idle =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(start, { timeout: 600 })
        : window.setTimeout(start, 120);

    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.button !== 0) return;
      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el, { offset: -92, duration: 1.3 });
      history.replaceState(null, '', href);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
