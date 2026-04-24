import React from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export function SafeImage({ src, alt, className, onLoad, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [triedAlternatives, setTriedAlternatives] = React.useState<string[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setCurrentSrc(src);
    setTriedAlternatives([]);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (typeof src !== 'string') return;

    const extensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG', '.webp', '.WEBP'];
    const currentExtMatch = currentSrc.match(/\.[^.]+$/);
    const currentExt = currentExtMatch ? currentExtMatch[0] : '';
    
    const nextExt = extensions.find(ext => 
      ext.toLowerCase() !== currentExt.toLowerCase() && 
      !triedAlternatives.includes(ext)
    );

    if (nextExt) {
      const base = src.replace(/\.[^.]+$/, '');
      const alternative = `${base}${nextExt}`;
      setTriedAlternatives(prev => [...prev, nextExt]);
      setCurrentSrc(alternative);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      className={`${className} transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} select-none pointer-events-none`}
      onError={handleError}
      onLoad={handleLoad}
      draggable={false}
      {...props} 
    />
  );
}
