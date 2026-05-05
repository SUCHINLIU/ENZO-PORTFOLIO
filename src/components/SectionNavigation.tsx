import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SectionNavigationProps {
  prevLabel?: string;
  nextLabel?: string;
  onPrev: () => void;
  onNext?: () => void;
  className?: string;
}

export function SectionNavigation({ prevLabel, nextLabel, onPrev, onNext, className = '' }: SectionNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = React.useId();

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[140] pointer-events-none p-4 md:p-8 ${className}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-end">
        {/* Previous Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.8 }}
           className="pointer-events-auto"
        >
          <button
            onClick={onPrev}
            className="group relative flex flex-col items-start gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 overflow-hidden">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-mono text-[9px] text-black/30 tracking-[0.3em] uppercase">Previous</span>
                <span className="font-sans text-xs font-semibold tracking-wider text-black group-hover:pl-1 transition-all duration-300">
                  {prevLabel || '返回 // BACK'}
                </span>
              </div>
            </div>
            
            {/* Textured Underline indicator */}
            <div className="w-0 group-hover:w-full h-[1px] bg-black/20 transition-all duration-700 mt-1 overflow-hidden">
               <div className="w-full h-full tech-grid opacity-50" />
            </div>
          </button>
        </motion.div>

        {/* Next Section indicator/pill (Center) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden md:flex flex-col items-center gap-4"
        >
          <div className="w-px h-12 bg-black/5" />
          <div className="px-5 py-1.5 rounded-full border border-black/5 bg-white/30 backdrop-blur-sm shadow-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" />
            <span className="font-mono text-[9px] text-black/40 tracking-[0.2em] uppercase leading-none">Perspective Studio</span>
          </div>
        </motion.div>

        {/* Next Section */}
        {onNext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pointer-events-auto"
          >
            <button
              onClick={onNext}
              className="group relative flex flex-col items-end gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[9px] text-black/30 tracking-[0.3em] uppercase">Next Chapter</span>
                  <span className="font-sans text-xs font-semibold tracking-wider text-black group-hover:pr-1 transition-all duration-300">
                    {nextLabel || '继续 // CONTINUE'}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 overflow-hidden">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Textured Underline indicator */}
              <div className="w-0 group-hover:w-full h-[1px] bg-black/20 transition-all duration-700 mt-1 overflow-hidden">
                 <div className="w-full h-full tech-grid opacity-50" />
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
