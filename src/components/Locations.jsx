import { ArrowUpRight } from 'lucide-react';
import { locationChips } from '../data';
import { FadeUp, SectionHeader, Img } from './ui';
import { cx } from '../lib/utils';
import { useReducedMotion } from '../lib/motion';

export default function Locations() {
  const reduced = useReducedMotion();

  return (
    <section id="locations" className="py-16 sm:py-24" aria-labelledby="locations-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Our Locations"
          accent="Stay Where"
          rest="The City Feels Like Home"
          href="#stays"
          linkLabel="View all locations"
        />

        <div className="mt-12 flex flex-wrap items-start gap-3 sm:gap-4">
          {locationChips.map((loc, i) => (
            <FadeUp
              key={loc.name}
              delay={i * 0.05}
              className={cx(
                i % 2 === 1 && 'md:mt-5',
                i % 4 === 3 && 'md:mt-2'
              )}
            >
              <div
                className={reduced ? '' : 'animate-float'}
                style={{
                  animationDelay: `${i * 0.45}s`,
                  animationDuration: `${7 + (i % 4) * 0.9}s`,
                }}
              >
                <a
                  href="#stays"
                  className="group flex items-center gap-3 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-1.5 pr-4 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-cream hover:shadow-lift sm:pr-5"
                >
                  <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Img
                      src={loc.image}
                      alt={loc.alt}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-700 ease-soft group-hover:scale-110"
                    />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[13px] font-semibold sm:text-sm">{loc.name}</span>
                    <span className="mt-0.5 text-[11px] text-ink/70 transition-colors duration-300 group-hover:text-cream/70">
                      {loc.count} stays
                    </span>
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="ml-1 -translate-x-1 opacity-0 transition-all duration-500 ease-soft group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <p className="mt-10 text-center text-xs text-ink/65 sm:text-sm">
            Every neighbourhood is walked, photographed and rated by our team before it
            makes the list.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
