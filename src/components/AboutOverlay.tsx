import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { RippleEffect } from './RippleEffect';
import { RevealText, RevealWords, PerspectiveReveal } from './RevealText';

import { SafeImage } from './SafeImage';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export function AboutOverlay({ isOpen, onClose, onNext }: AboutOverlayProps) {
  const ease: any = [0.28, 0.11, 0.32, 1];
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      containerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={containerRef}
          className="fixed inset-0 z-[110] overflow-y-auto custom-scrollbar grainy-bg"
          initial={{ opacity: 0, scale: 1.05, clipPath: 'inset(10% 10% 10% 10% round 40px)' }}
          animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
          exit={{ opacity: 0, scale: 0.95, clipPath: 'inset(10% 10% 10% 10% round 40px)' }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Header */}
          <div className="sticky top-0 z-[120] bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-6 md:px-12 border-b-[0.5px] border-black/10">
            <div className="flex items-center gap-6">
              <span className="mono-label">索引目录 // 01</span>
              <h2 className="font-serif text-lg italic text-black">个人简介 // BIOGRAPHY</h2>
            </div>
            <button 
              onClick={onClose}
              className="px-6 py-1 text-[10px] font-sans border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              关闭会话 // CLOSE
            </button>
          </div>

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-40">
            <div className="space-y-16">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-16"
              >
                <div className="space-y-8">
                  <h3 className="font-serif text-4xl md:text-5xl font-light italic leading-[1.2] text-[#1a1a1a]">
                    <PerspectiveReveal text="以创新重构旧物叙事，" delay={0.2} />
                    <br />
                    <PerspectiveReveal text="让衣物与万物共生。" delay={0.5} />
                  </h3>
                  <p className="font-sans text-base md:text-lg text-[#555555] leading-relaxed font-light tracking-wide">
                    <RevealWords text="ENZO_LIU 致力于在极简秩序、民族记忆与街头能量场的三重交汇处，探索先锋表达与可持续路径的共存可能。以数字化语言拆解并重组传统廓形，在结构留白与仪式感细节之间寻找当代的节奏。试图让服装成为身体与自然、个体与社群之间的一种温和接口，探讨在流动的现实中，人与环境如何重新建立彼此尊重的共生方式。" delay={0.8} />
                  </p>
                </div>

                <div className="pt-8 border-t border-black/5">
                  <div className="space-y-4">
                    <h4 className="mono-label">风格趋向 // STYLE</h4>
                    <p className="font-sans text-xs text-black/60 leading-loose">
                      先锋时尚 / 极简主义 / 新传统主义
                    </p>
                  </div>
                </div>

                <div className="py-12 border-y border-black/5 space-y-6">
                  <h4 className="mono-label">设计宣言 // MANIFESTO</h4>
                  <p className="font-serif text-xl md:text-2xl text-black leading-relaxed italic opacity-80">
                    <RevealWords text='"我关注一件衣服的起点——面料的触感、结构的秩序、穿着者与日常的关系。"' delay={0.2} />
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Minimalist Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-[120] px-6 py-10 md:px-12 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-end">
              <button 
                onClick={onClose}
                className="pointer-events-auto group flex flex-col items-start gap-2"
              >
                <span className="mono-label !opacity-30 group-hover:!opacity-100 transition-opacity">PREVIOUS_MODULE</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[0.5px] bg-black/20 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
                  <span className="font-serif italic text-lg text-black/60 group-hover:text-black transition-colors">首页 // HOME</span>
                </div>
              </button>

              <button 
                onClick={onNext}
                className="pointer-events-auto group flex flex-col items-end gap-2"
              >
                <span className="mono-label !opacity-30 group-hover:!opacity-100 transition-opacity text-right">NEXT_MODULE</span>
                <div className="flex items-center gap-3 text-right">
                  <span className="font-serif italic text-lg text-black/60 group-hover:text-black transition-colors">商业风格设计 // COMMERCIAL</span>
                  <div className="w-8 h-[0.5px] bg-black/20 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
