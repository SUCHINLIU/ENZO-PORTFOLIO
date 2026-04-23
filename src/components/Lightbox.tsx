import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LightboxProps {
  images: string[];
  startIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, startIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(startIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] p-4 text-white/50 hover:text-white transition-all hover:scale-110"
              >
                <ChevronLeft size={48} strokeWidth={1.5} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] p-4 text-white/50 hover:text-white transition-all hover:scale-110"
              >
                <ChevronRight size={48} strokeWidth={1.5} />
              </button>
            </>
          )}

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-full max-h-full flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </button>
            
            <div className="relative group overflow-hidden rounded-sm shadow-2xl">
              <SafeImage
                src={images[currentIndex]}
                className="max-w-[90vw] max-h-[80vh] md:max-h-[85vh] object-contain"
                alt={`Image ${currentIndex + 1}`}
              />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="mono-label text-white/70 text-[10px] tracking-[0.4em] uppercase">
                {currentIndex + 1} / {images.length}
              </span>
              <span className="mono-label text-white/20 text-[8px] tracking-widest uppercase hidden md:block">
                使用方向键或按钮进行切换 // USE ARROWS TO NAVIGATE
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
