"""
scripts/make-depth-map.py
─────────────────────────────────────────────────────────────────────────────
Generates a grayscale depth map (white = near, black = far) from a poster image.
The depth map is used by DepthParallaxVideo.tsx to apply the 3D parallax shader.

Requirements:
  pip install transformers torch pillow numpy

Usage:
  python scripts/make-depth-map.py public/videos/hero-silk-poster.jpg

Output:
  public/videos/hero-silk-depth.png   ← same folder, same name, -depth.png suffix

Quality tips:
  - Check that foreground silk is clearly BRIGHTER than the background.
  - If inverted (background is bright), uncomment the `depth = 1.0 - depth` line.
  - Increase blur_radius (4-6) if you see tearing at edges during cursor movement.
  - Use a poster from the MIDDLE of the clip if the scene changes a lot.
─────────────────────────────────────────────────────────────────────────────
"""

import sys
import numpy as np
from PIL import Image, ImageFilter

BLUR_RADIUS = 3   # increase to 4-6 if edge tearing appears

def make_depth_map(src_path: str) -> None:
    dst_path = src_path.replace("-poster.jpg", "-depth.png").replace("-poster.jpeg", "-depth.png")
    if dst_path == src_path:
        # fallback: append -depth before extension
        parts = src_path.rsplit(".", 1)
        dst_path = parts[0] + "-depth.png"

    print(f"Loading depth model (Depth-Anything-V2-Small)…")
    try:
        from transformers import pipeline
    except ImportError:
        print("ERROR: transformers not installed. Run: pip install transformers torch pillow numpy")
        sys.exit(1)

    pipe = pipeline(
        "depth-estimation",
        model="depth-anything/Depth-Anything-V2-Small-hf",
    )

    img = Image.open(src_path).convert("RGB")
    print(f"Running depth estimation on {src_path}  ({img.width}×{img.height})…")
    result = pipe(img)
    depth = np.array(result["depth"]).astype("float32")

    # Normalise to 0…1
    depth = (depth - depth.min()) / (depth.max() - depth.min() + 1e-8)

    # Near MUST be WHITE in the shader (d > 0.5 → shifted forward).
    # If the result looks inverted (background is bright), uncomment the next line:
    # depth = 1.0 - depth

    # Resize to match source, then blur for smoother parallax transitions
    out = Image.fromarray((depth * 255).astype("uint8")).resize(img.size, Image.LANCZOS)
    out = out.filter(ImageFilter.GaussianBlur(BLUR_RADIUS))
    out.save(dst_path)
    print(f"✓ Depth map saved → {dst_path}")
    print(f"  Place it at: public/videos/  (same folder as the mp4/poster)")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/make-depth-map.py public/videos/hero-silk-poster.jpg")
        sys.exit(1)
    make_depth_map(sys.argv[1])
