/**
 * Cloudflare Worker: Free Tier Edge Image Cache & Proxy
 * 
 * Free Tier Benefits:
 * - 100,000 free requests per day
 * - Edge caching across Cloudflare's 300+ global data centers
 * - Automatic WebP / AVIF format negotiation and browser caching
 * 
 * Deploy via Cloudflare Dashboard:
 * 1. Log in to dash.cloudflare.com -> Workers & Pages -> Create Application -> Create Worker
 * 2. Paste this code into the editor -> Save and Deploy!
 * 3. Copy your worker URL (e.g., https://swavani-images.yourname.workers.dev)
 * 4. Add to .env.local: NEXT_PUBLIC_CLOUDFLARE_WORKER_URL=https://swavani-images.yourname.workers.dev
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", service: "Swavani Cloudflare Image CDN" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/fetch") {
      const targetUrl = url.searchParams.get("url");
      if (!targetUrl) {
        return new Response("Missing target image url parameter (?url=...)", { status: 400 });
      }

      // Allow only valid HTTP/HTTPS URLs
      try {
        const parsed = new URL(targetUrl);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          return new Response("Invalid protocol", { status: 400 });
        }
      } catch (e) {
        return new Response("Invalid URL format", { status: 400 });
      }

      // Check Cloudflare Cache API
      const cacheKey = new Request(url.toString(), request);
      const cache = caches.default;
      let response = await cache.match(cacheKey);

      if (!response) {
        // Fetch from origin
        const imageRes = await fetch(targetUrl, {
          headers: {
            "User-Agent": "Swavani-Cloudflare-Worker/1.0",
            Accept: request.headers.get("Accept") || "image/*",
          },
        });

        if (!imageRes.ok) {
          return new Response(`Origin fetch failed with status ${imageRes.status}`, { status: imageRes.status });
        }

        // Clone headers and add caching directives
        const newHeaders = new Headers(imageRes.headers);
        newHeaders.set("Access-Control-Allow-Origin", "*");
        newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        // Cache at edge for 30 days, browser for 7 days
        newHeaders.set("Cache-Control", "public, max-age=604800, s-maxage=2592000, immutable");
        newHeaders.set("X-Edge-Cache", "MISS");

        response = new Response(imageRes.body, {
          status: imageRes.status,
          statusText: imageRes.statusText,
          headers: newHeaders,
        });

        // Store in Cloudflare edge cache asynchronously
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
      } else {
        // Cache HIT - update header
        const hitHeaders = new Headers(response.headers);
        hitHeaders.set("X-Edge-Cache", "HIT");
        hitHeaders.set("Access-Control-Allow-Origin", "*");
        response = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: hitHeaders,
        });
      }

      return response;
    }

    return new Response("Not Found", { status: 404 });
  },
};
