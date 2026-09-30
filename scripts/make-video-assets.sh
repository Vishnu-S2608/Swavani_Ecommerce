#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/make-video-assets.sh
# Converts a raw source video into optimised web assets for the depth-parallax hero.
#
# Usage:
#   ./scripts/make-video-assets.sh <source.mp4> <asset-name> [width]
#
# Example:
#   ./scripts/make-video-assets.sh ~/raw/silk-ribbon.mp4 hero-silk 1280
#
# Output (all inside public/videos/):
#   hero-silk.mp4          ← H.264, no audio, fast-start
#   hero-silk.webm         ← VP9, smaller for Chrome/Firefox
#   hero-silk-poster.jpg   ← 1-second frame, used as fallback image + depth source
#
# After running this, generate the depth map:
#   python scripts/make-depth-map.py public/videos/hero-silk-poster.jpg
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SRC="${1:?Usage: $0 source.mp4 name [width]}"
NAME="${2:?Provide output name, e.g. hero-silk}"
W="${3:-1280}"
OUT="public/videos"
mkdir -p "$OUT"

echo "→ Encoding $NAME.mp4 (H.264, width=${W})..."
ffmpeg -y -i "$SRC" -an \
  -vf "scale=${W}:-2" \
  -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart \
  "$OUT/$NAME.mp4"

echo "→ Encoding $NAME.webm (VP9)..."
ffmpeg -y -i "$SRC" -an \
  -vf "scale=${W}:-2" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 \
  "$OUT/$NAME.webm"

echo "→ Extracting poster frame (t=1s)..."
ffmpeg -y -ss 00:00:01 -i "$SRC" \
  -frames:v 1 -vf "scale=${W}:-2" -q:v 3 \
  "$OUT/$NAME-poster.jpg"

echo ""
echo "✓ Done! Files in $OUT/:"
echo "  $NAME.mp4  |  $NAME.webm  |  $NAME-poster.jpg"
echo ""
echo "Next: generate depth map →"
echo "  python scripts/make-depth-map.py $OUT/$NAME-poster.jpg"
