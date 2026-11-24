import { useRef } from 'react';
import { stories } from '../data';
import { FadeUp, DragRail, RailArrows, SectionHeader, Img, Stars } from './ui';

function StoryCard({ story, index }) {
  return (
    <FadeUp
      delay={index * 0.05}
      className="w-[300px] shrink-0 snap-start sm:w-[350px]"
    >
      <article className="flex h-full flex-col rounded-[28px] border border-ink/[0.05] bg-white p-6 shadow-soft transition-all duration-500 ease-soft hover:-translate-y-2 hover:shadow-lift">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Img
              src={story.avatar}
              alt={`${story.name}, Homely Trail guest`}
              className="h-11 w-11 shrink-0 rounded-full"
              sizes="44px"
            />
            <div>
              <p className="text-sm font-semibold">{story.name}</p>
              <p className="mt-0.5 text-[11px] text-ink/70">{story.date}</p>
            </div>
          </div>
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold text-accent">
            {story.tag}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2.5">
          <Stars rating={story.rating} size={13} />
          <span className="font-serif text-lg font-semibold leading-none">
            {story.rating.toFixed(1)}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="mt-5 block font-serif text-[44px] leading-[0.4] text-accent/25"
        >
          “
        </span>

        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink/65">
          {story.quote}
        </p>

        <p className="mt-5 border-t border-ink/[0.07] pt-4 text-[11px] text-ink/65">
          {story.property}
        </p>
      </article>
    </FadeUp>
  );
}

export default function Stories() {
  const railRef = useRef(null);

  return (
    <section id="stories" className="py-16 sm:py-24" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Our Stories"
          accent="What Guests"
          rest="Remember Most"
          right={<RailArrows target={railRef} />}
        />
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <DragRail ref={railRef} className="gap-4 sm:gap-5">
          {stories.map((story, i) => (
            <StoryCard key={story.name} story={story} index={i} />
          ))}
        </DragRail>

        <div className="mt-2 flex items-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65">
            230+ verified reviews
          </span>
        </div>
      </div>
    </section>
  );
}
