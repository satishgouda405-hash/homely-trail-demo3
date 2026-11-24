import { platforms } from '../data';
import { FadeUp, BrandMark, Stars, Eyebrow } from './ui';

export default function TrustStrip() {
  return (
    <section className="relative py-14 sm:py-20" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <FadeUp className="shrink-0 lg:max-w-[300px]">
            <Eyebrow>Guest Love</Eyebrow>
            <h2
              id="trust-heading"
              className="mt-4 font-serif text-[1.7rem] leading-[1.15] tracking-[-0.02em] sm:text-3xl"
            >
              <span className="text-accent">Loved By</span>{' '}
              <span className="text-ink">Guests Across Platforms</span>
            </h2>
          </FadeUp>

          <div className="grid flex-1 grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
            {platforms.map((p, i) => (
              <FadeUp key={p.name} delay={0.06 * i}>
                <div className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-ink/[0.06] bg-white/55 p-4 backdrop-blur-sm transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-ink/10 hover:bg-white hover:shadow-soft sm:p-5">
                  <BrandMark name={p.name} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Stars rating={p.rating} size={11} />
                      <span className="text-xs font-semibold text-ink">{p.rating}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-ink/45">{p.reviews} reviews</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
