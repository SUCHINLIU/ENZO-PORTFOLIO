import React, { useId } from 'react';
import { motion } from 'motion/react';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const RevealText: React.FC<RevealTextProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  stagger = 0.02,
  once = true 
}) => {
  const id = useId();
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay * i 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as any
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as any
      },
    },
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`reveal-char-${id}-${index}-${char}`}
          className="inline-block"
          variants={child}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const RevealWords: React.FC<RevealTextProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  stagger = 0.05,
  once = true 
}) => {
  const id = useId();
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay * i 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1] as any
      },
    },
    hidden: {
      opacity: 0,
      y: "100%",
      rotateX: 45,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1] as any
      },
    },
  };

  return (
    <motion.span
      className={`inline-block perspective-[1000px] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <span key={`reveal-word-${id}-${index}-${word}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block origin-bottom"
            variants={child}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export const PerspectiveReveal: React.FC<RevealTextProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  stagger = 0.03,
  once = true 
}) => {
  const id = useId();
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay * i 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1.0] as any
      },
    },
    hidden: {
      opacity: 0,
      rotateX: -100,
      y: 15,
      scale: 0.8,
      transition: {
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1.0] as any
      },
    },
  };

  return (
    <motion.span
      className={`inline-block perspective-[1000px] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`perspective-char-${id}-${index}-${char}`}
          className="inline-block origin-top"
          variants={child}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
