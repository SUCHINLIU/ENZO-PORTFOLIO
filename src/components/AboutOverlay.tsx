import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { RippleEffect } from './RippleEffect';
import { RevealText, RevealWords, PerspectiveReveal } from './RevealText';

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export function AboutOverlay({ isOpen, onClose, onNext }: AboutOverlayProps) {
  const ease: any = [0.28, 0.11, 0.32, 1];
  const containerRef = React.useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nextFooterRef = useRef<HTMLDivElement>(null);

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
          initial={{ opacity: 0, y: '5%', scale: 0.98, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-5%', scale: 0.98, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
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

          {/* Full Width Hero Photo (16:9 Aspect Ratio) */}
          <section className="w-full relative overflow-hidden aspect-video">
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img 
                src="https://picsum.photos/seed/enzo-studio/1920/1080?grayscale" 
                alt="SUCHIN_LIU"
                className="w-full h-full object-cover grayscale contrast-[1.1] opacity-90 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </section>

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

                <div className="grid grid-cols-2 gap-12 pt-8 border-t border-black/5">
                  <div className="space-y-4">
                    <h4 className="mono-label">风格趋向 // STYLE</h4>
                    <p className="font-sans text-xs text-black/60 leading-loose">
                      先锋时尚 / 极简主义 / 新传统主义
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mono-label">期望城市 // EXPECTED CITY</h4>
                    <p className="font-sans text-xs text-black/60 leading-loose">
                      上海 // 杭州
                    </p>
                  </div>
                </div>

                <div className="py-12 border-y border-black/5 space-y-6">
                  <h4 className="mono-label">设计宣言 // MANIFESTO</h4>
                  <p className="font-serif text-xl md:text-2xl text-black leading-relaxed italic opacity-80">
                    <RevealWords text='"我不只是在设计衣服，我是在缔结一种身体与环境的无声契约。在克制的廓形中，保留纤维的温度，在时尚的表象之下，隐藏复杂的叙事。"' delay={0.2} />
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Corner Liquid Glass Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-[120] pointer-events-none">
            <div className="flex justify-between items-end p-4 md:p-6">
              <div 
                ref={footerRef}
                className="pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 flex items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden group"
              >
                <RippleEffect containerRef={footerRef} className="absolute inset-0" zIndex={0} />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                <button 
                  onClick={onClose}
                  className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#555555] transition-colors relative z-10"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-sans text-lg font-medium tracking-tight">首页</span>
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
                  <span className="font-sans text-lg font-medium tracking-tight">商业风格设计</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
