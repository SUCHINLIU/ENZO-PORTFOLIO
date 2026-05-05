import { useEffect, useRef, useState, useId } from 'react';
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
  const id = useId();
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
        className={`fixed top-8 right-8 z-[150] flex items-center justify-center w-12 h-12 rounded-full border border-black/5 bg-white/40 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-white hover:scale-110 active:scale-95 ${
          isOpen ? 'translate-x-[calc(-1*clamp(260px,38vw,420px))] rotate-90 border-black/10 bg-white/80' : ''
        }`}
        aria-label="Toggle Menu"
      >
        <div className="relative w-4 h-4">
          <span className={`absolute top-1/2 left-0 w-full h-[1.5px] bg-black transition-all duration-500 ease-out ${isOpen ? 'rotate-45' : '-translate-y-1'}`} />
          <span className={`absolute top-1/2 left-0 w-full h-[1.5px] bg-black transition-all duration-500 ease-out ${isOpen ? '-rotate-45' : 'translate-y-1'}`} />
        </div>
      </button>

      <div
        className={`fixed inset-0 z-[140] pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}
      >
        {/* Simplified backdrop entry */}
        <div 
          ref={panelRef}
          className="absolute top-0 right-0 h-full w-full lg:w-[clamp(260px,38vw,420px)] bg-white border-l-[0.5px] border-black/5 text-black translate-x-full flex flex-col justify-between p-10 md:p-14 shadow-[-20px_0_60px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-black translate-x-full" />
          
          <div className="relative z-10 mt-20 menu-list">
            <div className="mb-20 overflow-hidden">
              <span className="mono-label inline-block animate-pulse">NAVIGATION_CORE_01</span>
            </div>
            
            {menuItems.map((item, i) => (
              <div 
                key={`${id}-menu-item-${item.en}`} 
                className="overflow-hidden mb-10 group"
                onClick={() => handleItemClick(item.action)}
              >
                <div
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="menu-item cursor-pointer flex flex-col"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[8px] text-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">0{i + 1}</span>
                    <span className="font-sans text-[1.25rem] md:text-[1.5rem] font-light tracking-[-0.03em] text-black/80 group-hover:text-black group-hover:italic transition-all duration-500">
                      {item.en}
                    </span>
                  </div>
                  <span className="font-sans text-[0.55rem] font-medium tracking-[0.5em] text-black/20 uppercase mt-2 group-hover:text-black/40 transition-colors duration-500">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-8 border-t-[0.5px] border-black/5 flex justify-between items-end">
            <div className="space-y-1">
              <p className="font-mono text-[8px] text-black/30 tracking-tight">LAT: 31.2304° N</p>
              <p className="font-mono text-[8px] text-black/30 tracking-tight">LNG: 121.4737° E</p>
            </div>
            <p className="font-mono text-[8px] text-black/20 uppercase tracking-[0.2em]">
              © 2025 ENZO
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
