import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 25, stiffness: 350 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trailing spring for the outer ring
  const trailConfig = { damping: 30, stiffness: 150 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('.group') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Prevent context menu and drag on images
    const handleGlobalContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'img' || target.closest('img')) {
        e.preventDefault();
      }
    };
    const handleGlobalDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'img' || target.closest('img')) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleGlobalContextMenu);
    window.addEventListener('dragstart', handleGlobalDragStart);

    // Screenshot Protection
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        alert('为了保护版权，已禁用截图功能 // SCREENSHOT DISABLED');
      }

      // Block Cmd+Shift+3/4/5 (Mac) or Ctrl+Shift+S (some Win tools)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5' || e.key.toLowerCase() === 's')) {
        e.preventDefault();
      }

      // Block Cmd+Option+E (some tools) or other common capture keys
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === 'p')) {
        e.preventDefault(); // Block Print
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleGlobalContextMenu);
      window.removeEventListener('dragstart', handleGlobalDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer trailing ring */}
      <motion.div
        className="w-10 h-10 border border-black/10 rounded-full"
        style={{
          translateX: trailX,
          translateY: trailY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{ 
          scale: isHovering ? 1.4 : 1,
          borderColor: isHovering ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'
        }}
      />
      
      {/* Precision inner dot/ring */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div 
          className="w-full h-full bg-black rounded-full"
          animate={{ scale: isHovering ? 0.5 : 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        />
      </motion.div>
    </div>
  );
}
