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

/** A Minecraft-style color block. Out-of-stock colors are dimmed with a slash. */
export function ColorCube({ hex, inStock = true, className = "size-5" }: { hex: string; inStock?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`voxel-cube relative block ${inStock ? "" : "opacity-40"} ${className}`}
      style={{ "--cube": hex } as React.CSSProperties}
    >
      {!inStock && (
        <span className="absolute left-1/2 top-1/2 h-[140%] w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
      )}
    </span>
  );
}

/** Mini color cubes for product cards. */
export function ColorDots({ product }: { product: Product }) {
  if (!product.colors?.length) return null;
  const inStock = product.colors.filter((c) => c.inStock).length;
  return (
    <div className="flex items-center gap-2.5">
      <ul className="flex gap-2">
        {product.colors.map((c) => (
          <li key={c.name} title={`${c.name}${c.inStock ? "" : " (out of stock)"}`}>
            <ColorCube hex={c.hex} inStock={c.inStock} className="size-4" />
            <span className="sr-only">
              {c.name}
              {c.inStock ? "" : " (out of stock)"}
            </span>
          </li>
        ))}
      </ul>
      <span className="text-xs text-mist/70">
        {inStock}/{product.colors.length} in stock
      </span>
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
