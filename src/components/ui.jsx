import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { cx, EASE } from '../lib/utils';
import { useReducedMotion } from '../lib/motion';

/* ------------------------------------------------------------------ */
/* Image                                                               */
/* ------------------------------------------------------------------ */

export function Img({
  src,
  alt = '',
  className,
  imgClassName,
  priority = false,
  sizes,
}) {
  return (
    <div className={cx('relative overflow-hidden bg-sand/60', className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        className={cx('h-full w-full object-cover', imgClassName)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Motion wrappers                                                     */
/* ------------------------------------------------------------------ */

export function FadeUp({
  children,
  delay = 0,
  y = 26,
  className,
  as = 'div',
  once = true,
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, light = false, className }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em]',
        light ? 'text-cream/60' : 'text-ink/70',
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  accent,
  rest,
  href,
  linkLabel,
  right,
  children,
  className,
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className="max-w-2xl">
        <FadeUp>
          <Eyebrow>{eyebrow}</Eyebrow>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 font-serif text-[2rem] leading-[1.06] tracking-[-0.025em] sm:text-5xl sm:leading-[1.04]">
            <WordReveal text={accent} className="text-accent" />
            <span className="inline-block w-[0.24em]" aria-hidden="true" />
            <WordReveal text={rest} className="text-ink" />
          </h2>
        </FadeUp>
        {children}
      </div>

      {right ? (
        <FadeUp delay={0.14}>{right}</FadeUp>
      ) : linkLabel ? (
        <FadeUp delay={0.14} className="shrink-0">
          <a
            href={href}
            className="group inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            {linkLabel}
            <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition-all duration-500 ease-soft group-hover:border-ink group-hover:bg-ink group-hover:text-cream">
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>
        </FadeUp>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rating                                                              */
/* ------------------------------------------------------------------ */

export function Stars({ rating = 5, size = 14, className }) {
  return (
    <span
      className={cx('inline-flex items-center gap-[3px]', className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span
            key={i}
            className="relative block shrink-0"
            style={{ width: size, height: size }}
          >
            <Star
              className="absolute inset-0 text-ink/15"
              style={{ width: size, height: size }}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
              aria-hidden="true"
            >
              <Star
                className="text-accent"
                style={{ width: size, height: size }}
                strokeWidth={1.6}
                fill="currentColor"
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Brand marks                                                         */
/* ------------------------------------------------------------------ */

export function BrandMark({ name, muted = false, className }) {
  const base = cx(
    'inline-flex items-center leading-none transition-opacity duration-500',
    muted && 'opacity-50 hover:opacity-90',
    className
  );

  if (name === 'Google') {
    return (
      <span className={cx(base, 'text-[17px] font-semibold tracking-tight')} aria-label="Google">
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#34A853' }}>l</span>
        <span style={{ color: '#EA4335' }}>e</span>
      </span>
    );
  }

  if (name === 'Airbnb') {
    return (
      <span className={cx(base, 'font-serif text-[19px] tracking-tight')} aria-label="Airbnb">
        airbnb
      </span>
    );
  }

  if (name === 'Booking.com') {
    return (
      <span className={cx(base, 'text-[15px] font-bold tracking-tight')} aria-label="Booking.com">
        Booking<span className="text-accent">.com</span>
      </span>
    );
  }

  return (
    <span className={cx(base, 'text-[16px] font-extrabold tracking-tight')} aria-label="Goibibo">
      goibibo
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Draggable horizontal rail                                           */
/* ------------------------------------------------------------------ */

export const DragRail = forwardRef(function DragRail(
  { children, className, railClassName },
  ref
) {
  const el = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  useImperativeHandle(ref, () => ({
    scrollBy: (delta) =>
      el.current?.scrollBy({ left: delta, behavior: 'smooth' }),
    element: el.current,
  }));

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const node = el.current;
    if (!node) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: node.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    const node = el.current;
    if (!d.active || !node) return;
    const dx = e.clientX - d.startX;

    // Only capture once the pointer has actually travelled — this keeps
    // plain clicks on cards and buttons working normally.
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      try {
        node.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    node.scrollLeft = d.startLeft - dx;
  };

  const end = (e) => {
    drag.current.active = false;
    try {
      el.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    // Swallow the click that ends a drag, then re-enable clicks.
    setTimeout(() => {
      drag.current.moved = false;
    }, 0);
  };

  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={el}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onClickCapture={onClickCapture}
      className={cx(
        'no-scrollbar flex select-none overflow-x-auto pb-6 pt-2 cursor-grab active:cursor-grabbing',
        railClassName
      )}
    >
      {children}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Rail arrows                                                         */
/* ------------------------------------------------------------------ */

export function RailArrows({ target, className }) {
  const nudge = (dir) => target.current?.scrollBy(dir * 360);
  return (
    <div className={cx('flex items-center gap-2', className)}>
      {[-1, 1].map((dir) => (
        <button
          key={dir}
          type="button"
          onClick={() => nudge(dir)}
          aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-soft hover:border-ink hover:bg-ink hover:text-cream active:scale-95"
        >
          <ArrowRight
            size={16}
            className={dir < 0 ? 'rotate-180' : ''}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-linked word reveal                                           */
/* ------------------------------------------------------------------ */

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [16, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="mr-[0.26em] inline-block will-change-transform last:mr-0"
    >
      {children}
    </motion.span>
  );
}

/**
 * Reveals a heading word by word, driven by its own scroll position.
 * Falls back to plain text for reduced-motion users.
 */
export function WordReveal({ text, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.55'],
  });

  if (reduced) {
    return <span className={cx('inline', className)}>{text}</span>;
  }

  const words = text.split(' ');
  return (
    <span ref={ref} className={cx('inline', className)}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Number(v).toFixed(decimals));

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      count.set(to);
      return undefined;
    }
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, reduced, to, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
