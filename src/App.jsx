import { Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import { useIdleReady } from './lib/useIdleReady';

/**
 * `lazySplit` starts the chunk download immediately (in parallel with the hero
 * paint, at low network priority) but keeps the component out of the initial
 * render. Mounting is gated by `useIdleReady` below.
 */
function lazySplit(loader) {
  const promise = loader();
  return lazy(() => promise);
}

const Locations = lazySplit(() => import('./components/Locations'));
const PropertyCarousel = lazySplit(() => import('./components/PropertyCarousel'));
const CategoryCards = lazySplit(() => import('./components/CategoryCards'));
const ValueProps = lazySplit(() => import('./components/ValueProps'));
const Showcase = lazySplit(() => import('./components/Showcase'));
const About = lazySplit(() => import('./components/About'));
const Stories = lazySplit(() => import('./components/Stories'));
const Footer = lazySplit(() => import('./components/Footer'));

export default function App() {
  // Below-the-fold sections mount once the main thread is idle, so the hero
  // paints without waiting for the whole page's markup to be built.
  const ready = useIdleReady();

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <CustomCursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <TrustStrip />
        {ready && (
          <Suspense fallback={null}>
            <Locations />
            <PropertyCarousel />
            <CategoryCards />
            <ValueProps />
            <Showcase />
            <About />
            <Stories />
          </Suspense>
        )}
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </MotionConfig>
  );
}
