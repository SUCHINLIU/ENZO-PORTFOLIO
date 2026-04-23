import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { RippleEffect } from './RippleEffect';
import { RevealText, RevealWords } from './RevealText';
import { Lightbox } from './Lightbox';

interface CommercialOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const projects = [
  {
    id: '01',
    title: '新民族',
    category: '香云纱韵',
    year: '2026',
    image: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB%E4%B8%BB%E5%9B%BE.png',
    gallery: [
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB1-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB1-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB1-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB1-4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB2-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB2-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB2-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB2-4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB3-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB3-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB3-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB3-4.jpg',
    ],
    description: '发掘藏在传统文化长河里的金砂，为非遗工艺传承助力。',
    process: '。',
    details: [
      '材质：香云纱/老缎/宋锦',
      '理念：民族即世界，传承即永恒',
      '目标：高端民族成衣用户'
    ],
    tailImage: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/DB%E5%B0%BE%E5%9B%BE.png'
  },
  {
    id: '02',
    title: '极简主义',
    category: '贴身叙事',
    year: '2025',
    image: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX%E4%B8%BB%E5%9B%BE.jpg',
    gallery: [
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX1-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX1-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX1-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX1-4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX2-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX2-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX2-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX2-4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX3-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX3-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX3-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX3-4.jpg',
    ],
    description: '舒适耐穿，永恒设计，居家自在',
    process: '回归面料的原始质感，采用极简的设计风格，为每一个实穿主义而生。逃离趋势，提升穿着寿命，减少资源的损耗。',
    details: [
      '材质：有机棉与天丝羊毛',
      '理念：永恒的简约',
      '目标：实穿主义消费者'
    ],
    tailImage: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/RX%E5%B0%BE%E5%9B%BE.png'
  },
  {
    id: '03',
    title: '都市森林',
    category: '轻户外系列',
    year: '2025',
    image: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF%E4%B8%BB%E5%9B%BE.jpg',
    gallery: [
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF1-1.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF1-2.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF1-3.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF2-1.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF2-2.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF2-3.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF3-1.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF3-2.png',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF3-3.png',
    ],
    description: '山野自在，城市穿行，一件从容。',
    process: '研究都市游民的着装习惯，采用轻纺针织和户外面料的结合。',
    details: [
      '材质：轻纺针织/户外面料',
      '理念：理想实用性',
      '目标：都市旅行者'
    ],
    tailImage: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/CF%E5%B0%BE%E5%9B%BE.jpg'
  },
  {
    id: '04',
    title: '潮汐逆流',
    category: '街头流行线',
    year: '2024',
    image: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD%E4%B8%BB%E5%9B%BE.png',
    gallery: [
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD1-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD1-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD1-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD1-4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD2-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD2-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD2-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD2-4.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD3-1.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD3-2.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD3-3.jpg',
      'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD3-4.jpg',
    ],
    description: '脉动重构，街头热能，潮汐逆流。',
    process: '从城市能量中提取脉冲，转化为服装剪裁与新兴服用材质，打造动态可穿的潮流系统。',
    details: [
      '材质：定制针织面料/回收塑料聚酯纤维',
      '理念：趋势机动派',
      '目标：街头探索者'
    ],
    tailImage: 'https://raw.githubusercontent.com/SUCHINLIU/Portfolio/main/TD%E5%B0%BE%E5%9B%BE.png'
  }
];

