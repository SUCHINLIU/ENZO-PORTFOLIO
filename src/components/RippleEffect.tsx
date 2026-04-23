import React, { useEffect, useRef } from 'react';

const RIPPLE_COUNT = 80;
const DISTANCE_THRESHOLD = 25;

interface Ripple {
  x: number;
  y: number;
  age: number;
  active: boolean;
}

interface RippleEffectProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  zIndex?: number;
}

export function RippleEffect({ containerRef, className = "fixed inset-0", zIndex = 30 }: RippleEffectProps) {
  const ripplesRef = useRef<Ripple[]>(
    Array.from({ length: RIPPLE_COUNT }, () => ({ x: 0, y: 0, age: 0, active: false }))
  );
  const rippleElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastPosRef = useRef({ x: -1000, y: -1000 });
  const currentIndexRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Check if mouse is within container bounds
        if (
          x < rect.left || 
          x > rect.right || 
          y < rect.top || 
          y > rect.bottom
        ) return;
        
        // Use relative coordinates if needed, but the current logic uses absolute positioning in a fixed/absolute container
        // Actually, if the container is fixed inset-0, absolute positioning with clientX/Y works.
        // If the container is a small pill, we should use relative coordinates or keep using clientX/Y if the ripple container is also fixed.
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
          ripple.age += 0.012;
          
          if (ripple.age >= 1) {
            ripple.active = false;
            el.style.opacity = '0';
          } else {
            const size = 20 + ripple.age * 280;
            const opacity = 1 - Math.pow(ripple.age, 1.2);
            
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
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { rippleElementsRef.current[i] = el; }}
          className="absolute rounded-full opacity-0 pointer-events-none"
          style={{
            backdropFilter: 'url(#liquid-trail) blur(1px)',
            boxShadow: 'inset 0 0 30px rgba(0, 113, 227, 0.05), 0 0 15px rgba(0, 113, 227, 0.03)',
            border: '1px solid rgba(0, 113, 227, 0.05)',
            willChange: 'transform, opacity, width, height, left, top',
          }}
        />
      ))}
    </div>
  );
}
