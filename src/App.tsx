import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StaggeredMenu } from './components/StaggeredMenu';
import { AboutOverlay } from './components/AboutOverlay';
import { CommercialOverlay } from './components/CommercialOverlay';
import { PatternOverlay } from './components/PatternOverlay';
import { OtherOverlay } from './components/OtherOverlay';
import { ContactOverlay } from './components/ContactOverlay';
import { RippleEffect } from './components/RippleEffect';
import { CustomCursor } from './components/CustomCursor';
import { RevealText, RevealWords, PerspectiveReveal } from './components/RevealText';
import { SafeImage } from './components/SafeImage';
import { useImagePreloader } from './hooks/useImagePreloader';
import { 
  COMMERCIAL_PROJECTS_HERO, 
  COMMERCIAL_PROJECTS_GALLERY,
  OTHER_WORKS_HERO,
  OTHER_WORKS_GALLERY,
  PATTERN_IMAGES
} from './constants/images';

const HERO_IMAGES = [...COMMERCIAL_PROJECTS_HERO, ...OTHER_WORKS_HERO];
const GALLERY_IMAGES = [...COMMERCIAL_PROJECTS_GALLERY, ...OTHER_WORKS_GALLERY, ...PATTERN_IMAGES];

const textVariants = {
  hidden: { opacity: 0, y: 40, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as any } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.96, ease: [0.22, 1, 0.36, 1] as any } }
};

const containerVariants = {
  hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCommercialOpen, setIsCommercialOpen] = useState(false);
  const [isPatternOpen, setIsPatternOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const closeAllOverlays = () => {
    setIsAboutOpen(false);
    setIsCommercialOpen(false);
    setIsPatternOpen(false);
    setIsOtherOpen(false);
    setIsContactOpen(false);
  };

  const isAnyOverlayOpen = isAboutOpen || isCommercialOpen || isPatternOpen || isOtherOpen || isContactOpen;

  // Stage 1: Preload high-priority hero images immediately (after 1s)
  useImagePreloader(HERO_IMAGES, 1000);

  // Stage 2: Preload all gallery and pattern images in background (after 4s)
  useImagePreloader(GALLERY_IMAGES, 4000);

  return (
    <div className="min-h-screen w-full bg-white text-black overflow-hidden font-sans relative grainy-bg cursor-none">
      <CustomCursor />
      
      {/* Background Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        animate={{ 
          filter: isAnyOverlayOpen ? 'blur(100px) grayscale(0.5)' : 'blur(0px) grayscale(0)',
          scale: isAnyOverlayOpen ? 1.2 : 1,
          opacity: isAnyOverlayOpen ? 0.3 : 1
        }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="absolute inset-0 opacity-[0.03] grayscale contrast-125">
          <SafeImage 
            src="https://picsum.photos/seed/tech/1920/1080?grayscale" 
            className="w-full h-full object-cover"
            alt=""
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Main content */}
      <AnimatePresence>
        {!isAnyOverlayOpen && (
          <motion.div 
            key="home-content"
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              variants={textVariants}
              className="mb-6 flex items-center gap-4"
            >
              <div className="w-12 h-px bg-black/10" />
              <span className="mono-label">数字档案 v2.0 // 2023-2025 作品选集</span>
              <div className="w-12 h-px bg-black/10" />
            </motion.div>

            <h1 className="text-[56px] md:text-[100px] font-bold tracking-tight leading-[0.9] text-center flex flex-col items-center">
              <div className="overflow-hidden">
                <PerspectiveReveal 
                  text="ENZO LIU" 
                  className="font-sans text-black" 
                  stagger={0.05}
                />
              </div>
              <div className="overflow-hidden mt-6">
                <RevealWords 
                  text="FASHION ARCHITECTURE" 
                  className="font-mono text-[10px] md:text-[12px] tracking-[0.4em] text-black/40"
                  delay={0.4}
                />
              </div>
            </h1>
            
            <motion.div 
              variants={textVariants}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="px-4 py-1 border-[0.5px] border-black/10 rounded-full">
                <RevealWords text="作品集 // PORTFOLIO" className="font-mono text-xs tracking-widest" delay={0.6} />
              </div>
            </motion.div>

            {/* Explore button */}
            <motion.div
              className="mt-16 pointer-events-auto"
              variants={textVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsAboutOpen(true)}
                className="group relative px-8 py-3 text-[14px] font-normal tracking-[0.4em] uppercase text-[#1a1a1a] transition-all duration-500 overflow-hidden bg-white/10 backdrop-blur-sm border border-black/5 rounded-full hover:bg-black hover:text-white"
              >
                <span className="relative z-10 transition-colors duration-500">点击探索 — EXPLORE</span>
                <motion.div 
                  className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]"
                  style={{ zIndex: 0 }}
                />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple trail effect layer - only on home page */}
      {!isAnyOverlayOpen && <RippleEffect />}

      {/* Overlays */}
      <AboutOverlay 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
        onNext={() => {
          setIsAboutOpen(false);
          setIsCommercialOpen(true);
        }}
      />
      <CommercialOverlay 
        isOpen={isCommercialOpen} 
        onClose={() => setIsCommercialOpen(false)} 
        onPrev={() => {
          setIsCommercialOpen(false);
          setIsAboutOpen(true);
        }}
        onNext={() => {
          setIsCommercialOpen(false);
          setIsPatternOpen(true);
        }}
      />
      <PatternOverlay 
        isOpen={isPatternOpen} 
        onClose={() => setIsPatternOpen(false)}
        onPrev={() => {
          setIsPatternOpen(false);
          setIsCommercialOpen(true);
        }}
        onNext={() => {
          setIsPatternOpen(false);
          setIsOtherOpen(true);
        }}
      />
      <OtherOverlay 
        isOpen={isOtherOpen} 
        onClose={() => setIsOtherOpen(false)}
        onPrev={() => {
          setIsOtherOpen(false);
          setIsPatternOpen(true);
        }}
        onNext={() => {
          setIsOtherOpen(false);
          setIsContactOpen(true);
        }}
      />
      <ContactOverlay 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
        onPrev={() => {
          setIsContactOpen(false);
          setIsOtherOpen(true);
        }}
      />
    </div>
  );
}
