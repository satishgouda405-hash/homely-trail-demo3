import { useEffect, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { platforms, locations } from '../data';
import { unsplash, EASE, cx } from '../lib/utils';
import { useReducedMotion, useFinePointer, useCoarsePointer, useMediaQuery } from '../lib/motion';
import { scrollToTarget } from '../lib/scroll';
import { Img, FadeUp, Eyebrow, BrandMark, Stars, Counter } from './ui';

const heroImage = unsplash('photo-1600585154340-be6161a56a0c', 1200);

/* ------------------------------------------------------------------ */
/* Staggered letter reveal                                             */
/* ------------------------------------------------------------------ */

function Letters({ text, className, delay = 0 }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={cx('inline-block', className)}>{text}</span>;
  }

  return (
    <span className={cx('inline-block', className)} aria-hidden="true">
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span
              key={`${char}-${ci}`}
              className="inline-block will-change-transform"
              style={{ transformPerspective: 700 }}
              initial={{ y: '58%', opacity: 0, rotateX: -55 }}
              animate={{ y: '0%', opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.1, delay: delay + (ci + wi * 4) * 0.034, ease: EASE }}
            >
              {char}
            </motion.span>
          ))}
          {wi < text.split(' ').length - 1 && (
            <span className="inline-block w-[0.24em]" />
          )}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

function SearchField({ icon: Icon, label, children, className }) {
  return (
    <label
      className={cx(
        'group flex flex-1 items-center gap-3 rounded-full px-4 py-3 transition-colors duration-300 hover:bg-white/60 sm:py-2.5',
        className
      )}
    >
      <Icon size={17} className="shrink-0 text-accent" aria-hidden="true" />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/65">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

function SearchBar() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        scrollToTarget('#stays');
      }}
      className="glass flex w-full flex-col gap-1 rounded-[28px] p-2 sm:flex-row sm:items-center sm:rounded-full sm:p-2"
      role="search"
    >
      <SearchField icon={MapPin} label="Location" className="min-w-0">
        <select
          name="location"
          defaultValue=""
          className="w-full truncate bg-transparent text-sm font-medium text-ink outline-none"
          aria-label="Select location"
        >
          <option value="">Anywhere</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </SearchField>

      <span className="mx-1 hidden h-8 w-px shrink-0 bg-ink/10 sm:block" aria-hidden="true" />

      <SearchField icon={Calendar} label="Check-in">
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink outline-none"
          aria-label="Check-in date"
        />
      </SearchField>

      <span className="mx-1 hidden h-8 w-px shrink-0 bg-ink/10 sm:block" aria-hidden="true" />

      <SearchField icon={Calendar} label="Check-out">
        <input
          type="date"
          value={checkOut}
          min={checkIn || today}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-ink outline-none"
          aria-label="Check-out date"
        />
      </SearchField>

      <button
        type="submit"
        className="mt-1 grid h-12 w-full shrink-0 place-items-center gap-2 rounded-full bg-accent text-sm font-semibold text-white transition-all duration-500 ease-soft hover:-translate-y-0.5 hover:bg-[#c96a12] sm:mt-0 sm:h-[52px] sm:w-[52px] sm:gap-0"
        aria-label="Search available stays"
      >
        <Search size={20} aria-hidden="true" />
        <span className="sm:hidden">Search stays</span>
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 120, suffix: '+', decimals: 0, label: 'Curated stays' },
  { value: 4.9, suffix: '', decimals: 1, label: 'Guest rating' },
  { value: 12, suffix: '', decimals: 0, label: 'Cities' },
];

