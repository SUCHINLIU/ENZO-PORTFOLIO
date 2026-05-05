import { useState } from 'react';
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
          <img 
            src="https://picsum.photos/seed/tech/1920/1080?grayscale" 
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </motion.div>

      {/* Main UI Components */}
      <StaggeredMenu 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen}
        onFleetClick={() => {}}
        onAboutClick={() => setIsAboutOpen(true)}
        onCommercialClick={() => setIsCommercialOpen(true)}
        onPatternClick={() => setIsPatternOpen(true)}
        onOtherClick={() => setIsOtherOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

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
              className="mt-20 pointer-events-auto"
              variants={textVariants}
            >
              <button
                onClick={() => setIsAboutOpen(true)}
                className="group flex flex-col items-center gap-4 transition-all duration-700"
              >
                <div className="relative w-px h-16 bg-black/10 overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-black origin-top"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  />
                </div>
                <span className="font-mono text-[9px] tracking-[0.6em] text-black/40 group-hover:text-black group-hover:tracking-[0.8em] transition-all duration-700 uppercase">
                  ENTER_EXPERIENCE
                </span>
                <span className="font-serif italic text-xs text-black/20 group-hover:text-black transition-colors duration-500">探索 — EXPLORE</span>
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
