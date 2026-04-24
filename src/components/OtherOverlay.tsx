import React, { useRef, useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { RippleEffect } from './RippleEffect';
import { RevealText, RevealWords } from './RevealText';
import { Lightbox } from './Lightbox';
import { FlipBook } from './FlipBook';
import { SafeImage } from './SafeImage';

interface OtherOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const otherWorks = [
  {
    id: '01',
    title: '视觉排版与编辑设计',
    category: '视觉排版 / Typography',
    image: 'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ1.jpg',
    description: '探索字体、网格与空间的实验性排版。将时装的结构感延伸至平面视觉，构建强烈的视觉冲击力。',
    fullDescription: '这一系列作品致力于打破传统的平面排版规则，通过对字体的结构、比例以及负空间的深度研究，创造出一种具有建筑美感的视觉语言。',
    gallery: [
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ5.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ6.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ7.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ8.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ9.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ10.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ11.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ12.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ13.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/ZJ14.jpg'
    ]
  },
  {
    id: '02',
    title: '创意概念设计',
    category: '创意设计 / Creative',
    image: 'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B1%E4%B8%BB%E5%9B%BE.png',
    description: '跳脱商业设计，直抒内心世界、情绪化的创意设计。结合非传统设计手法以及工艺，打造更具先锋概念的设计。',
    fullDescription: '创意概念设计是我们探索未来时尚形态的实验室。我们不局限于单一的媒介，而是通过跨界的思维，将抽象的艺术概念转化为可感知的时尚叙事。通过对材料的综合应用，构建出极具未来感的视觉场域。',
    series: [
      {
        title: '系列 A // 独白.悲喜自渡',
        subtitle: '将焦虑过程可视化，从压力到自渡，拒绝妥协，爱自己是答案。',
        hero: 'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B1%E4%B8%BB%E5%9B%BE.png',
        gallery: [
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B11-1.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B11-2.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B12-1.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B12-2.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B12-3.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B12-4.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B13-1.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B13-2.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B13-3.jpg'
        ]
      },
      {
        title: '系列 B // SHUANGSHENG',
        subtitle: '冬季废土与解构主义视觉实验',
        hero: 'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B2%E9%A6%96%E5%9B%BE.png',
        gallery: [
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B22-1.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B22-2.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B21-1.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B21-2.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B21-3.jpg',
          'https://raw.githubusercontent.com/SUCHINLIU/enzo-portfolio-mini/main/B21-4.jpg'
        ]
      }
    ]
  }
];

export function OtherOverlay({ isOpen, onClose, onPrev, onNext }: OtherOverlayProps) {
  const id = useId();
  const [view, setView] = useState<'directory' | 'detail'>('directory');
  const [selectedWork, setSelectedWork] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nextFooterRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ images: string[], index: number } | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, view, selectedWork]);

  const handleWorkClick = (index: number) => {
    setSelectedWork(index);
    setView('detail');
  };

  const handleBackToDirectory = () => {
    setView('directory');
  };

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
            <div className="flex items-center gap-8">
              <button 
                onClick={view === 'detail' ? handleBackToDirectory : onPrev}
                className="group flex items-center gap-3 text-black hover:opacity-60 transition-opacity"
              >
                <ArrowLeft size={16} />
                <span className="mono-label !opacity-100 uppercase tracking-[0.2em]">返回上级 // RETURN</span>
              </button>
              <div className="flex items-center gap-6">
                <span className="mono-label">数字档案 // 04</span>
                <h2 className="font-serif text-lg italic text-black">其他创意 // EXPLORATION</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="px-6 py-1 text-[10px] font-sans border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              关闭会话 // CLOSE
            </button>
          </div>

          <AnimatePresence mode="wait">
            {view === 'directory' ? (
              <motion.div 
                key="directory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto px-6 py-20 md:py-32"
              >
                <div className="space-y-32">
                  {otherWorks.map((work, index) => (
                    <div 
                      key={`${id}-work-directory-item-${work.id}`} 
                      onClick={() => handleWorkClick(index)}
                      className={`grid grid-cols-1 md:grid-cols-2 gap-24 items-center cursor-pointer group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className={`space-y-12 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <div className="space-y-4">
                          <span className="font-sans text-[10px] font-medium text-[#86868b] uppercase tracking-[0.4em]">
                            <RevealText text={work.category} />
                          </span>
                          <h3 className="font-serif text-4xl md:text-5xl italic text-[#1a1a1a] leading-tight group-hover:opacity-60 transition-opacity">
                            <RevealWords text={work.title} delay={0.2} />
                          </h3>
                        </div>
                        <p className="font-sans text-base md:text-lg text-[#555555] leading-relaxed max-w-md font-light">
                          <RevealWords text={work.description} delay={0.4} />
                        </p>
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-[-10px] group-hover:translate-x-0">
                          <span className="font-sans text-[10px] font-medium text-[#1a1a1a] uppercase tracking-[0.3em]">探索更多 // EXPLORE</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                      <div className={`relative aspect-[4/5] overflow-hidden rounded-sm grayscale opacity-90 contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <SafeImage 
                          src={work.image} 
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key={`detail-${selectedWork}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
                className="w-full min-h-screen bg-white"
              >
                {/* Back Button */}
                <div className="sticky top-[80px] z-[130] px-6 py-4 max-w-7xl mx-auto w-full">
                  <button 
                    onClick={handleBackToDirectory}
                    className="flex items-center gap-2 text-[#86868b] hover:text-[#1a1a1a] transition-colors font-sans text-[10px] font-medium uppercase tracking-[0.2em]"
                  >
                    <ArrowLeft size={12} />
                    <span>退出阅读 // CLOSE BOOK</span>
                  </button>
                </div>

                {/* Conditional Rendering: FlipBook for Typography, Standard for others */}
                {selectedWork === 0 ? (
                  <div className="flex flex-col">
                    {/* Intro */}
                    <div className="max-w-6xl mx-auto px-6 py-20 text-center space-y-8">
                       <span className="font-mono text-[10px] tracking-[0.5em] text-black/40 uppercase">TYPOGRAPHY ARCHIVE 01</span>
                       <h2 className="font-serif text-5xl md:text-7xl italic text-black leading-tight">视觉排版与编辑设计</h2>
                       <p className="font-sans text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto font-light">
                         {otherWorks[0].fullDescription}
                       </p>
                       <div className="w-12 h-px bg-black mx-auto" />
                    </div>

                    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 bg-[#f4f4f4] border-y border-black/5">
                      <FlipBook 
                        images={otherWorks[0].gallery} 
                        onImageClick={(src) => {
                          const idx = otherWorks[0].gallery.indexOf(src);
                          setLightbox({ images: otherWorks[0].gallery, index: idx });
                        }}
                      />
                    </div>
                  </div>
                ) : selectedWork === 1 ? (
                  <div className="flex flex-col">
                    {/* Intro */}
                    <div className="max-w-6xl mx-auto px-6 py-20 text-center space-y-8">
                       <span className="font-mono text-[10px] tracking-[0.5em] text-black/40 uppercase">CONCEPTUAL EXPLORATION 02</span>
                       <h2 className="font-serif text-5xl md:text-7xl italic text-black leading-tight">创意概念设计</h2>
                       <div className="w-12 h-px bg-black mx-auto" />
                    </div>

                    {otherWorks[1].series?.map((s, idx) => (
                      <div key={`${id}-series-container-${idx}`} className="mb-40 last:mb-0">
                        {/* Series Hero */}
                        <section className="w-full aspect-video relative overflow-hidden bg-black/5 mb-16 px-6">
                           <div className="w-full h-full relative overflow-hidden rounded-sm">
                             <motion.div 
                               initial={{ scale: 1.1 }}
                               whileInView={{ scale: 1 }}
                               transition={{ duration: 2 }}
                               className="w-full h-full"
                             >
                                <SafeImage 
                                  src={s.hero} 
                                  className="w-full h-full object-cover opacity-90 transition-all duration-1000"
                                  referrerPolicy="no-referrer"
                                />
                             </motion.div>
                             <div className="absolute inset-0 bg-black/10" />
                             <div className="absolute bottom-12 left-12 space-y-2 pointer-events-none">
                               <h3 className="font-serif text-3xl italic text-white drop-shadow-sm">{s.title}</h3>
                               <p className="font-sans text-[10px] tracking-[0.2em] text-white/60 uppercase">{s.subtitle}</p>
                             </div>
                           </div>
                        </section>

                        {/* Series Grid */}
                        <div className="max-w-7xl mx-auto px-6 space-y-8 md:space-y-12">
                           {s.title.includes('系列 A') ? (
                             <div className="flex flex-col gap-8 md:gap-12">
                               {/* Row 1: Two 16:9 images */}
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                 {s.gallery.slice(0, 2).map((img, i) => (
                                   <motion.div 
                                     key={`${id}-series-a-row1-${i}`}
                                     initial={{ opacity: 0, y: 30 }}
                                     whileInView={{ opacity: 1, y: 0 }}
                                     viewport={{ once: true }}
                                     className="aspect-[16/9] overflow-hidden rounded-sm opacity-80 hover:opacity-100 transition-all duration-1000 shadow-sm cursor-zoom-in"
                                     onClick={() => setLightbox({ images: s.gallery, index: i })}
                                   >
                                     <SafeImage src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                   </motion.div>
                                 ))}
                               </div>

                               {/* Row 2 & 3: Maintained 3:4 Ratio with Aligned Edges */}
                               <div className="space-y-4 md:space-y-8">
                                 {/* Row 2: 4 items - Strict 3:4 */}
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                                    {s.gallery.slice(2, 6).map((img, i) => (
                                      <motion.div 
                                        key={`${id}-series-a-row2-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="aspect-[3/4] overflow-hidden rounded-sm opacity-80 hover:opacity-100 transition-all duration-1000 shadow-sm cursor-zoom-in"
                                        onClick={() => setLightbox({ images: s.gallery, index: i + 2 })}
                                      >
                                        <SafeImage src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                      </motion.div>
                                    ))}
                                  </div>

                                 {/* Row 3: 3 items - Strict 3:4, Aligned with Outer Edges */}
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                                    {s.gallery.slice(6, 9).map((img, i) => (
                                      <motion.div 
                                        key={`${id}-series-a-row3-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="aspect-[3/4] overflow-hidden rounded-sm opacity-80 hover:opacity-100 transition-all duration-1000 shadow-sm cursor-zoom-in"
                                        onClick={() => setLightbox({ images: s.gallery, index: i + 6 })}
                                      >
                                        <SafeImage src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                      </motion.div>
                                    ))}
                                  </div>
                               </div>
                             </div>
                           ) : s.title.includes('系列 B') ? (
                             <div className="flex flex-col gap-8 md:gap-12">
                               {/* Row 1: Two 16:9 images */}
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                 {s.gallery.slice(0, 2).map((img, i) => (
                                   <motion.div 
                                     key={`${id}-series-b-row1-${i}`}
                                     initial={{ opacity: 0, y: 30 }}
                                     whileInView={{ opacity: 1, y: 0 }}
                                     viewport={{ once: true }}
                                     className="aspect-[16/9] overflow-hidden rounded-sm opacity-80 hover:opacity-100 transition-all duration-1000 shadow-sm cursor-zoom-in"
                                     onClick={() => setLightbox({ images: s.gallery, index: i })}
                                   >
                                     <SafeImage src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                   </motion.div>
                                 ))}
                               </div>
                               {/* Row 2: Four 3:4 images */}
                               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                 {s.gallery.slice(2, 6).map((img, i) => (
                                   <motion.div 
                                     key={`${id}-series-b-row2-${i}`}
                                     initial={{ opacity: 0, y: 30 }}
                                     whileInView={{ opacity: 1, y: 0 }}
                                     viewport={{ once: true }}
                                     className="aspect-[3/4] overflow-hidden rounded-sm opacity-80 hover:opacity-100 transition-all duration-1000 shadow-sm cursor-zoom-in"
                                     onClick={() => setLightbox({ images: s.gallery, index: i + 2 })}
                                   >
                                     <SafeImage src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                   </motion.div>
                                 ))}
                               </div>
                             </div>
                           ) : (
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {s.gallery.map((img, i) => (
                                  <motion.div 
                                    key={`${id}-series-fallback-item-${i}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (i % 4) * 0.1, duration: 1 }}
                                    className="aspect-[3/4] overflow-hidden rounded-sm grayscale contrast-[1.05] opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 shadow-sm cursor-zoom-in"
                                    onClick={() => setLightbox({ images: s.gallery, index: i })}
                                  >
                                    <SafeImage 
                                      src={img} 
                                      alt={`Series ${idx} Image ${i}`}
                                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                      referrerPolicy="no-referrer"
                                    />
                                  </motion.div>
                                ))}
                             </div>
                           )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="py-40 text-center">
                       <span className="font-mono text-[9px] tracking-[0.5em] text-black/20 uppercase">END OF CONCEPT ARCHIVE</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-24 pb-32">
                    {/* Full Width Hero Banner (16:9) */}
                    <section className="w-full aspect-video relative overflow-hidden bg-black/5">
                      <motion.div 
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                      >
                        <SafeImage 
                          src={otherWorks[selectedWork].image} 
                          alt={otherWorks[selectedWork].title}
                          className="w-full h-full object-cover grayscale contrast-[1.1] opacity-90 transition-all duration-1000 hover:grayscale-0 cursor-zoom-in"
                          referrerPolicy="no-referrer"
                          onClick={() => {
                            const gallery = [otherWorks[selectedWork].image, ...otherWorks[selectedWork].gallery];
                            setLightbox({ images: gallery, index: 0 });
                          }}
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-black/10" />
                    </section>

                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24">
                      <div className="space-y-16">
                        <div className="space-y-4">
                          <span className="font-sans text-[10px] font-medium text-[#86868b] uppercase tracking-[0.4em]">
                            <RevealText text={otherWorks[selectedWork].category} />
                          </span>
                          <h2 className="font-serif text-5xl md:text-7xl italic text-[#1a1a1a] leading-tight">
                            <RevealWords text={otherWorks[selectedWork].title} delay={0.2} />
                          </h2>
                        </div>

                        <p className="font-sans text-lg text-[#555555] leading-relaxed font-light">
                          <RevealWords text={otherWorks[selectedWork].fullDescription} delay={0.5} />
                        </p>
                      </div>

                      <div className="space-y-12">
                        <div className="grid grid-cols-2 gap-8">
                          {otherWorks[selectedWork].gallery.map((img, i) => (
                            <div 
                              key={`${id}-other-work-gallery-item-${i}`} 
                              className="aspect-square overflow-hidden rounded-sm grayscale opacity-80 contrast-[1.05] hover:opacity-100 transition-opacity duration-700 cursor-zoom-in"
                              onClick={() => {
                                const gallery = [otherWorks[selectedWork].image, ...otherWorks[selectedWork].gallery];
                                setLightbox({ images: gallery, index: i + 1 });
                              }}
                            >
                              <SafeImage 
                                src={img} 
                                alt={`Gallery ${i}`}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner Liquid Glass Navigation (Only show in directory view) */}
          {view === 'directory' && (
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
                    <span className="font-sans text-lg font-medium tracking-tight">图案设计</span>
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
                    <span className="font-sans text-lg font-medium tracking-tight">联系我</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
      <Lightbox 
        images={lightbox?.images || []} 
        startIndex={lightbox?.index || 0} 
        isOpen={!!lightbox} 
        onClose={() => setLightbox(null)} 
      />
    </AnimatePresence>
  );
}
