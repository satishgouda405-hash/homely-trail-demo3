import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Locations from './components/Locations';
import PropertyCarousel from './components/PropertyCarousel';
import CategoryCards from './components/CategoryCards';
import ValueProps from './components/ValueProps';
import Showcase from './components/Showcase';
import About from './components/About';
import Stories from './components/Stories';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
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
        <Locations />
        <PropertyCarousel />
        <CategoryCards />
        <ValueProps />
        <Showcase />
        <About />
        <Stories />
      </main>

      <Footer />
    </MotionConfig>
  );
}
