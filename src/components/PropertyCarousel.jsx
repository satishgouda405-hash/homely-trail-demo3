import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Users,
  BedDouble,
  Bath,
  Star,
  ArrowRight,
} from 'lucide-react';
import { properties } from '../data';
import { formatINR, EASE } from '../lib/utils';
import { DragRail, RailArrows, SectionHeader, Img } from './ui';

function PropertyCard({ property, index }) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.06, ease: EASE }}
      className="group w-[290px] shrink-0 snap-start rounded-[28px] bg-white p-2.5 shadow-soft transition-all duration-500 ease-soft hover:-translate-y-2 hover:shadow-lift sm:w-[348px]"
    >
      <div className="relative overflow-hidden rounded-[22px]">
        <Img
          src={property.image}
          alt={property.alt}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-[1100ms] ease-soft group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 85vw, 348px"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-ink backdrop-blur-md">
          {property.badge}
        </span>

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
          aria-label={
            saved ? `Remove ${property.title} from wishlist` : `Save ${property.title} to wishlist`
          }
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink backdrop-blur-md transition-all duration-500 ease-soft hover:scale-110 active:scale-95"
        >
          <Heart
            size={16}
            className={saved ? 'fill-accent text-accent' : ''}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="px-2.5 pb-2.5 pt-4">
        <div className="flex items-center gap-1.5">
          <Star size={13} className="fill-accent text-accent" aria-hidden="true" />
          <span className="text-[13px] font-semibold">{property.rating}</span>
          <span className="text-[11px] text-ink/40">({property.reviews} reviews)</span>
        </div>

        <h3 className="mt-1.5 font-serif text-[21px] leading-snug tracking-[-0.01em]">
          {property.title}
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink/50">
          <MapPin size={12} aria-hidden="true" />
          {property.location}
        </p>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-ink/50">
          <span className="flex items-center gap-1">
            <Users size={12} aria-hidden="true" />
            {property.guests}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={12} aria-hidden="true" />
            {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={12} aria-hidden="true" />
            {property.baths}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-ink/[0.07] pt-3.5">
          <div className="min-w-0">
            <span className="block font-serif text-[22px] leading-none tracking-tight">
              {formatINR(property.price)}
            </span>
            <span className="mt-1 block text-[10px] text-ink/40">Per Night + Taxes</span>
          </div>
          <a
            href="#stays"
            aria-label={`Reserve ${property.title}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[11px] font-semibold text-cream transition-all duration-500 ease-soft hover:bg-accent"
          >
            Reserve
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function PropertyCarousel() {
  const railRef = useRef(null);

  return (
    <section id="stays" className="py-16 sm:py-24" aria-labelledby="stays-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Pick Your Stay"
          accent="Homes Picked"
          rest="For Slow Mornings"
          right={
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/35 sm:hidden">
                Drag to explore
              </span>
              <RailArrows target={railRef} />
            </div>
          }
        />
      </div>

      <div className="mx-auto mt-5 max-w-7xl px-5 sm:px-8">
        <DragRail ref={railRef} className="gap-4 sm:gap-5">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </DragRail>
      </div>
    </section>
  );
}
