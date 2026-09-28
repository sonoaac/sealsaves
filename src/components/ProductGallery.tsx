"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductImage } from "@/lib/products";

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center bg-night/80 text-white transition-colors hover:bg-pitch hover:text-night ${dir === "prev" ? "left-3" : "right-3"}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        {/* Pixel chevron */}
        {dir === "prev" ? (
          <path d="M14 5h2v2h-2V5Zm-2 2h2v2h-2V7Zm-2 2h2v2h-2V9Zm-2 2h2v2H8v-2Zm2 2h2v2h-2v-2Zm2 2h2v2h-2v-2Zm2 2h2v2h-2v-2Z" />
        ) : (
          <path d="M8 5h2v2H8V5Zm2 2h2v2h-2V7Zm2 2h2v2h-2V9Zm2 2h2v2h-2v-2Zm-2 2h2v2h-2v-2Zm-2 2h2v2h-2v-2Zm-2 2h2v2H8v-2Z" />
        )}
      </svg>
    </button>
  );
}

type GalleryProps = {
  images: ProductImage[];
  name: string;
  /** Pass index + onIndexChange to control the gallery from outside (e.g. a color picker). */
  index?: number;
  onIndexChange?: (i: number) => void;
};

export function ProductGallery({ images, name, index: controlled, onIndexChange }: GalleryProps) {
  const [own, setOwn] = useState(0);
  const index = controlled ?? own;
  const setIndex = onIndexChange ?? setOwn;
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const go = (i: number) => setIndex((i + count) % count);
  const current = images[index];

  return (
    <div
      className="flex flex-col gap-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} photos`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div
        className="relative aspect-square overflow-hidden border-2 border-white/10 bg-black"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <Image
          key={index}
          src={current.src}
          alt={current.alt}
          fill
          placeholder="blur"
          loading="eager"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
        {count > 1 && (
          <>
            <Arrow dir="prev" onClick={() => go(index - 1)} />
            <Arrow dir="next" onClick={() => go(index + 1)} />
            <span className="absolute bottom-3 right-3 bg-night/80 px-2 py-1 font-pixel text-xs text-mist" aria-live="polite">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}: ${img.alt}`}
                aria-current={i === index}
                className={`relative block aspect-square w-full overflow-hidden border-2 bg-black transition-colors ${
                  i === index ? "border-pitch" : "border-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
