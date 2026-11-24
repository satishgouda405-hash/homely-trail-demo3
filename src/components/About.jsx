import { ArrowUpRight, Check } from 'lucide-react';
import { FadeUp, Eyebrow, Img } from './ui';

const stats = [
  { value: '9', suffix: 'yrs', label: 'Years' },
  { value: '18k', suffix: '+', label: 'Guests' },
  { value: '12', suffix: '', label: 'Cities' },
];

const points = ['Locally owned homes', 'No hidden fees', 'Human support, 24/7'];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <FadeUp>
            <Eyebrow>About Homely Trail</Eyebrow>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2
              id="about-heading"
              className="mt-4 font-serif text-[2.3rem] leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]"
            >
              <span className="text-accent">Comfortable</span>{' '}
              <span className="text-ink">Stays For Every Kind Of Living</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/60">
              We started with a single apartment in HSR Layout and a stubborn belief:
              that a rented home should feel the way a home does. Nine years later we
              look after 120 houses across twelve cities, each one chosen for its light,
              its quiet, and the person who keeps it.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <ul className="mt-7 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-ink/70">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={11} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.26}>
            <a href="#stories" className="btn-dark mt-9">
              About us
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </FadeUp>

          <FadeUp delay={0.3}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-7">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-serif text-[26px] leading-none tracking-tight sm:text-3xl">
                      {s.value}
                      <span className="text-accent">{s.suffix}</span>
                    </span>
                    <span className="mt-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-ink/40">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        {/* Overlapping photos */}
        <div className="relative h-[440px] sm:h-[520px]">
          <FadeUp className="absolute left-0 top-0 w-[64%]">
            <div className="group overflow-hidden rounded-[32px] shadow-soft">
              <Img
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
                alt="A quiet living room with a low sofa and warm afternoon light"
                className="aspect-[4/5] w-full"
                imgClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-105"
                sizes="(max-width: 1023px) 60vw, 380px"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.12} className="absolute bottom-0 right-0 w-[58%]">
            <div className="group overflow-hidden rounded-[32px] shadow-lift">
              <Img
                src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
                alt="Bedroom with soft linen and a view of the trees"
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-105"
                sizes="(max-width: 1023px) 55vw, 340px"
              />
            </div>
          </FadeUp>

          {/* Floating badge */}
          <FadeUp delay={0.24} className="absolute -left-3 bottom-16 sm:left-6">
            <div className="glass flex items-center gap-3 rounded-2xl p-3 pr-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-serif text-lg text-cream">
                H
              </span>
              <div>
                <p className="text-xs font-semibold">Hosting since 2016</p>
                <p className="mt-0.5 text-[11px] text-ink/50">Mysuru · Karnataka</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.3} className="absolute right-4 top-6 sm:right-8 sm:top-10">
            <div className="rounded-full bg-accent px-4 py-2 text-[11px] font-semibold text-white shadow-soft">
              ★ 4.9 · 1,200+ stays
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
