import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { RippleEffect } from './RippleEffect';
import { RevealText, RevealWords } from './RevealText';
import { SafeImage } from './SafeImage';

interface PatternOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const patternFiles = [
  'TA1-1.png', 'TA1-2.png', 'TA1-3.jpg', 'TA1-4.jpg', 'TA1-5.png',
  'TA2-1.jpg', 'TA2-2.jpg', 'TA2-3.jpg', 'TA2-4.jpg', 'TA2-5.jpg',
  'TA3-1.jpg', 'TA3-2.jpg', 'TA3-3.jpg', 'TA3-4.jpg', 'TA3-5.jpg',
  'TA4-1.png', 'TA4-2.jpg', 'TA5-3.jpg', 'TA5-4.jpg', 'TA5-5.jpg',
  'TA5-1.jpg', 'TA5-2.jpg', 'TA4-3.jpg', 'TA4-4.jpg', 'TA4-5.jpg'
];

const patterns = patternFiles.map((filename, i) => ({
  id: (i + 1).toString().padStart(2, '0'),
  image: `https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/${filename}`,
  originalFilename: filename
}));

export function PatternOverlay({ isOpen, onClose, onPrev, onNext }: PatternOverlayProps) {
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nextFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  const handlePatternClick = (index: number) => {
    setSelectedPattern(index);
  };

  const closeDetail = () => {
    setSelectedPattern(null);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPattern !== null) {
      setSelectedPattern((prev) => (prev! + 1) % patterns.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPattern !== null) {
      setSelectedPattern((prev) => (prev! - 1 + patterns.length) % patterns.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPattern === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeDetail();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPattern]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={containerRef}
          className="fixed inset-0 z-[110] overflow-y-auto custom-scrollbar grainy-bg bg-white"
          initial={{ opacity: 0, y: '5%', scale: 0.98, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-5%', scale: 0.98, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
        >
          {/* Header */}
          <div className="sticky top-0 z-[120] bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-6 md:px-12 border-b-[0.5px] border-black/10">
            <div className="flex items-center gap-8">
              <button 
                onClick={onPrev}
                className="group flex items-center gap-3 text-black hover:opacity-60 transition-opacity"
              >
                <ArrowLeft size={16} />
                <span className="mono-label !opacity-100 uppercase tracking-[0.2em]">返回上级 // RETURN</span>
              </button>
              <div className="flex items-center gap-6">
                <span className="mono-label">数字档案 // 03</span>
                <h2 className="font-serif text-lg italic text-black">图案研究 // PATTERN RESEARCH</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="px-6 py-1 text-[10px] font-sans border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              关闭会话 // CLOSE
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-16">
              {patterns.map((pattern, index) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 5) * 0.05, duration: 0.8 }}
                  onClick={() => handlePatternClick(index)}
                  className="group cursor-pointer space-y-4"
                >
                  <div className="flex justify-between items-start border-t border-black/5 pt-4">
                    <span className="font-mono text-[32px] md:text-[44px] font-light text-black/10 group-hover:text-black transition-colors duration-500">
                      {pattern.id}
                    </span>
                  </div>
                  
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <SafeImage 
                      src={pattern.image} 
                      alt=""
                      className="w-full h-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enlarge Modal (释放出来放大) */}
          <AnimatePresence>
            {selectedPattern !== null && (
              <div 
                className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                onClick={closeDetail}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-md"
                />
                
                {/* Navigation Controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[220] p-4 text-black/20 hover:text-black transition-all hover:scale-110"
                >
                  <ChevronLeft size={48} strokeWidth={1} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[220] p-4 text-black/20 hover:text-black transition-all hover:scale-110"
                >
                  <ChevronRight size={48} strokeWidth={1} />
                </button>

                {/* Auto-fit Container matching viewport size */}
                <motion.div 
                  key={selectedPattern}
                  layoutId={selectedPattern !== null ? `pattern-${patterns[selectedPattern].id}` : undefined}
                  className="relative max-w-[90vw] max-h-[90vh] z-[210] flex items-center justify-center"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeDetail}
                    className="absolute -top-12 right-0 text-black/50 hover:text-black transition-colors p-2 z-[220]"
                  >
                    <X size={32} />
                  </button>
                  <SafeImage 
                    src={patterns[selectedPattern].image} 
                    alt="" 
                    className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <span className="mono-label text-black/40 text-[9px] tracking-[0.4em] uppercase">
                      {selectedPattern + 1} / {patterns.length}
                    </span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Corner Liquid Glass Navigation (Only show in directory view) */}
          {selectedPattern === null && (
            <div className="fixed bottom-0 left-0 right-0 z-[120] pointer-events-none">
              <div className="flex justify-between items-end p-4 md:p-6">
                <div 
                  ref={footerRef}
                  className="pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 flex items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden group"
                >
                  <RippleEffect containerRef={footerRef} className="absolute inset-0" zIndex={0} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <button 
                    onClick={onPrev}
                    className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#555555] transition-colors relative z-10"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-sans text-lg font-medium tracking-tight">商业风格设计</span>
                  </button>
                </div>

                <div 
                  ref={nextFooterRef}
                  className="pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 flex items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden group"
                >
                  <RippleEffect containerRef={nextFooterRef} className="absolute inset-0" zIndex={0} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <button 
                    onClick={onNext}
                    className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#555555] transition-colors relative z-10"
                  >
                    <span className="font-sans text-lg font-medium tracking-tight">其他创意作品</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
