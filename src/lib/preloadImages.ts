/**
 * Image preloading utility with promise support
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Resolve even on error to not block sequences
    img.src = url;
  });
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => preloadImage(url));
  await Promise.all(promises);
};
