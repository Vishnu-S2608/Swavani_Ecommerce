"""
Quick utility to create a neutral placeholder depth map (flat grey = no parallax shift).
Run once to avoid 404 errors until the real depth map is generated.

Usage: python scripts/make-placeholder-depth.py
"""
from PIL import Image
img = Image.new("L", (1280, 720), 128)  # 128 = mid grey = zero shift
img.save("public/videos/hero-silk-depth.png")
print("✓ Placeholder depth map saved to public/videos/hero-silk-depth.png")
print("  Replace with real depth map: python scripts/make-depth-map.py public/videos/hero-silk-poster.jpg")
