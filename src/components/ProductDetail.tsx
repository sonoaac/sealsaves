"use client";

import { useState } from "react";
import { type Product, tiktokLink } from "@/lib/products";
import { CATEGORY_STYLE, ProductPlaceholder } from "./ProductCard";
import { ProductGallery } from "./ProductGallery";
import { ColorCube, ConditionChips, ModelList, Price } from "./ProductMeta";
import { TikTokButton } from "./TikTokButton";

/** Gallery + info column. Client-side so the color picker can drive the title and photo. */
export function ProductDetail({ product }: { product: Product }) {
  const colors = product.colors ?? [];
  // Position of a color's photo in the gallery, matched by file (-1 if it has none).
  const photoFor = (i: number) => {
    const img = colors[i]?.image;
    return img ? (product.images ?? []).findIndex((p) => p.src.src === img.src) : -1;
  };
  const firstInStock = Math.max(0, colors.findIndex((c) => c.inStock));
  const [colorIdx, setColorIdx] = useState(firstInStock);
  const [photo, setPhoto] = useState(Math.max(0, photoFor(firstInStock)));
  const color = colors[colorIdx];

  const pick = (i: number) => {
    setColorIdx(i);
    const at = photoFor(i);
    if (at >= 0) setPhoto(at);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      {product.images?.length ? (
        <ProductGallery images={product.images} name={product.name} index={photo} onIndexChange={setPhoto} />
      ) : (
        <ProductPlaceholder category={product.category} className="aspect-square border-2 border-white/10" />
      )}

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
          <span className="bg-night-3 px-2 py-1 font-pixel text-[0.7rem] uppercase tracking-wider text-mist">
            {CATEGORY_STYLE[product.category].label}
          </span>
          {product.badge && (
            <span className="bg-seal px-2 py-1 font-pixel text-[0.7rem] font-bold uppercase text-night">
              {product.badge}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
          {product.name}
          {color && <span className="text-mist"> - {color.name}</span>}
        </h1>
        {color && !color.inStock && (
          <p className="mt-2 font-pixel text-sm font-bold uppercase text-seal">Out of stock</p>
        )}

        <ConditionChips conditions={product.conditions} className="mt-3" />
        <p className="mt-3 text-lg text-mist">{product.blurb}</p>
        <div className="mt-6">
          <Price product={product} size="lg" />
        </div>

        {colors.length > 0 && (
          <div className="mt-6">
            <h2 className="font-pixel text-sm font-bold uppercase tracking-wider text-seal">Color</h2>
            <div role="radiogroup" aria-label="Color" className="mt-3 flex flex-wrap gap-3">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={i === colorIdx}
                  aria-label={`${c.name}${c.inStock ? "" : ", out of stock"}`}
                  title={c.name}
                  onClick={() => pick(i)}
                  className={`grid size-14 place-items-center border-2 transition-all ${
                    i === colorIdx ? "-translate-y-0.5 border-pitch bg-pitch/10" : "border-transparent hover:border-white/30"
                  }`}
                >
                  <ColorCube hex={c.hex} inStock={c.inStock} className="size-10" />
                </button>
              ))}
            </div>
          </div>
        )}

        <TikTokButton href={tiktokLink(product)} label="Buy on TikTok" className="mt-6 w-full py-4 text-base sm:w-auto" />
        <p className="mt-3 text-sm text-mist/70">
          {product.conditions?.some((c) => c !== "New")
            ? "Pick your model, storage and condition on TikTok Shop. Price varies by condition. "
            : ""}
          Checkout, payment and shipping are handled securely by TikTok Shop. Final price shown there.
        </p>

        {product.models && (
          <div className="mt-8 border-t-2 border-white/10 pt-6">
            <ModelList models={product.models} />
          </div>
        )}

        {product.highlights && (
          <div className="mt-8 border-t-2 border-white/10 pt-6">
            <h2 className="font-pixel text-sm font-bold uppercase tracking-wider text-seal">Highlights</h2>
            <ul className="mt-4 space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-mist">
                  <span className="mt-2 size-2 shrink-0 bg-pitch" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
