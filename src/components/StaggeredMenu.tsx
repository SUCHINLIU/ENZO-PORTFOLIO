import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './StaggeredMenu.css';

interface StaggeredMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onFleetClick: () => void;
  onAboutClick: () => void;
  onCommercialClick: () => void;
  onPatternClick: () => void;
  onOtherClick: () => void;
  onContactClick: () => void;
}

const menuItems = [
  { name: '首页', en: 'HOME', action: 'close' },
  { name: '关于我', en: 'ABOUT', action: 'about me' },
  { name: '商业风格设计', en: 'COMMERCIAL DESIGN', action: 'commercial' },
  { name: '图案设计', en: 'PATTERN DESIGN', action: 'pattern' },
  { name: '其他', en: 'OTHER', action: 'other' },
  { name: '联系我', en: 'CONTACT', action: 'contact' },
];

export function StaggeredMenu({ isOpen, setIsOpen, onFleetClick, onAboutClick, onCommercialClick, onPatternClick, onOtherClick, onContactClick }: StaggeredMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const preLayerRef1 = useRef<HTMLDivElement>(null);
  const preLayerRef2 = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const toggleTextRef = useRef<HTMLDivElement>(null);
  const toggleIconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Open animation
      gsap.to([preLayerRef1.current, preLayerRef2.current, panelRef.current], {
        x: '0%',
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.1,
      });

      const validItems = itemsRef.current.filter(Boolean);
      gsap.fromTo(
        validItems,
        { yPercent: 140, rotate: 10 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.05,
          delay: 0.4,
        }
      );

      gsap.to(toggleTextRef.current, { y: '-50%', duration: 0.5, ease: 'power3.inOut' });
      gsap.to(toggleIconRef.current, { rotate: 225, duration: 0.5, ease: 'power3.inOut' });
    } else {
      // Close animation
      gsap.to([panelRef.current, preLayerRef2.current, preLayerRef1.current], {
        x: '100%',
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.05,
      });

      gsap.to(toggleTextRef.current, { y: '0%', duration: 0.5, ease: 'power3.inOut' });
      gsap.to(toggleIconRef.current, { rotate: 0, duration: 0.5, ease: 'power3.inOut' });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const handleItemClick = (action: string) => {
    const idMap: Record<string, string> = {
      'close': 'HOME',
      'about me': 'ABOUT',
      'commercial': 'COMMERCIAL',
      'pattern': 'PATTERN',
      'other': 'OTHER',
      'contact': 'CONTACT'
    };

    const targetId = idMap[action];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (action === 'fleet') {
      onFleetClick();
    } else if (action === 'about' || action === 'about me') {
      onAboutClick();
    } else if (action === 'commercial') {
      onCommercialClick();
    } else if (action === 'pattern') {
      onPatternClick();
    } else if (action === 'other') {
      onOtherClick();
    } else if (action === 'contact') {
      onContactClick();
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-8 right-8 z-[60] flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-white/80 border border-stone-200 text-[#1d1d1f] shadow-sm transition-all duration-500 hover:bg-white ${
          isOpen ? 'translate-x-[calc(-1*clamp(260px,38vw,420px))]' : ''
        }`}
      >
        <div className="h-5 overflow-hidden relative w-12">
          <div ref={toggleTextRef} className="absolute top-0 left-0 w-full flex flex-col font-sans font-medium tracking-tight text-xs">
            <span className="h-5 flex items-center justify-center">Menu</span>
            <span className="h-5 flex items-center justify-center">Close</span>
          </div>
        </div>
        <svg ref={toggleIconRef} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-40 pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}
      >
        <div ref={preLayerRef1} className="absolute top-0 right-0 h-full w-full lg:w-[clamp(260px,38vw,420px)] bg-black/5 backdrop-blur-sm translate-x-full" />
        <div ref={preLayerRef2} className="absolute top-0 right-0 h-full w-full lg:w-[clamp(260px,38vw,420px)] bg-black/10 backdrop-blur-md translate-x-full" />
        
        <div
          ref={panelRef}
          className="absolute top-0 right-0 h-full w-full lg:w-[clamp(260px,38vw,420px)] bg-white backdrop-blur-3xl border-l-[0.5px] border-black/10 text-black translate-x-full flex flex-col justify-between p-12 shadow-2xl overflow-hidden"
        >
          <div className="tech-grid opacity-20" />
          
          <div className="relative z-10 mt-24 menu-list">
            <div className="mb-12">
              <span className="mono-label">SYSTEM_INDEX v2.0</span>
            </div>
            {menuItems.map((item, i) => (
              <div 
                key={item.name} 
                className="overflow-hidden mb-8"
                onClick={() => handleItemClick(item.action)}
              >
                <div
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="menu-item group cursor-pointer flex flex-col transition-all duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
                >
                  <span className="font-sans text-[1.5rem] md:text-[2rem] font-bold tracking-tighter text-black group-hover:pl-4 transition-all duration-500">
                    {item.en}
                  </span>
                  <span className="font-sans text-[0.6rem] font-medium tracking-[0.4em] text-black/30 uppercase mt-1">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mb-8 pt-8 border-t-[0.5px] border-black/10">
            <p className="font-mono text-[9px] text-black/40 tracking-tight leading-relaxed">
              ACCESS_AUTH: SUCHIN_LIU // DESIGNER<br />
              TERM_CONN: SECURE_MD5<br />
              © 2025 ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
