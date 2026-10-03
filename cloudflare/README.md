# ☁️ Cloudflare Free Tier Image Fetching & Edge Caching Guide

This setup allows your Swavani Saree store to fetch, proxy, and cache images across Cloudflare's global edge network **100% free** (100,000 requests/day).

---

## 🚀 Setup Steps (Takes ~2 minutes)

### Step 1: Create a Free Cloudflare Account
If you don't have one, register at [dash.cloudflare.com](https://dash.cloudflare.com) (no credit card needed).

### Step 2: Create a Cloudflare Worker
1. In Cloudflare Dashboard, go to **Workers & Pages** in the left sidebar.
2. Click **Create Application** → **Create Worker**.
3. Name it: `swavani-images` (or anything you prefer).
4. Click **Deploy**.

### Step 3: Paste the Worker Code
1. Click **Edit code** on your newly created worker.
2. Delete the default template code.
3. Copy and paste the entire code from [`cloudflare/worker.js`](./worker.js).
4. Click **Save and Deploy**.

### Step 4: Add Worker URL to `.env.local`
1. Your worker will have a URL like:
   ```
   https://swavani-images.<your-subdomain>.workers.dev
   ```
2. Open `.env.local` in `swavani-store` and set:
   ```env
   NEXT_PUBLIC_CLOUDFLARE_WORKER_URL=https://swavani-images.<your-subdomain>.workers.dev
   ```

---

## ⚡ How It Works
- Whenever an image is requested, the client or frontend requests it through your Cloudflare worker:
  `https://swavani-images.workers.dev/fetch?url=<encoded_image_url>`
- **First request (Cache MISS)**: Worker fetches the image from the origin (Firebase Storage, Unsplash, external CDN), serves it, and caches it at Cloudflare's edge data center closest to the user.
- **Subsequent requests (Cache HIT)**: Cloudflare serves the cached image in <15ms directly from edge memory without re-fetching from origin.
- **Graceful Fallback**: If `NEXT_PUBLIC_CLOUDFLARE_WORKER_URL` is not set, all images load seamlessly from their normal URLs without any errors.
