import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { rooms } from '../data';
import { cx } from '../lib/utils';
import { useReducedMotion } from '../lib/motion';
import { scrollToY } from '../lib/scroll';
import { Eyebrow, FadeUp } from './ui';

/* ------------------------------------------------------------------ */
/* One crossfading room layer                                          */
/* ------------------------------------------------------------------ */

function RoomLayer({ progress, index, total, src, sizes, eager = false }) {
  const seg = 1 / total;
  const start = index * seg;
  const end = (index + 1) * seg;
  const first = index === 0;
  const last = index === total - 1;

  const opacity = useTransform(
    progress,
    [
      first ? -1 : start - 0.06,
      first ? 0 : start + 0.06,
      last ? 3 : end - 0.06,
      last ? 4 : end + 0.06,
    ],
    [first ? 1 : 0, 1, 1, last ? 1 : 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden="true">
      <img
        src={src}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Showcase() {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(rooms.length - 1, Math.floor(v * rooms.length));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const photoRotateY = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const photoRotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const photoY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  const jumpToRoom = (i) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const scrollable = wrap.offsetHeight - window.innerHeight;
    scrollToY(top + scrollable * ((i + 0.4) / rooms.length), { duration: 1.1 });
  };

  const room = rooms[active];

  return (
    <section
      id="showcase"
      ref={wrapRef}
      aria-labelledby="showcase-heading"
      className={cx(
        'relative mt-6',
        reduced ? 'h-[190vh]' : 'h-[260vh] sm:h-[320vh]'
      )}
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Crossfading, slowly zooming background */}
        <motion.div
          style={reduced ? undefined : { scale: bgScale }}
          className="absolute inset-0 will-change-transform"
        >
          {rooms.map((r, i) => (
            <RoomLayer
              key={r.name}
              progress={scrollYProgress}
              index={i}
              total={rooms.length}
              src={r.image}
              sizes="100vw"
              eager={false}
            />
          ))}
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-xl py-24">
            <FadeUp>
              <Eyebrow light>Immersive Tour</Eyebrow>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                id="showcase-heading"
                className="mt-4 font-serif text-[2.6rem] leading-[1.03] tracking-[-0.03em] text-cream sm:text-5xl lg:text-[4rem]"
              >
                Step Inside <span className="text-accent">Escapinocle</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/65 sm:text-[15px]">
                A four bedroom home on the edge of the old quarter. Hand-plastered walls,
                a kitchen built for long dinners, and light that moves across the floor
                all day.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div
                className="mt-8 flex flex-wrap gap-2"
                role="tablist"
                aria-label="Choose a room to preview"
              >
                {rooms.map((r, i) => (
                  <button
                    key={r.name}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => jumpToRoom(i)}
                    className={cx(
                      'rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide transition-all duration-500 ease-soft sm:text-xs',
                      active === i
                        ? 'bg-cream text-ink shadow-soft'
                        : 'glass-dark text-cream/60 hover:text-cream'
                    )}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#stays"
                  className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-500 ease-soft hover:-translate-y-0.5 hover:bg-white"
                >
                  View Property
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <span className="font-serif text-sm italic text-cream/55">
                  {String(active + 1).padStart(2, '0')} / {String(rooms.length).padStart(2, '0')}
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Tilted framed photo, rotating in 3D with the scroll */}
          <FadeUp
            delay={0.2}
            className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <motion.div
              style={{
                rotateY: reduced ? 0 : photoRotateY,
                rotateX: reduced ? 0 : photoRotateX,
                y: reduced ? 0 : photoY,
                rotate: 4,
                transformPerspective: 1200,
              }}
              className="rounded-xl bg-white p-2.5 shadow-lift will-change-transform"
            >
              <div
                className="relative h-[300px] w-[230px] overflow-hidden rounded-lg bg-ink/10"
                role="tabpanel"
                aria-live="polite"
              >
                {rooms.map((r, i) => (
                  <RoomLayer
                    key={r.name}
                    progress={scrollYProgress}
                    index={i}
                    total={rooms.length}
                    src={r.card}
                    sizes="230px"
                    eager={i === 0}
                  />
                ))}
                <span className="absolute bottom-2 left-2 rounded-full bg-ink/55 px-2.5 py-1 text-[10px] font-medium text-cream backdrop-blur-md">
                  {room.name} · {room.size}
                </span>
                <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/80 text-ink backdrop-blur-md">
                  <Maximize2 size={12} aria-hidden="true" />
                </span>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