export function CommercialOverlay({ isOpen, onClose, onPrev, onNext }: CommercialOverlayProps) {
  const [view, setView] = useState<'hero' | 'detail'>('hero');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollIntent, setScrollIntent] = useState(0); // For handling the scroll threshold
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const heroFooterRef = useRef<HTMLDivElement>(null);
  const heroNextFooterRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ images: string[], index: number } | null>(null);
  const ease: any = [0.28, 0.11, 0.32, 1];

  // Aggressive multi-stage scroll reset for project transitions
  React.useLayoutEffect(() => {
    if (isOpen) {
      const resetAllScrolls = () => {
        // Reset the root container
        if (containerRef.current) containerRef.current.scrollTop = 0;
        
        // Reset the detail container
        if (detailRef.current) {
          detailRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll during reset
          detailRef.current.scrollTop = 0;
          
          // Use multiple frames to ensure we catch the post-render state
          requestAnimationFrame(() => {
            if (detailRef.current) {
              detailRef.current.scrollTop = 0;
              // Fade back in smooth behavior if needed in CSS
            }
          });
        }
      };

      // Phase 1: Immediate reset
      resetAllScrolls();
      
      // Phase 2: Microtask reset
      const timer = setTimeout(resetAllScrolls, 0);
      
      // Reset interaction states
      setScrollIntent(0); 
      setIsTransitioning(false);
      
      return () => clearTimeout(timer);
    }
  }, [selectedProject, view, isOpen]);

  // Reset interaction states
  const handleProjectSelect = (index: number) => {
    setSelectedProject(index);
    setView('detail');
  };

  const handleBackToDirectory = () => {
    setSelectedProject(null);
    setView('hero');
  };

  const jumpToProject = (index: number) => {
    if (index === selectedProject || isTransitioning) return;
    
    setIsTransitioning(true);
    // Give time for the wipe animation to cover the screen
    setTimeout(() => {
      setSelectedProject(index);
    }, 850); 
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
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="sticky top-0 z-[120] bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-6 md:px-12 border-b-[0.5px] border-black/10">
            <div className="flex items-center gap-8">
              <button 
                onClick={view === 'hero' ? onPrev : handleBackToDirectory}
                className="group flex items-center gap-3 text-black hover:opacity-60 transition-opacity"
              >
                <ArrowLeft size={16} />
                <span className="mono-label !opacity-100 uppercase tracking-[0.2em]">返回上级 // RETURN</span>
              </button>
              <div className="flex items-center gap-6">
                <span className="mono-label">数字档案 // 02</span>
                <h2 className="font-serif text-lg italic text-black">商业作品 // COMMERCIAL</h2>
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
            {/* Hero View: Directory of Series */}
            {view === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
                className="min-h-[calc(100vh-80px)] px-6 py-12 md:px-12 md:py-20 flex flex-col"
              >
                <div className="max-w-7xl mx-auto w-full flex-grow">
                  <div className="mb-16 space-y-4">
                    <span className="mono-label">设计选集 // ANTHOLOGY</span>
                    <h2 className="font-serif text-5xl md:text-7xl italic text-black">
                      <RevealWords text="作品图谱" delay={0.2} />
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease }}
                        whileHover={{ y: -10 }}
                        onClick={() => handleProjectSelect(index)}
                        className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f5f5f7] shadow-sm hover:shadow-2xl transition-all duration-500"
                      >
                        <motion.img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale contrast-[1.1] opacity-90 transition-all duration-1000 group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6]/90 via-[#faf9f6]/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                          <span className="font-sans text-[10px] font-medium text-[#1a1a1a] uppercase tracking-[0.3em] mb-3">{project.category}</span>
                          <h3 className="font-serif text-3xl italic text-[#1a1a1a] mb-6">{project.title}</h3>
                          <div className="h-px w-8 group-hover:w-full bg-[#1a1a1a]/20 transition-all duration-1000" />
                        </div>

                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="font-sans text-xs font-medium">{project.id}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Corner Liquid Glass Navigation for Hero View */}
                <div className="fixed bottom-0 left-0 right-0 z-[120] pointer-events-none">
                  <div className="flex justify-between items-end p-4 md:p-6">
                    <div 
                      ref={heroFooterRef}
                      className="pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 flex items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden group"
                    >
                      <RippleEffect containerRef={heroFooterRef} className="absolute inset-0" zIndex={0} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                      <button 
                        onClick={onPrev}
                        className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#0066cc] transition-colors relative z-10"
                      >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-sans text-lg font-medium tracking-tight">首页</span>
                      </button>
                    </div>

                    <div 
                      ref={heroNextFooterRef}
                      className="pointer-events-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 flex items-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden group"
                    >
                      <RippleEffect containerRef={heroNextFooterRef} className="absolute inset-0" zIndex={0} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                      <button 
                        onClick={onNext}
                        className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#0066cc] transition-colors relative z-10"
                      >
                        <span className="font-sans text-lg font-medium tracking-tight">图案设计</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'detail' && selectedProject !== null && (
              <motion.div
                key={`detail-${selectedProject}`}
                ref={detailRef}
                className="fixed inset-0 z-[130] bg-white overflow-y-auto custom-scrollbar grainy-bg selection:bg-black selection:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }} 
              >
                {/* Fixed Side Navigation */}
                <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[160] hidden xl:flex flex-col gap-12 items-end">
                  {projects.map((project, idx) => (
                    <button
                      key={project.id}
                      onClick={() => jumpToProject(idx)}
                      className="group flex items-center gap-6 text-right transition-all duration-500"
                    >
                      <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                        <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.3em] mb-1">Select Archive</span>
                        <span className="font-serif text-lg italic text-black">{project.title}</span>
                      </div>
                      <div className="relative flex flex-col items-center">
                        <span className={`font-mono text-xs tracking-tighter transition-colors duration-500 ${selectedProject === idx ? 'text-black font-bold scale-125' : 'text-black/20 group-hover:text-black/60'}`}>
                          {project.id}
                        </span>
                        {selectedProject === idx && (
                          <motion.div 
                            layoutId="active-dot"
                            className="absolute -bottom-4 w-1 h-1 bg-black rounded-full" 
                          />
                        )}
                      </div>
                    </button>
                  ))}

                  {/* Return to Directory Link */}
                  <div className="w-px h-12 bg-black/5 my-4 mr-1" />
                  <button
                    onClick={() => setView('hero')}
                    className="group flex items-center gap-6 text-right transition-all duration-500 mt-2"
                  >
                    <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                      <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.3em] mb-1">Exit Archive</span>
                      <span className="font-serif text-lg italic text-black">返回目录</span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-black/5 group-hover:border-black/20 group-hover:bg-black group-hover:text-white transition-all duration-500 mr-[-8px]">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>

                <div className="relative">
                  {/* Floating Back Button for Lookbook */}
                  <div className="fixed top-8 left-8 z-[150] mix-blend-difference">
                    <button 
                      onClick={() => setView('hero')}
                      className="flex items-center gap-3 text-white transition-opacity font-sans text-[11px] font-medium uppercase tracking-[0.2em]"
                    >
                      <ArrowLeft size={16} />
                      <span>返回目录 // BACK</span>
                    </button>
                  </div>

                  {/* 1. Full Width Hero Photo (16:9 Aspect Ratio) */}
                  <section className="w-full relative overflow-hidden aspect-video">
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img 
                        src={projects[selectedProject].image} 
                        className="w-full h-full object-cover grayscale contrast-[1.1] cursor-zoom-in"
                        alt="Hero"
                        referrerPolicy="no-referrer"
                        onClick={() => {
                          const gallery = [projects[selectedProject].image, ...projects[selectedProject].gallery, ...(projects[selectedProject].tailImage ? [projects[selectedProject].tailImage] : [])];
                          setLightbox({ images: gallery, index: 0 });
                        }}
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6">
                      <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="font-serif text-6xl md:text-[120px] text-white italic drop-shadow-2xl leading-none"
                      >
                        <RevealWords text={projects[selectedProject].title} delay={0.6} />
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="font-sans text-[10px] md:text-xs text-white/70 tracking-[0.8em] mt-10 md:mt-16 uppercase"
                      >
                        Lookbook // {projects[selectedProject].year} Season
                      </motion.p>
                    </div>
                  </section>

                  {/* 2. Grid Section (3x4 for most, 3x3 for Urban Forest) */}
                  <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
                    <div className="mb-24 space-y-6 text-center">
                      <span className="mono-label">造型目录 // ARCHIVE</span>
                      <h3 className="font-serif text-3xl md:text-5xl italic text-black">
                        {projects[selectedProject].category} — {projects[selectedProject].year}
                      </h3>
                      <p className="font-sans text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed font-light mt-8">
                        {projects[selectedProject].description}
                      </p>
                    </div>

                    <div className={`grid gap-4 md:gap-8 ${
                      projects[selectedProject].id === '03' 
                        ? 'grid-cols-2 md:grid-cols-3' 
                        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }`}>
                      {(projects[selectedProject].gallery || []).map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ delay: (i % 4) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className={`group relative overflow-hidden rounded-sm cursor-zoom-in ${
                            projects[selectedProject].title === '新民族' || projects[selectedProject].title === '潮汐逆流'
                              ? 'aspect-[5/7]'
                              : 'aspect-[3/4]'
                          }`}
                          onClick={() => {
                            const gallery = [projects[selectedProject].image, ...projects[selectedProject].gallery, ...(projects[selectedProject].tailImage ? [projects[selectedProject].tailImage] : [])];
                            setLightbox({ images: gallery, index: i + 1 });
                          }}
                        >
                          <motion.img 
                            src={img} 
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            alt={`Lookbook ${i+1}`}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center text-center p-4">
                            <span className="font-sans text-[10px] text-white tracking-[0.3em] font-medium border border-white/30 px-4 py-1 rounded-full">
                              ARCHIVE_{projects[selectedProject].id}_{i+1 < 10 ? `0${i+1}` : i+1}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Details Section */}
                    <div className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-24 items-center border-t border-black/5 pt-32">
                       <div className="space-y-12">
                         <h4 className="font-serif text-4xl italic text-black leading-tight">
                           剪裁赋诗于身，<br />纤维纳息于地
                         </h4>
                         <div className="space-y-6">
                          {projects[selectedProject].details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-6">
                              <div className="w-1 h-px bg-[#1a1a1a]/30" />
                              <span className="font-sans text-sm text-[#555555] font-light tracking-wide">{detail}</span>
                            </div>
                          ))}
                        </div>
                       </div>
                       <div className="aspect-[4/5] overflow-hidden rounded-sm cursor-zoom-in" onClick={() => {
                        const gallery = [projects[selectedProject].image, ...projects[selectedProject].gallery, ...(projects[selectedProject].tailImage ? [projects[selectedProject].tailImage] : [])];
                        setLightbox({ images: gallery, index: gallery.length - 1 });
                      }}>
                          <img 
                            src={projects[selectedProject].tailImage || `https://picsum.photos/seed/detail-${selectedProject}/800/1000`} 
                            className="w-full h-full object-cover" 
                            alt="Detail" 
                            referrerPolicy="no-referrer" 
                          />
                       </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Global Transition Overlay (Infinite Flow) - Fixed outside AnimatePresence of View to avoid unmounting too early */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                key="global-wipe"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
                className="fixed inset-0 z-[200] bg-black origin-bottom flex flex-col items-center justify-center text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-4"
                >
                    <span className="font-mono text-[10px] tracking-[0.5em] text-white/40 uppercase">Loading Next Archive</span>
                    <h2 className="font-serif text-5xl italic">
                      {projects[selectedProject !== null ? (selectedProject + 1) % projects.length : 0].title}
                    </h2>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
