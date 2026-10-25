/**
 * Static Image Helper for House of Swavani
 * Returns local image paths directly with zero external network dependency.
 */

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "avif" | "jpeg" | "png";
  fit?: "cover" | "contain" | "scale-down" | "crop";
}

export function getCloudflareImageUrl(
  src: string,
  _options?: ImageTransformOptions
): string {
  if (!src) return "/products/1/DSC03770.jpg";
  return src;
}

export function isCloudflareUrl(_url: string): boolean {
  return false;
}
