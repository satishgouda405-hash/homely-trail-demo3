import { values } from '../data';
import { FadeUp, Eyebrow, Img } from './ui';

export default function ValueProps() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="value-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeUp>
          <Eyebrow>Why Homely Trail</Eyebrow>
        </FadeUp>

        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
          {values.map((v, i) => (
            <FadeUp key={v.index} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-[32px] bg-sand p-7 transition-shadow duration-500 ease-soft hover:shadow-soft sm:p-10">
                {/* Watermark index */}
                <span
                  className="pointer-events-none absolute -top-4 right-5 font-serif text-[110px] leading-none text-ink/[0.045] sm:text-[140px]"
                  aria-hidden="true"
                >
                  {v.index}
                </span>

                <Eyebrow className="text-ink/40">{v.eyebrow}</Eyebrow>

                <h3
                  id={i === 0 ? 'value-heading' : undefined}
                  className="mt-4 font-serif text-[2rem] leading-[1.05] tracking-[-0.025em] sm:text-[2.4rem]"
                >
                  <span className="text-accent">{v.accent}</span>{' '}
                  <span className="text-ink">{v.rest}</span>
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
                  {v.body}
                </p>

                <div className="mt-8 flex items-end gap-4">
                  {v.images.map((img, idx) => (
                    <div
                      key={img.src}
                      className={
                        idx === 0
                          ? 'w-[30%] max-w-[130px] -rotate-6 transition-transform duration-700 ease-soft group-hover:-rotate-3'
                          : 'w-[34%] max-w-[150px] rotate-3 transition-transform duration-700 ease-soft group-hover:rotate-1'
                      }
                    >
                      <Img
                        src={img.src}
                        alt={img.alt}
                        className={
                          idx === 0
                            ? 'aspect-[4/5] rounded-2xl shadow-soft'
                            : 'aspect-[4/5] rounded-2xl shadow-lift'
                        }
                        sizes="150px"
                      />
                    </div>
                  ))}

                  <span className="ml-auto hidden whitespace-nowrap rounded-full border border-ink/10 bg-white/50 px-4 py-2 text-[11px] font-medium text-ink/60 backdrop-blur-sm sm:block">
                    {v.price}
                  </span>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
