import { useEffect } from 'react';
import { preloadImage } from '../lib/preloadImages';

/**
 * Hook to pre-load images in the background.
 * Helps improve perceived performance by having critical assets cached before they are needed.
 */
export function useImagePreloader(imageUrls: string[], delay: number = 2000) {
  useEffect(() => {
    // Avoid running if no URLs provided
    if (!imageUrls || imageUrls.length === 0) return;

    const controller = new AbortController();

    // Use a small delay to avoid competing with initial page load bandwidth
    const timer = setTimeout(async () => {
      // Preload critical images first
      for (const url of imageUrls) {
        if (controller.signal.aborted) break;
        if (!url) continue;
        await preloadImage(url);
      }
      console.log(`Finished preloading ${imageUrls.length} images.`);
    }, delay);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [imageUrls, delay]);
}
