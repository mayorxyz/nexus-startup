import { MotionConfig } from "framer-motion";
import Orbs from "./components/Orbs";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesGrid from "./components/FeaturesGrid";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import CTAStrip from "./components/CTAStrip";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* no opaque wrapper bg here — the fixed z-(-1) orbs paint above the body canvas and below content */}
      <div className="relative min-h-screen font-sans text-ink antialiased">
        <Orbs />
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesGrid />
          <PricingSection />
          <FAQSection />
          <CTAStrip />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
