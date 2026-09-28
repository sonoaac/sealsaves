import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CATEGORY_STYLE, ProductCard } from "@/components/ProductCard";
import { ProductDetail } from "@/components/ProductDetail";
import { PRODUCTS, formatPrice, getProduct } from "@/lib/products";

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

          <ProductDetail product={product} />

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
