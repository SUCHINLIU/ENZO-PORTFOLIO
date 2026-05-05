import React, { useEffect, useRef, useId } from 'react';

const RIPPLE_COUNT = 100;
const DISTANCE_THRESHOLD = 20;

interface Ripple {
  x: number;
  y: number;
  age: number;
  active: boolean;
  scale: number;
}

interface RippleEffectProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  zIndex?: number;
}

export function RippleEffect({ containerRef, className = "fixed inset-0", zIndex = 30 }: RippleEffectProps) {
  const ripplesRef = useRef<Ripple[]>(
    Array.from({ length: RIPPLE_COUNT }, () => ({ x: 0, y: 0, age: 0, active: false, scale: 1 }))
  );
  const rippleElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastPosRef = useRef({ x: -1000, y: -1000 });
  const currentIndexRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  const id = useId();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (
          x < rect.left || 
          x > rect.right || 
          y < rect.top || 
          y > rect.bottom
        ) return;
      }

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > DISTANCE_THRESHOLD) {
        lastPosRef.current = { x, y };
        
        const index = currentIndexRef.current;
        const ripple = ripplesRef.current[index];
        ripple.x = x;
        ripple.y = y;
        ripple.age = 0;
        ripple.active = true;
        ripple.scale = 0.5 + (distance / 200); // Scale based on speed
        
        currentIndexRef.current = (index + 1) % RIPPLE_COUNT;
      }
    };

    const target = containerRef?.current || window;
    target.addEventListener('mousemove', handleMouseMove as any);

    const updateRipples = () => {
      const ripples = ripplesRef.current;
      const elements = rippleElementsRef.current;
      const rect = containerRef?.current?.getBoundingClientRect();

      for (let i = 0; i < RIPPLE_COUNT; i++) {
        const ripple = ripples[i];
        const el = elements[i];
        
        if (ripple.active && el) {
          ripple.age += 0.01; // Slightly slower decay
          
          if (ripple.age >= 1) {
            ripple.active = false;
            el.style.opacity = '0';
          } else {
            const size = (20 + ripple.age * 300) * ripple.scale;
            const opacity = (1 - ripple.age) * 0.8;
            
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            
            let displayX = ripple.x;
            let displayY = ripple.y;

            if (rect) {
              displayX -= rect.left;
              displayY -= rect.top;
            }

            el.style.left = `${displayX - size / 2}px`;
            el.style.top = `${displayY - size / 2}px`;
            el.style.opacity = opacity.toString();
            el.style.transform = `scale(${1 + ripple.age * 0.5})`;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateRipples);
    };

    animationFrameRef.current = requestAnimationFrame(updateRipples);

    return () => {
      target.removeEventListener('mousemove', handleMouseMove as any);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [containerRef]);

  return (
    <div className={`${className} pointer-events-none overflow-hidden`} style={{ zIndex }}>
      <svg className="hidden">
        <filter id="liquid-trail">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
        <div
          key={`${id}-ripple-dot-${i}`}
          ref={(el) => { rippleElementsRef.current[i] = el; }}
          className="absolute rounded-full opacity-0 pointer-events-none mix-blend-soft-light"
          style={{
            backdropFilter: 'url(#liquid-trail) blur(10px)',
            boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.15)',
            border: '0.5px solid rgba(255, 255, 255, 0.2)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            willChange: 'transform, opacity, width, height, left, top',
          }}
        />
      ))}
    </div>
  );
}
