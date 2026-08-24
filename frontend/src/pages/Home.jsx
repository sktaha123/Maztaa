import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Technologies from '../components/sections/Technologies';
import About from '../components/sections/About';
import Process from '../components/sections/Process';
import Portfolio from '../components/sections/Portfolio';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

export function Home() {
  useEffect(() => {
    document.title = 'maztaa — Web Design & High-Performance Development Studio';
  }, []);
  return (
    <div className="bg-[#edf1f8] min-h-screen text-[#111317] selection:bg-neutral-900 selection:text-white relative">
      {/* Subtle Tactile Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <Technologies />
        <About />
        <Process />
        <Portfolio />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}