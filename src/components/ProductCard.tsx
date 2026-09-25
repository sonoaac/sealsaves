import Image from "next/image";
import Link from "next/link";
import { type Category, type Product, formatPrice, isDeal, savingsPercent, tiktokLink } from "@/lib/products";
import { TikTokIcon } from "./TikTokButton";

export const CATEGORY_STYLE: Record<Category, { label: string; tile: string; icon: React.ReactNode }> = {
  gaming: {
    label: "Gaming",
    tile: "from-pitch/25 to-pitch-deep/5",
    icon: (
      // Gamepad
      <path d="M6 9h2v2h2v2H8v2H6v-2H4v-2h2V9Zm9 1h2v2h-2v-2Zm2 2h2v2h-2v-2ZM2 7h20v10h-6l-2 2h-4l-2-2H2V7Z" fillRule="evenodd" />
    ),
  },
  tech: {
    label: "Tech",
    tile: "from-seal/25 to-seal-deep/5",
    icon: (
      // Laptop
      <path d="M4 5h16v10H4V5Zm2 2v6h12V7H6ZM2 16h20v3H2v-3Z" fillRule="evenodd" />
    ),
  },
  everyday: {
    label: "Everyday",
    tile: "from-sky-400/25 to-sky-600/5",
    icon: (
      // Box
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7Zm2 1.6v7.1l6 2.7v-7.1L5 8.6Zm8 2.7v7.1l6-2.7V8.6l-6 2.7ZM12 5.2 6.4 7.7 12 10.2l5.6-2.5L12 5.2Z" fillRule="evenodd" />
    ),
  },
};

/** Icon tile shown for products that don't have photos yet. */
export function ProductPlaceholder({ category, className = "" }: { category: Category; className?: string }) {
  const cat = CATEGORY_STYLE[category];
  return (
    <div className={`grid place-items-center bg-gradient-to-br ${cat.tile} pitch-grid ${className}`}>
      <svg viewBox="0 0 24 24" className="size-1/4 text-white/80" fill="currentColor" aria-hidden="true">
        {cat.icon}
      </svg>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORY_STYLE[product.category];
  const deal = isDeal(product);
  const [main, alt] = product.images ?? [];
  const href = `/products/${product.slug}`;

  return (
    <article className="group flex flex-col border-2 border-white/10 bg-night-2 transition-colors hover:border-pitch/60">
      <Link href={href} className={`relative block aspect-square overflow-hidden ${main ? "bg-black" : "bg-night-2"}`} tabIndex={-1} aria-hidden="true">
        {main ? (
          <>
            <Image
              src={main.src}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${alt ? "group-hover:opacity-0" : ""}`}
            />
            {alt && (
              <Image
                src={alt.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <ProductPlaceholder category={product.category} className="size-full transition-transform group-hover:scale-105" />
        )}
        <span className="absolute left-3 top-3 bg-night/80 px-2 py-1 font-pixel text-[0.65rem] uppercase tracking-wider text-mist">
          {cat.label}
        </span>
        {product.badge && (
          <span className="absolute right-3 top-3 bg-seal px-2 py-1 font-pixel text-[0.65rem] font-bold uppercase text-night">
            {product.badge}
          </span>
        )}
        {product.images && product.images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-night/80 px-2 py-1 text-[0.7rem] font-semibold text-mist">
            {product.images.length} photos
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold leading-snug">
          <Link href={href} className="hover:text-pitch">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-mist/80">{product.blurb}</p>

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-pixel text-xl font-bold text-pitch">{formatPrice(product.price)}</span>
          {deal && (
            <>
              <span className="text-sm text-mist/60 line-through">{formatPrice(product.compareAt!)}</span>
              <span className="text-xs font-bold text-seal">-{savingsPercent(product)}%</span>
            </>
          )}
        </div>

        <a
          href={tiktokLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 border-2 border-pitch font-pixel text-xs font-bold uppercase text-pitch transition-colors hover:bg-pitch hover:text-night"
        >
          <TikTokIcon className="size-4" />
          Buy on TikTok
          <span className="sr-only">: {product.name} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
