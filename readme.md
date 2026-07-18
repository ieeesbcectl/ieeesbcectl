# IEEE SB CECTL Website Guidelines

## Ideal Image Resolutions

Based on the implementation details in `styles.css`, here are the exact resolutions you should be aiming for to save maximum bandwidth while keeping the images perfectly crisp on high-DPI (Retina) displays (which require 2x the rendered resolution).

### 1. Execom Members Images
The CSS strictly locks these cards to a tiny size:
- `width: 160px;`
- `aspect-ratio: 4 / 5;`

This means the images are rendered on the screen at exactly 160px by 200px.
- **Ideal Upload Resolution:** 320 x 400 pixels (this accounts for the 2x Retina display scaling).
- **Verdict:** Uploading a high-res photo for this is a massive waste of bandwidth, as the browser will aggressively crush it down to a 160x200 box anyway.

### 2. Activities Card Images
These cards are fluid and scale based on screen size:
- The grid scales dynamically based on `minmax(300px, 1fr)`.
- At maximum desktop stretch, the image height caps at 280px.

Depending on the viewport, the card width fluctuates between ~300px and ~500px, and the max height caps at 280px.
- **Ideal Upload Resolution:** 1000 x 560 pixels (or roughly any 16:9 equivalent under 1000px wide). This easily covers the maximum possible stretch (500px * 2 = 1000px) and height (280px * 2 = 560px).
- **Verdict:** Because you are using `object-fit: contain;`, any resolution larger than ~1000px wide is completely unnecessary overhead.

### Summary Strategy for AVIF Workflow
- **Execom:** Crop to 4:5 ratio, resize to 320x400, then convert to AVIF. These should easily be < 15KB each.
- **Activities:** Resize width to a maximum of 1000px, then convert to AVIF. These should easily be < 50KB each.