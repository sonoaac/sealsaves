import { type Condition, type Product, formatPrice, isDeal, savingsPercent } from "@/lib/products";

const CONDITION_STYLE: Record<Condition, string> = {
  New: "border-pitch/60 text-pitch",
  Refurbished: "border-sky-400/60 text-sky-300",
  Used: "border-amber-400/60 text-amber-300",
};

export function ConditionChips({ conditions, className = "" }: { conditions?: Condition[]; className?: string }) {
  if (!conditions?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Available conditions">
      {conditions.map((c) => (
        <li key={c} className={`border px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide ${CONDITION_STYLE[c]}`}>
          {c}
        </li>
      ))}
    </ul>
  );
}

export function Price({ product, size = "sm" }: { product: Product; size?: "sm" | "lg" }) {
  const big = size === "lg";
  if (product.price === undefined) {
    return (
      <span className={`font-pixel font-bold text-pitch ${big ? "text-2xl" : "text-sm"}`}>See price on TikTok</span>
    );
  }
  const deal = isDeal(product);
  return (
    <span className="flex flex-wrap items-baseline gap-2">
      <span className={`font-pixel font-bold text-pitch ${big ? "text-4xl" : "text-xl"}`}>{formatPrice(product.price)}</span>
      {deal && (
        <>
          <span className={`text-mist/60 line-through ${big ? "text-lg" : "text-sm"}`}>{formatPrice(product.compareAt!)}</span>
          <span className={big ? "bg-seal/15 px-2 py-0.5 text-sm font-bold text-seal" : "text-xs font-bold text-seal"}>
            {big ? `Save ${savingsPercent(product)}%` : `-${savingsPercent(product)}%`}
          </span>
        </>
      )}
    </span>
  );
}

/** Compact dots for cards; out-of-stock colors are dimmed with a slash. */
export function ColorDots({ product }: { product: Product }) {
  if (!product.colors?.length) return null;
  const inStock = product.colors.filter((c) => c.inStock).length;
  return (
    <div className="flex items-center gap-2">
      <ul className="flex gap-1.5">
        {product.colors.map((c) => (
          <li
            key={c.name}
            title={`${c.name}${c.inStock ? "" : " — out of stock"}`}
            className={`relative size-4 border border-white/40 ${c.inStock ? "" : "opacity-35"}`}
            style={{ backgroundColor: c.hex }}
          >
            {!c.inStock && <span className="absolute left-1/2 top-[-2px] h-5 w-px -translate-x-1/2 rotate-45 bg-white" />}
            <span className="sr-only">
              {c.name}
              {c.inStock ? "" : " (out of stock)"}
            </span>
          </li>
        ))}
      </ul>
      <span className="text-xs text-mist/70">
        {inStock} of {product.colors.length} colors in stock
      </span>
    </div>
  );
}

/** Full color list for the product page. */
export function ColorList({ product }: { product: Product }) {
  if (!product.colors?.length) return null;
  return (
    <div>
      <h2 className="font-pixel text-sm font-bold uppercase tracking-wider text-seal">Colors</h2>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {product.colors.map((c) => (
          <li
            key={c.name}
            className={`flex min-h-11 items-center gap-3 border-2 px-3 py-2 ${
              c.inStock ? "border-white/15 bg-night-2" : "border-white/5 bg-night-2/40"
            }`}
          >
            <span
              className={`relative size-6 shrink-0 border border-white/40 ${c.inStock ? "" : "opacity-35"}`}
              style={{ backgroundColor: c.hex }}
              aria-hidden="true"
            >
              {!c.inStock && <span className="absolute left-1/2 top-[-3px] h-7 w-px -translate-x-1/2 rotate-45 bg-white" />}
            </span>
            <span className={`flex-1 font-semibold ${c.inStock ? "" : "text-mist/50"}`}>{c.name}</span>
            <span
              className={`shrink-0 whitespace-nowrap font-pixel text-[0.7rem] font-bold uppercase ${c.inStock ? "text-pitch" : "text-seal"}`}
            >
              {c.inStock ? "In stock" : "Out of stock"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ModelList({ models }: { models?: string[] }) {
  if (!models?.length) return null;
  return (
    <div>
      <h2 className="font-pixel text-sm font-bold uppercase tracking-wider text-seal">Models</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {models.map((m) => (
          <li key={m} className="border-2 border-white/15 bg-night-2 px-3 py-2 text-sm font-semibold">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
