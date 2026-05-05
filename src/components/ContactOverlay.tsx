import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { RippleEffect } from './RippleEffect';
import { RevealText, RevealWords } from './RevealText';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
}

const WeChatIcon = ({ className, size = 18 }: { className?: string, size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.2,4.84c-3.58,0-6.49,2.62-6.49,5.85c0,1.82,0.91,3.45,2.33,4.52c-0.1,0.36-0.44,1.4-0.44,1.4L5,15.7c0.32,0.06,0.67,0.08,1.01,0.08c3.58,0,6.49-2.62,6.49-5.85C12.5,6.72,10.37,4.84,8.2,4.84z M11.83,11.23c-2.47,0-4.47,1.81-4.47,4.04c0,1.3,0.73,2.46,1.86,3.22c-0.08,0.28-0.34,1.06-0.34,1.06l1.24-0.65c0.26,0.05,0.52,0.06,0.79,0.06c2.47,0,4.47-1.81,4.47-4.04C15.39,12.69,13.84,11.23,11.83,11.23z" />
  </svg>
);

export function ContactOverlay({ isOpen, onClose, onPrev }: ContactOverlayProps) {
  const ease = [0.28, 0.11, 0.32, 1];
  const containerRef = useRef<HTMLDivElement>(null);

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
            <div className="flex items-center gap-8">
              <button 
                onClick={onPrev}
                className="group flex items-center gap-3 text-black hover:opacity-60 transition-opacity"
              >
                <ArrowLeft size={16} />
                <span className="mono-label !opacity-100 uppercase tracking-[0.2em]">返回上级 // RETURN</span>
              </button>
              <div className="flex items-center gap-6">
                <span className="mono-label">索引目录 // 05</span>
                <h2 className="font-serif text-lg italic text-black">联系方式 // CONTACT</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="px-6 py-1 text-[10px] font-sans border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              关闭会话 // CLOSE
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-20 md:py-40">
            <div className="text-center space-y-12">
              <h2 className="font-serif text-4xl md:text-6xl italic leading-tight text-[#1a1a1a]">
                <RevealWords text="携手" delay={0.2} />
                <br />
                <RevealWords text="让我们创造" delay={0.4} />
                <br />
                <RevealWords text="有意义的设计。" delay={0.6} />
              </h2>

              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 text-left"
              >
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  href="mailto:hello@enzoliu.com" 
                  className="group p-8 border-[0.5px] border-black/10 hover:border-black transition-all duration-500 bg-white shadow-sm hover:shadow-2xl"
                >
                  <Mail className="mb-6 text-black opacity-40 group-hover:opacity-100 transition-opacity" size={18} />
                  <h4 className="mono-label !opacity-100 mb-2">电子邮箱 // EMAIL</h4>
                  <p className="font-sans text-sm font-medium text-black">493732100@qq.com</p>
                </motion.a>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-8 border-[0.5px] border-black/10 hover:border-black transition-all duration-500 bg-white shadow-sm hover:shadow-2xl"
                >
                  <WeChatIcon className="mb-6 text-black opacity-40 group-hover:opacity-100 transition-opacity" size={18} />
                  <h4 className="mono-label !opacity-100 mb-2">微信 // WECHAT</h4>
                  <p className="font-sans text-sm font-medium text-black">SUCHIN_LIU </p>
                </motion.div>
 
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  href="tel:+8612345678900" 
                  className="group p-8 border-[0.5px] border-black/10 hover:border-black transition-all duration-500 bg-white shadow-sm hover:shadow-2xl"
                >
                  <Phone className="mb-6 text-black opacity-40 group-hover:opacity-100 transition-opacity" size={18} />
                  <h4 className="mono-label !opacity-100 mb-2">联系电话 // PHONE</h4>
                  <p className="font-sans text-sm font-medium text-black">+86 15273713550</p>
                </motion.a>
 
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-8 border-[0.5px] border-black/10 hover:border-black transition-all duration-500 bg-white cursor-default shadow-sm hover:shadow-2xl"
                >
                  <MessageSquare className="mb-6 text-black opacity-40 group-hover:opacity-100 transition-opacity" size={18} />
                  <h4 className="mono-label !opacity-100 mb-2">社交账号 // SOCIAL</h4>
                  <p className="font-sans text-sm font-medium text-black">SUCHIN_LIU</p>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Minimalist Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-[120] px-6 py-10 md:px-12 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-end">
              <button 
                onClick={onPrev}
                className="pointer-events-auto group flex flex-col items-start gap-2"
              >
                <span className="mono-label !opacity-30 group-hover:!opacity-100 transition-opacity">PREVIOUS_MODULE</span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[0.5px] bg-black/20 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
                  <span className="font-serif italic text-lg text-black/60 group-hover:text-black transition-colors">其他创意 // EXPLORATION</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
