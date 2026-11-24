import { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Youtube, Linkedin, MapPin, Mail } from 'lucide-react';
import { footerColumns, socials } from '../data';
import { Home } from 'lucide-react';

const socialIcons = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  LinkedIn: Linkedin,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative mt-16 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand + newsletter */}
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Homely Trail — back to top">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-cream">
                <Home size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="font-serif text-[19px] font-semibold tracking-tight">
                Homely <span className="text-accent">Trail</span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-cream/50">
              Homestays chosen for the way they feel in the morning. Slow, warm, and
              unmistakably lived in.
            </p>

            <form
              className="mt-7 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  setSent(true);
                  setEmail('');
                  setTimeout(() => setSent(false), 4000);
                }
              }}
            >
              <label htmlFor="newsletter" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/45">
                Get the shortlist
              </label>
              <div className="mt-3 flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 p-1.5 transition-colors duration-300 focus-within:border-accent">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent px-3.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the newsletter"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white transition-all duration-500 ease-soft hover:-translate-y-0.5 hover:bg-[#f08c2e] active:scale-95"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              <p
                className={`mt-2.5 text-[11px] transition-opacity duration-500 ${
                  sent ? 'opacity-100 text-accent' : 'opacity-0'
                }`}
                role="status"
                aria-live="polite"
              >
                You are on the list. First shortlist lands this Friday.
              </p>
            </form>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[13px] text-cream/65 transition-colors duration-300 hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 text-[11px] text-cream/40 sm:flex-row sm:items-center sm:gap-6">
            <span>© 2026 Homely Trail. All rights reserved.</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={11} aria-hidden="true" />
              Mysuru, Karnataka
            </span>
            <a href="mailto:hello@homelytrail.in" className="inline-flex items-center gap-1.5 hover:text-cream">
              <Mail size={11} aria-hidden="true" />
              hello@homelytrail.in
            </a>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => {
              const Icon = socialIcons[s.name];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={`Homely Trail on ${s.name}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/65 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        className="pointer-events-none select-none overflow-hidden pb-4"
        aria-hidden="true"
      >
        <p className="translate-y-6 text-center font-serif text-[15.5vw] leading-[0.8] tracking-[-0.04em] text-cream/[0.045]">
          Homely Trail
        </p>
      </div>
    </footer>
  );
}
