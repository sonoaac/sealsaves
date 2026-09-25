import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CATEGORY_STYLE, ProductCard, ProductPlaceholder } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ColorList, ConditionChips, ModelList, Price } from "@/components/ProductMeta";
import { TikTokButton } from "@/components/TikTokButton";
import { PRODUCTS, formatPrice, getProduct, tiktokLink } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const title =
    product.price === undefined
      ? `${product.name} | SealSaves`
      : `${product.name} — ${formatPrice(product.price)} | SealSaves`;
  return {
    title,
    description: product.blurb,
    openGraph: {
      title,
      description: product.blurb,
      images: product.images?.[0] ? [product.images[0].src.src] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <Header />

      <main className="flex-1 pitch-grid">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mist">
            <Link href="/" className="hover:text-pitch">
              Home
            </Link>
            <span className="mx-2 text-mist/40">/</span>
            <Link href={`/#${CATEGORY_STYLE[product.category].section}`} className="hover:text-pitch">
              {CATEGORY_STYLE[product.category].label}
            </Link>
            <span className="mx-2 text-mist/40">/</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {product.images?.length ? (
              <ProductGallery images={product.images} name={product.name} />
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

              <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>
              <ConditionChips conditions={product.conditions} className="mt-3" />
              <p className="mt-3 text-lg text-mist">{product.blurb}</p>

              <div className="mt-6">
                <Price product={product} size="lg" />
              </div>

              <TikTokButton href={tiktokLink(product)} label="Buy on TikTok" className="mt-6 w-full py-4 text-base sm:w-auto" />
              <p className="mt-3 text-sm text-mist/70">
                {product.conditions?.some((c) => c !== "New")
                  ? "Pick your model, storage and condition on TikTok Shop. Price varies by condition. "
                  : ""}
                Checkout, payment and shipping are handled securely by TikTok Shop. Final price shown there.
              </p>

              {(product.models || product.colors) && (
                <div className="mt-8 space-y-6 border-t-2 border-white/10 pt-6">
                  <ModelList models={product.models} />
                  <ColorList product={product} />
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

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="mb-6 font-pixel text-2xl font-bold uppercase">More {CATEGORY_STYLE[product.category].label}</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
