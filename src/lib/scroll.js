/**
 * Single place that knows how to scroll the page.
 * Uses Lenis when it is running, otherwise falls back to the native API
 * (reduced-motion users and no-JS boundaries).
 */
export const lenisRef = { current: null };

export function scrollToTarget(target, { offset = -96, duration = 1.2 } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset, duration });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToY(y, { duration = 1.2 } = {}) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(y, { duration });
    return;
  }
  window.scrollTo({ top: y, behavior: 'smooth' });
}
