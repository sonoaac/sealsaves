---
name: coa
description: Crop On Ask (COA). Crop or pad an image the user provides so it fits a specific image holder on the SealSaves site (product card, gallery, hero, logo slot) while keeping the subject and any text/fonts in the image fully visible and readable. Run only when the user asks for COA or /coa.
disable-model-invocation: true
argument-hint: <image path> [holder: card | gallery | hero | about | logo | WxH]
---

# COA — Crop On Ask

Fit an image into one of the site's image holders without cutting off the product or any words printed in the image, and keep those words sharp.

## 1. Identify the holder

Ask which holder if the user didn't say. Holders on this site:

| Holder | Shape | How the site shows it | Where it lives |
|---|---|---|---|
| `card` | 1:1 square | `object-contain` on black | `src/components/ProductCard.tsx` |
| `gallery` | 1:1 square | `object-contain` on black | `src/components/ProductGallery.tsx` |
| `hero` | wide, ~16:9 | `object-cover`, focus `70% center` | `src/app/page.tsx` hero section |
| `about` | 4:3 | `object-cover`, focus `60% 30%` | `src/app/page.tsx` about section |
| `logo` | about 305:256 | transparent PNG, drawn 67×56 px | `src/components/Logo.tsx` |
| `WxH` | custom | as given | — |

If the code has changed, re-read the component to confirm the shape before cropping.

## 2. Look before cutting

Read the image (the Read tool shows it). Note:
- the **subject** (the product, the seal) and roughly where it sits
- every piece of **text** in the image: brand names, labels, feature callouts, badges
- the background: plain (white/black/flat colour) or busy (photo, scene)

## 3. Choose crop or pad

Run `.claude/skills/coa/coa.py` (Pillow only; works with the system Python):

```
python .claude/skills/coa/coa.py <in> <out> --aspect 1:1 [--mode auto|crop|pad] [--focus x0,y0,x1,y1] [--min-side 1024]
```

- `--focus` is the box (in source pixels) that **must stay fully visible**: the subject plus all text. Leave it out to keep the whole image.
- `--mode crop` cuts the image to the aspect, centred on the focus box. It refuses if the focus box can't fit, rather than cutting text.
- `--mode pad` keeps the whole image and fills the extra space with the image's edge colour, so nothing is lost. Use this for feature/infographic images full of text.
- `--mode auto` (default) crops when the focus box fits, otherwise pads.

Rules:
- **Never cut through text.** If any word would be clipped, pad instead.
- Leave a margin of roughly 4% around text and the subject, so nothing touches the edge.
- **Don't upscale small images to fake sharpness.** If the source is smaller than `--min-side`, the script keeps the original size and says so. Tell the user that a larger source image would look sharper.
- Images with lots of text in a small holder (card at ~280 px) may be unreadable at that size no matter how they're cropped. Say so, and suggest using that image only in the gallery.

## 4. Save

- Never overwrite the user's originals in `Images/`.
- Save into the product's asset folder, e.g. `src/assets/products/<slug>/NN-short-name.jpg` (`.png` if it needs transparency), named in gallery order.
- JPEG quality 88; PNG optimized.

## 5. Check it at real size

Make a preview at the size the holder actually displays (card ≈ 280 px, gallery ≈ 520 px, hero ≈ 1440 px wide, logo 67×56) and Read it. Confirm:
- the subject isn't cut off
- every word is fully inside the frame and readable at that size

If text isn't readable, say so plainly rather than calling it done. Then wire the image into `src/lib/products.ts` (or the component) as the user asked.

## Notes for this machine

- Windows Application Control blocks Python DLLs loaded from the Temp folder. If extra Python packages are ever needed (e.g. `rembg` for background removal), create the venv inside the project (`.venv-*`, add it to `.gitignore`) and delete it afterwards.
