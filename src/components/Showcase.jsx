import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { rooms } from '../data';
import { EASE, cx } from '../lib/utils';
import { Eyebrow, FadeUp } from './ui';

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(
      () => setActive((a) => (a + 1) % rooms.length),
      5200
    );
    return () => clearInterval(id);
  }, [paused]);

  const room = rooms[active];

  return (
    <section
      id="showcase"
      className="relative mt-6 h-[92vh] min-h-[620px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-labelledby="showcase-heading"
    >
      {/* Crossfading background */}
      <AnimatePresence initial={false}>
        <motion.img
          key={room.name}
          src={room.image}
          alt={room.alt}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Gradients */}
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

          {/* Room switcher */}
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
                  aria-controls={`room-panel-${i}`}
                  id={`room-tab-${i}`}
                  onClick={() => setActive(i)}
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

        {/* Tilted framed photo */}
        <FadeUp
          delay={0.2}
          className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <div className="rotate-[5deg] rounded-xl bg-white p-2.5 shadow-lift transition-transform duration-700 ease-soft hover:rotate-[2deg]">
            <div
              className="relative h-[300px] w-[230px] overflow-hidden rounded-lg bg-ink/10"
              role="tabpanel"
              id={`room-panel-${active}`}
              aria-labelledby={`room-tab-${active}`}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={room.name}
                  src={room.image}
                  alt={room.alt}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute bottom-2 left-2 rounded-full bg-ink/55 px-2.5 py-1 text-[10px] font-medium text-cream backdrop-blur-md">
                {room.name} · {room.size}
              </span>
              <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/80 text-ink backdrop-blur-md">
                <Maximize2 size={12} aria-hidden="true" />
              </span>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Bottom scroll hint */}
    </section>
  );
}
