import React from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export function SafeImage({ src, alt, className, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [triedAlternatives, setTriedAlternatives] = React.useState<string[]>([]);

  React.useEffect(() => {
    setCurrentSrc(src);
    setTriedAlternatives([]);
  }, [src]);

  const handleError = () => {
    if (typeof src !== 'string') return;

    const extensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG', '.webp', '.WEBP'];
    const currentExtMatch = src.match(/\.[^.]+$/);
    const currentExt = currentExtMatch ? currentExtMatch[0] : '';
    
    // Find the next extension to try that we hasn't tried yet
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

  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      className={className} 
      onError={handleError}
      {...props} 
    />
  );
}
