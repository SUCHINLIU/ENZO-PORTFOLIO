import React, { useCallback, useRef, useId } from 'react';
import HTMLPageFlip from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface FlipBookProps {
  images: string[];
  onImageClick?: (src: string) => void;
}

export function FlipBook({ images, onImageClick }: FlipBookProps) {
  const bookRef = useRef<any>(null);
  const id = useId();

  const onNextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const onPrevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  // Page structure:
  // 1: Front Cover (5:7)
  // 2-13: Internal Pages (7:5)
  // 14: Back Cover (5:7)

  return (
    <div className="flex flex-col items-center">
      <div className="relative group/book">
        {/* Book Component */}
        <div className="shadow-[0_50px_120px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden bg-[#1a1a1a]">
          <HTMLPageFlip
            width={1050}
            height={750}
            size="stretch"
            minWidth={600}
            maxWidth={2000}
            minHeight={428}
            maxHeight={1428}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startPage={0}
            autoSize={true}
            showCover={true}
            mobileScrollSupport={true}
            className="editorial-book"
            ref={bookRef}
            style={{ backgroundColor: '#fdfdfd' }}
            startZIndex={0}
            maxShadowOpacity={0.5}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {images.map((img, index) => {
              const isCover = index === 0 || index === images.length - 1;
              return (
                <div key={`${id}-page-${index}`} className="page bg-[#fdfdfd] h-full w-full relative">
                  <div className="page-content h-full w-full flex items-center justify-center relative">
                    {/* Subtle page edge shadow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/[0.03] via-transparent to-black/[0.03] pointer-events-none" />
                    
                    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                      {isCover ? (
                        <div className="h-full aspect-[5/7] shadow-xl cursor-zoom-in" onClick={() => onImageClick?.(img)}>
                          <SafeImage 
                            src={img} 
                            alt={`Cover ${index === 0 ? 'Front' : 'Back'}`}
                            className="w-full h-full object-cover transition-all duration-700 contrast-[1.02]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full cursor-zoom-in" onClick={() => onImageClick?.(img)}>
                          <SafeImage 
                            src={img} 
                            alt={`Page ${index + 1}`}
                            className="w-full h-full object-cover transition-all duration-700 contrast-[1.02]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      
                      {/* Subtle Paper Texture Overlay */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
                    </div>

                    {/* Page Number (Very Subtle) */}
                    <div className="absolute bottom-4 right-6 font-mono text-[8px] text-black/20 tracking-widest">
                       {index + 1} / {images.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </HTMLPageFlip>
        </div>

        {/* Floating Controls */}
        <button 
          onClick={onPrevPage}
          className="absolute -left-20 top-1/2 -translate-y-1/2 p-4 text-black/20 hover:text-black transition-colors hidden md:block"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>
        <button 
          onClick={onNextPage}
          className="absolute -right-20 top-1/2 -translate-y-1/2 p-4 text-black/20 hover:text-black transition-colors hidden md:block"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>

        {/* Top Spine Detail */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-black/5 z-20 pointer-events-none" />
      </div>

      {/* Footer Hint */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {images.map((_, i) => (
             <div key={`${id}-book-dot-${i}`} className="w-1.5 h-1.5 rounded-full bg-black/10" />
          ))}
        </div>
        <p className="font-sans text-[9px] tracking-[0.4em] text-black/40 uppercase">
          点击边缘翻动页面 // FLIP FROM EDGES
        </p>
      </div>
    </div>
  );
}
