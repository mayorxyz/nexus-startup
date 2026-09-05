import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import SmoothScroll from "./components/SmoothScroll";
import NoiseOverlay from "./components/NoiseOverlay";
import CustomCursor from "./components/CustomCursor";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Solutions from "./pages/Solutions";
import Company from "./pages/Company";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/company" element={<Company />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <SmoothScroll>
          <div className="relative min-h-screen bg-obsidian text-paper">
            <NoiseOverlay />
            <CustomCursor />
            <AnimatedRoutes />
          </div>
        </SmoothScroll>
      </HashRouter>
    </MotionConfig>
  );
}