function HeroStats() {
  return (
    <div className="mt-9 flex items-center gap-5 sm:gap-7">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-5 sm:gap-7">
          {i > 0 && <span className="h-9 w-px bg-ink/10" aria-hidden="true" />}
          <div>
            <p className="font-serif text-2xl leading-none tracking-tight">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/65">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const coarse = useCoarsePointer();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 720], [0, -70]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.7 });

  const rotateX = useTransform(sy, [-1, 1], [7, -7]);
  const rotateY = useTransform(sx, [-1, 1], [-9, 9]);
  const shiftX = useTransform(sx, [-1, 1], [-16, 16]);
  const shiftY = useTransform(sy, [-1, 1], [-12, 12]);

  /* Pointer tilt on desktop, device tilt on touch */
  useEffect(() => {
    if (reduced) return undefined;

    if (fine) {
      const onMove = (e) => {
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    }

    if (coarse) {
      const askPermission = async () => {
        try {
          if (
            typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function'
          ) {
            await DeviceOrientationEvent.requestPermission();
          }
        } catch {
          /* permission denied — tilt simply stays off */
        }
      };
      const unlock = () => askPermission();
      window.addEventListener('pointerdown', unlock, { once: true });

      const onOrient = (e) => {
        if (e.gamma == null || e.beta == null) return;
        mx.set(Math.max(-1, Math.min(1, e.gamma / 28)));
        my.set(Math.max(-1, Math.min(1, (e.beta - 40) / 28)));
      };
      window.addEventListener('deviceorientation', onOrient);

      return () => {
        window.removeEventListener('deviceorientation', onOrient);
        window.removeEventListener('pointerdown', unlock);
      };
    }

    return undefined;
  }, [fine, coarse, reduced, mx, my]);

  const tiltStyle = { rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 1100 };

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-20">
      {/* Ambient light — desktop only, the large blurs are costly to rasterise on mobile */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute -top-32 right-[-8%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[90px]" />
        <div className="absolute left-[-12%] top-1/3 h-[420px] w-[420px] rounded-full bg-sand blur-[70px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="lg:flex lg:items-start">
          <div className="relative z-10">
            <FadeUp>
              <Eyebrow>Curated homestays across India</Eyebrow>
            </FadeUp>

            <h1
              aria-label="Feel a Home"
              className="mt-5 font-serif text-[clamp(3.3rem,10vw,9.8rem)] font-medium leading-[1.02] tracking-[-0.04em] lg:whitespace-nowrap"
            >
              <span aria-hidden="true">
                <Letters text="Feel" className="text-accent" delay={0.16} />
                <span className="inline-block w-[0.24em]" />
                <Letters text="a Home" className="text-ink" delay={0.32} />
              </span>
            </h1>

            {/* Static — this block is the LCP element, so it must paint immediately */}
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/70 sm:text-base">
              Handpicked villas, lofts and cottages in the neighbourhoods people actually
              want to live in. Slow mornings, soft light, and a host who remembers your
              name.
            </p>

            <HeroStats />
          </div>

          {/* 3D cutout house */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative z-20 -ml-10 mt-6 hidden min-w-0 flex-1 lg:block"
          >
            {isDesktop && (
            <motion.div
              initial={{ opacity: 0, y: 46, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            >
              <motion.div style={tiltStyle} className="relative will-change-transform">
                <div className={reduced ? '' : 'animate-float'}>
                  <div className="relative h-[clamp(390px,40vw,620px)] w-full">
                  <div className="absolute inset-0 overflow-hidden rounded-b-[40px] rounded-t-[999px] shadow-lift ring-[10px] ring-cream/90">
                    <Img
                      src={heroImage}
                      alt="Modern whitewashed villa with warm lights and a pool at dusk"
                      className="h-full w-full"
                      imgClassName="scale-[1.03]"
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>

                  {/* Floating glass review card */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                    className="glass absolute -left-8 bottom-12 hidden w-[230px] rounded-2xl p-3.5 xl:block"
                  >
                    <div className="flex items-center gap-2.5">
                      <Img
                        src={unsplash('photo-1494790108377-be9c29b29330', 100)}
                        alt="Guest Ananya Rao"
                        className="h-9 w-9 shrink-0 rounded-full"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">Ananya Rao</p>
                        <div className="mt-0.5 flex items-center gap-1">
                          <Stars rating={5} size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="mt-2.5 text-[11px] leading-relaxed text-ink/70">
                      “Felt like coming home, only better.”
                    </p>
                  </motion.div>

                  {/* Floating stat chip */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
                    className="glass absolute right-5 top-16 hidden items-center gap-2 rounded-full px-3.5 py-2 xl:flex"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-cream">
                      <Users size={12} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold">4 guests · 2 beds</span>
                  </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          </motion.div>
        </div>

        {/* Mobile / tablet cutout */}
        {!isDesktop && (
        <FadeUp delay={0.18} className="relative z-20 mt-10 lg:hidden">
          <motion.div style={tiltStyle}>
            <div className={reduced ? '' : 'animate-float'}>
              <div className="overflow-hidden rounded-b-[32px] rounded-t-[999px] shadow-lift ring-8 ring-cream/80">
                <Img
                  src={unsplash('photo-1600585154340-be6161a56a0c', 900)}
                  alt="Modern whitewashed villa with warm lights at dusk"
                  className="aspect-[4/5] w-full"
                  imgClassName="scale-[1.03]"
                  priority
                  sizes="(max-width: 1023px) 90vw, 0px"
                />
              </div>
            </div>
          </motion.div>
          <div className="glass -mt-10 ml-4 flex w-[210px] items-center gap-2.5 rounded-2xl p-3">
            <Img
              src={unsplash('photo-1494790108377-be9c29b29330', 100)}
              alt="Guest Ananya Rao"
              className="h-9 w-9 shrink-0 rounded-full"
            />
            <div>
              <p className="text-xs font-semibold">Ananya Rao</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <Stars rating={5} size={10} />
                <span className="text-[10px] text-ink/50">5.0</span>
              </div>
            </div>
          </div>
        </FadeUp>
        )}

        {/* Search */}
        <FadeUp delay={0.24} className="relative z-30 -mt-4 lg:-mt-12">
          <SearchBar />
        </FadeUp>

        {/* Platform logos */}
        <FadeUp delay={0.34}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:mt-12">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/65">
              Loved by guests on
            </span>
            {platforms.map((p) => (
              <BrandMark key={p.name} name={p.name} muted />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
