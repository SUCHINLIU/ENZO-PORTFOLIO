import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AboutOverlay } from './components/AboutOverlay';
import { CommercialOverlay } from './components/CommercialOverlay';
import { PatternOverlay } from './components/PatternOverlay';
import { OtherOverlay } from './components/OtherOverlay';
import { ContactOverlay } from './components/ContactOverlay';
import { RippleEffect } from './components/RippleEffect';
import { CustomCursor } from './components/CustomCursor';
import { RevealWords, PerspectiveReveal } from './components/RevealText';

const textVariants = {
  hidden: { opacity: 0, y: 40, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as any } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.96, ease: [0.22, 1, 0.36, 1] as any } }
};

const containerVariants = {
  hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function App() {
  const [activeModule, setActiveModule] = useState<number>(0); // 0: Home, 1: About, 2: Commercial, 3: Pattern, 4: Other, 5: Contact

  const modules = [
    { id: 'home', name: '首页', en: 'HOME' },
    { id: 'about', name: '个人简介', en: 'ABOUT' },
    { id: 'commercial', name: '商业风格设计', en: 'COMMERCIAL' },
    { id: 'pattern', name: '图案设计', en: 'PATTERN' },
    { id: 'other', name: '其他作品', en: 'OTHERS' },
    { id: 'contact', name: '联系我', en: 'CONTACT' }
  ];

  const handleNext = () => {
    setActiveModule((prev) => (prev + 1) % modules.length);
  };

  const handlePrev = () => {
    setActiveModule((prev) => (prev - 1 + modules.length) % modules.length);
  };

  const isAnyOverlayOpen = activeModule !== 0;

  return (
    <div className="min-h-screen w-full bg-white text-black overflow-hidden font-sans relative grainy-bg cursor-none">
      <CustomCursor />
      
      {/* Background Layer */}
      <motion.div 
        className="fixed inset-0 z-0"
        animate={{ 
          filter: isAnyOverlayOpen ? 'blur(100px) grayscale(0.2)' : 'blur(0px) grayscale(0)',
          scale: isAnyOverlayOpen ? 1.1 : 1,
          opacity: isAnyOverlayOpen ? 0.4 : 1
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
                onClick={() => setActiveModule(1)}
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

      {/* Global Minimalist Navigation - Always Present */}
      <div className="fixed bottom-0 left-0 right-0 z-[160] px-6 py-10 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          {/* Prevent showing Prev on Home if desired, but here we loop or show Home */}
          <button 
            onClick={handlePrev}
            className={`pointer-events-auto group flex flex-col items-start gap-2 transition-all duration-700 ${activeModule === 0 ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
          >
            <span className="mono-label !opacity-30 group-hover:!opacity-100 transition-opacity">PREVIOUS_MODULE</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[0.5px] bg-black/20 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
              <span className="font-serif italic text-base md:text-lg text-black/60 group-hover:text-black transition-colors whitespace-nowrap">
                {activeModule > 0 ? modules[activeModule - 1].name : ''} // {activeModule > 0 ? modules[activeModule - 1].en : ''}
              </span>
            </div>
          </button>

          <button 
            onClick={handleNext}
            className={`pointer-events-auto group flex flex-col items-end gap-2 transition-all duration-700 ${activeModule === modules.length - 1 ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
          >
            <span className="mono-label !opacity-30 group-hover:!opacity-100 transition-opacity text-right">NEXT_MODULE</span>
            <div className="flex items-center gap-3 text-right">
              <span className="font-serif italic text-base md:text-lg text-black/60 group-hover:text-black transition-colors whitespace-nowrap">
                {activeModule < modules.length - 1 ? modules[activeModule + 1].name : ''} // {activeModule < modules.length - 1 ? modules[activeModule + 1].en : ''}
              </span>
              <div className="w-8 h-[0.5px] bg-black/20 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
            </div>
          </button>
        </div>
      </div>

      {/* Ripple trail effect layer - only on home page */}
      {!isAnyOverlayOpen && <RippleEffect />}

      {/* Overlays */}
      <AboutOverlay 
        isOpen={activeModule === 1} 
        onClose={() => setActiveModule(0)} 
        onNext={handleNext}
      />
      <CommercialOverlay 
        isOpen={activeModule === 2} 
        onClose={() => setActiveModule(0)} 
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <PatternOverlay 
        isOpen={activeModule === 3} 
        onClose={() => setActiveModule(0)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <OtherOverlay 
        isOpen={activeModule === 4} 
        onClose={() => setActiveModule(0)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <ContactOverlay 
        isOpen={activeModule === 5} 
        onClose={() => setActiveModule(0)}
        onPrev={handlePrev}
      />
    </div>
  );
}
