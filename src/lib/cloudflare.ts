/**
 * Cloudflare Image Fetching & CDN Helper (Free Tier Compatible)
 * 
 * Supports:
 * 1. Cloudflare Free Tier Worker Image Proxy (100,000 requests/day free edge caching)
 * 2. Cloudflare Free Caching CDN via custom domain / subdomain
 * 3. Graceful fallback to original URL (local / Firebase Storage / external CDN)
 */

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "auto" | "webp" | "avif" | "jpeg" | "png";
  fit?: "cover" | "contain" | "scale-down" | "crop";
}

/**
 * Returns the optimized URL for an image.
 * If a Cloudflare Worker or Cloudflare CDN domain is configured, routes through it for edge caching.
 * Otherwise, falls back gracefully to the original source.
 */
export function getCloudflareImageUrl(
  src: string,
  options?: ImageTransformOptions
): string {
  if (!src) return "/placeholder-saree.jpg";

  // If local static asset, return as-is
  if (src.startsWith("/") && !src.startsWith("//")) {
    return src;
  }

  const workerUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL;
  const cfDomain = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_DOMAIN;

  // 1. If using a free Cloudflare Worker edge proxy (e.g. https://images.yourstore.workers.dev)
  if (workerUrl) {
    const params = new URLSearchParams();
    params.set("url", src);
    if (options?.width) params.set("w", options.width.toString());
    if (options?.height) params.set("h", options.height.toString());
    if (options?.quality) params.set("q", options.quality.toString());
    if (options?.format) params.set("f", options.format);
    return `${workerUrl.replace(/\/$/, "")}/fetch?${params.toString()}`;
  }

  // 2. If using Cloudflare Images / CDN Zone URL (e.g. https://cdn.yourdomain.com/cdn-cgi/image/...)
  if (cfDomain) {
    const cleanDomain = cfDomain.replace(/\/$/, "");
    if (options && (options.width || options.quality || options.format)) {
      const trans = [
        options.width ? `width=${options.width}` : "",
        options.quality ? `quality=${options.quality}` : "quality=85",
        options.format ? `format=${options.format}` : "format=auto",
        options.fit ? `fit=${options.fit}` : "fit=cover",
      ]
        .filter(Boolean)
        .join(",");
      return `${cleanDomain}/cdn-cgi/image/${trans}/${src}`;
    }
    return `${cleanDomain}/${src.replace(/^https?:\/\/[^/]+\//, "")}`;
  }

  // 3. Fallback: Return original URL
  return src;
}

/**
 * Checks if a given URL is a valid Cloudflare-routed image URL
 */
export function isCloudflareUrl(url: string): boolean {
  if (!url) return false;
  return (
    url.includes("imagedelivery.net") ||
    url.includes("cloudflare.com") ||
    url.includes("workers.dev") ||
    url.includes("/cdn-cgi/image/")
  );
}
