import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X, ArrowUpRight, Home } from 'lucide-react';
import { navLinks } from '../data';
import { cx, EASE } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-soft',
          scrolled ? 'py-2.5' : 'py-4 sm:py-5'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div
            className={cx(
              'flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ease-soft sm:px-4',
              scrolled || open
                ? 'glass'
                : 'border border-transparent bg-transparent'
            )}
          >
            {/* Logo */}
            <a
              href="#top"
              className="group flex items-center gap-2.5 rounded-full"
              aria-label="Homely Trail — back to top"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-cream shadow-soft transition-transform duration-500 ease-soft group-hover:rotate-6">
                <Home size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="font-serif text-[19px] font-semibold tracking-tight">
                Homely <span className="text-accent">Trail</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-[13px] font-medium text-ink/65 transition-colors duration-300 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-500 after:ease-soft hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <a
                href="#stays"
                className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
              >
                Book a Stay
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/60 text-ink transition-colors hover:bg-white md:hidden"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
                <span className="sr-only">{open ? 'Close' : 'Open'} menu</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-cream/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative flex h-full flex-col justify-center px-6"
              aria-label="Mobile"
            >
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-ink/10 py-4 font-serif text-4xl tracking-tight text-ink transition-colors hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight size={22} className="text-ink/30" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
                className="mt-10"
              >
                <a
                  href="#stays"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-between"
                >
                  Book a Stay
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <p className="mt-6 text-center text-xs text-ink/45">
                  120+ curated homestays · 4.9 guest rating
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
