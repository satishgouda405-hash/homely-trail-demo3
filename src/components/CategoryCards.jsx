import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data';
import { useReducedMotion } from '../lib/motion';
import { DragRail, SectionHeader, Img, FadeUp } from './ui';

function CategoryCard({ cat, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Image travels inside its frame as the card crosses the viewport.
  const y = useTransform(scrollYProgress, [0, 1], ['-11%', '11%']);

  return (
    <FadeUp delay={index * 0.05} className="shrink-0">
      <a
        ref={ref}
        href="#stays"
        className="group relative block h-[360px] w-[240px] overflow-hidden rounded-[32px] shadow-soft transition-all duration-500 ease-soft hover:-translate-y-2 hover:shadow-lift sm:h-[420px] sm:w-[290px]"
      >
        <motion.div
          style={reduced ? undefined : { y }}
          className="absolute inset-[-12%] will-change-transform"
        >
          <Img
            src={cat.image}
            alt={cat.alt}
            className="h-full w-full"
            imgClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-110"
            sizes="(max-width: 640px) 240px, 290px"
          />
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-500"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-serif text-[26px] leading-[1.05] tracking-[-0.01em] sm:text-[30px]">
            <span className="text-accent">{cat.accent}</span>{' '}
            <span className="text-cream">{cat.rest}</span>
          </p>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[11px] font-medium text-cream/60">{cat.count} stays</span>
            <span className="grid h-8 w-8 translate-y-1 place-items-center rounded-full border border-cream/25 text-cream opacity-0 transition-all duration-500 ease-soft group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

export default function CategoryCards() {
  return (
    <section
      id="properties"
      className="relative py-16 sm:py-24"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Browse By Mood"
          accent="Find The"
          rest="Space That Fits"
          href="#stays"
          linkLabel="Explore categories"
        />
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8 lg:mt-14">
        <DragRail className="gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.accent + cat.rest} cat={cat} index={i} />
          ))}
        </DragRail>
      </div>
    </section>
  );
}
