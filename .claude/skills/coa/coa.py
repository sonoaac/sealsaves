"""COA (Crop On Ask): fit an image to an aspect ratio without cutting the focus area.

usage: python coa.py IN OUT --aspect 1:1 [--mode auto|crop|pad] [--focus x0,y0,x1,y1]
                     [--margin 0.04] [--min-side 1024]
"""
import argparse
import sys
from collections import Counter

from PIL import Image, ImageFilter


def parse_aspect(s):
    w, h = (float(v) for v in s.replace("x", ":").split(":"))
    return w / h


def edge_color(img):
    """Most common colour along the border, used to pad without a visible seam."""
    rgb = img.convert("RGBA")
    w, h = rgb.size
    px = rgb.load()
    border = [px[x, 0] for x in range(w)] + [px[x, h - 1] for x in range(w)]
    border += [px[0, y] for y in range(h)] + [px[w - 1, y] for y in range(h)]
    # Quantize so slight JPEG noise still groups together
    q = Counter(tuple(c // 8 * 8 for c in p) for p in border)
    return q.most_common(1)[0][0]


def crop_box(size, aspect, focus):
    """Largest box of the given aspect that contains `focus`, centred on it. None if impossible."""
    W, H = size
    fx0, fy0, fx1, fy1 = focus
    fw, fh = fx1 - fx0, fy1 - fy0
    # Biggest aspect box that fits in the image
    if W / H > aspect:
        bh, bw = H, H * aspect
    else:
        bw, bh = W, W / aspect
    if bw < fw or bh < fh:
        return None
    cx, cy = (fx0 + fx1) / 2, (fy0 + fy1) / 2
    x0 = min(max(cx - bw / 2, 0), W - bw)
    y0 = min(max(cy - bh / 2, 0), H - bh)
    # Shift so the focus box is fully inside (it fits, so this always succeeds)
    x0 = min(max(x0, fx1 - bw), fx0)
    y0 = min(max(y0, fy1 - bh), fy0)
    return round(x0), round(y0), round(x0 + bw), round(y0 + bh)


def pad_to(img, aspect):
    W, H = img.size
    if W / H > aspect:
        nw, nh = W, round(W / aspect)
    else:
        nw, nh = round(H * aspect), H
    mode = "RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB"
    src = img.convert(mode)
    ox, oy = (nw - W) // 2, (nh - H) // 2
    if mode == "RGBA" and src.getextrema()[-1][0] < 255:
        # Transparent image: pad with transparency
        canvas = Image.new(mode, (nw, nh), (0, 0, 0, 0))
        canvas.paste(src, (ox, oy))
        return canvas
    canvas = Image.new(mode, (nw, nh), edge_color(src)[: len(mode)])
    # Stretch the outermost rows/columns (lightly blurred) so gradients continue without a seam
    soft = src.filter(ImageFilter.BoxBlur(3))
    if ox:
        canvas.paste(soft.crop((0, 0, 1, H)).resize((ox, H)), (0, oy))
        canvas.paste(soft.crop((W - 1, 0, W, H)).resize((nw - ox - W, H)), (ox + W, oy))
    if oy:
        canvas.paste(soft.crop((0, 0, W, 1)).resize((W, oy)), (ox, 0))
        canvas.paste(soft.crop((0, H - 1, W, H)).resize((W, nh - oy - H)), (ox, oy + H))
    canvas.paste(src, (ox, oy))
    return canvas


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--aspect", required=True, help="e.g. 1:1, 16:9, 4:3")
    ap.add_argument("--mode", choices=["auto", "crop", "pad"], default="auto")
    ap.add_argument("--focus", help="x0,y0,x1,y1 in source pixels that must stay visible")
    ap.add_argument("--margin", type=float, default=0.04, help="extra room around focus, as a fraction")
    ap.add_argument("--min-side", type=int, default=1024)
    a = ap.parse_args()

    img = Image.open(a.src)
    img.load()
    W, H = img.size
    aspect = parse_aspect(a.aspect)

    if a.focus:
        fx0, fy0, fx1, fy1 = (float(v) for v in a.focus.split(","))
    else:
        fx0, fy0, fx1, fy1 = 0, 0, W, H
    m = a.margin * max(W, H)
    focus = (max(0, fx0 - m), max(0, fy0 - m), min(W, fx1 + m), min(H, fy1 + m))

    box = crop_box((W, H), aspect, focus) if a.mode != "pad" else None
    if box:
        out, how = img.crop(box), f"cropped to {box}"
    elif a.mode == "crop":
        sys.exit("COA: focus area doesn't fit this aspect without cutting it; use --mode pad")
    else:
        out, how = pad_to(img, aspect), "padded with edge colour"

    longest = max(out.size)
    if longest > a.min_side * 2:  # keep files reasonable, never upscale
        s = (a.min_side * 2) / longest
        out = out.resize((round(out.width * s), round(out.height * s)), Image.LANCZOS)
    note = "" if longest >= a.min_side else f" (source is small: {longest}px < {a.min_side}px, not upscaled)"

    if a.out.lower().endswith((".jpg", ".jpeg")):
        out.convert("RGB").save(a.out, quality=88, optimize=True)
    else:
        out.save(a.out, optimize=True)
    print(f"COA: {W}x{H} -> {out.width}x{out.height}, {how}{note}")


if __name__ == "__main__":
    main()
