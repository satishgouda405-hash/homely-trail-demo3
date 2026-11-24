/** Shared cubic-bezier used across every motion primitive. */
export const EASE = [0.22, 1, 0.36, 1];

/**
 * Build an optimised Unsplash CDN url from a photo id.
 * @param {string} id e.g. "photo-1600585154340-be6161a56a0c"
 * @param {number} w width in px
 */
export const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** 4200 -> "₹4,200" using Indian digit grouping. */
export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

/** Join truthy class names. */
export const cx = (...args) => args.filter(Boolean).join(' ');
