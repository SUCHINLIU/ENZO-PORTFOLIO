import { useEffect } from 'react';

/**
 * Hook to pre-load images in the background.
 * Helps improve perceived performance by having critical assets cached before they are needed.
 */
export function useImagePreloader(imageUrls: string[]) {
  useEffect(() => {
    // Avoid running on every render or if no URLs provided
    if (!imageUrls || imageUrls.length === 0) return;

    // Use a small delay to avoid competing with initial page load bandwidth
    const timer = setTimeout(() => {
      imageUrls.forEach((url) => {
        if (!url) return;
        const img = new Image();
        img.src = url;
      });
      console.log(`Preloaded ${imageUrls.length} critical images in background.`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [imageUrls]);
}
