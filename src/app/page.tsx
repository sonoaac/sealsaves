import Image from "next/image";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { TikTokButton } from "@/components/TikTokButton";
import { PRODUCTS, isDeal } from "@/lib/products";
import { CONTACT_EMAIL, NAV_LINKS, TIKTOK_SHOP_URL } from "@/lib/site";
import heroImage from "@/assets/seal-goalkeeper.png";

const featured = PRODUCTS.filter((p) => p.featured);
const deals = PRODUCTS.filter(isDeal);
const gaming = PRODUCTS.filter((p) => p.category === "gaming");
const tech = PRODUCTS.filter((p) => p.category === "tech");

function SectionHeading({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-pixel text-xs uppercase tracking-[0.2em] text-seal">{kicker}</p>
        <h2 className="mt-2 font-pixel text-3xl font-bold uppercase sm:text-4xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ProductGrid({ items }: { items: typeof PRODUCTS }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <Image
            src={heroImage}
            alt="A voxel seal goalkeeper in a green SealSaves jersey diving to save a football under stadium lights"
            fill
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="-z-10 object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/10 md:bg-gradient-to-r md:from-night md:via-night/75 md:to-transparent" />

          <div className="mx-auto flex min-h-[min(78svh,760px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-40 sm:px-6 md:min-h-[min(82svh,820px)] md:justify-center md:pb-20">
            <p className="font-pixel text-xs uppercase tracking-[0.25em] text-pitch">Now live on TikTok Shop</p>
            <h1 className="mt-4 font-pixel text-4xl font-bold uppercase leading-[0.95] min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
              Save more.
              <br />
              <span className="text-pitch">Shop smarter.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-mist">
              Discover great tech, gaming, electronics and everyday finds at prices worth checking out.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <TikTokButton className="px-7 py-3.5 text-base" />
              <a
                href="#featured"
                className="inline-flex min-h-11 items-center border-2 border-white/30 px-6 font-pixel text-sm font-bold uppercase transition-colors hover:border-white"
              >
                Browse finds
              </a>
            </div>
          </div>
        </section>

        {/* Value strip */}
        <section aria-label="Why SealSaves" className="border-y-2 border-pitch/30 bg-night-2">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-px px-4 sm:grid-cols-3 sm:px-6">
            {[
              ["Hand-picked", "Only finds we'd actually buy"],
              ["Real deals", "Prices checked before we post"],
              ["Secure checkout", "Paid safely through TikTok Shop"],
            ].map(([title, text]) => (
              <li key={title} className="flex items-center gap-3 py-5">
                <span className="size-3 shrink-0 bg-seal" aria-hidden="true" />
                <p>
                  <span className="font-pixel text-sm font-bold uppercase text-pitch">{title}</span>
                  <span className="block text-sm text-mist">{text}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="pitch-grid">
          <section id="featured" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <SectionHeading kicker="Shop" title="Featured Finds">
              <TikTokButton variant="outline" label="See full shop" />
            </SectionHeading>
            <ProductGrid items={featured} />
          </section>

          <section id="deals" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <div className="border-2 border-seal/60 bg-gradient-to-br from-seal/15 to-transparent p-5 sm:p-8">
              <SectionHeading kicker="Price drops" title="Deals">
                <p className="max-w-xs text-sm text-mist">Limited stock — prices can change on TikTok Shop.</p>
              </SectionHeading>
              <ProductGrid items={deals} />
            </div>
          </section>

          <section id="gaming" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <SectionHeading kicker="Level up" title="Gaming" />
            <ProductGrid items={gaming} />
          </section>

          <section id="tech" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <SectionHeading kicker="Upgrade" title="Tech" />
            <ProductGrid items={tech} />
          </section>
        </div>

        {/* About */}
        <section id="about" className="border-t-2 border-white/10 bg-night-2">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-pitch/40 pixel-shadow">
              <Image
                src={heroImage}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[60%_30%]"
              />
            </div>
            <div>
              <p className="font-pixel text-xs uppercase tracking-[0.2em] text-seal">About SealSaves</p>
              <h2 className="mt-2 font-pixel text-3xl font-bold uppercase sm:text-4xl">Every save counts.</h2>
              <p className="mt-5 text-mist">
                SealSaves is a small shop on a simple mission: find the tech, gaming gear and everyday stuff people
                actually want — and get it to you for less. We test, compare and only post the finds worth your money.
              </p>
              <p className="mt-4 text-mist">
                For now, all orders are placed and paid for through TikTok Shop, so your checkout, payment and
                order tracking are handled securely there.
              </p>
              <TikTokButton className="mt-8" label="Follow & shop" />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <p className="font-pixel text-xs uppercase tracking-[0.2em] text-seal">Contact</p>
          <h2 className="mt-2 font-pixel text-3xl font-bold uppercase sm:text-4xl">Questions? Ping the seal.</h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">
            Order questions are fastest through TikTok Shop messages. For anything else — partnerships, product
            requests or feedback — email us.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-11 items-center bg-seal px-6 font-pixel text-sm font-bold uppercase text-night transition-colors hover:bg-[#ff62ae] pixel-shadow"
            >
              {CONTACT_EMAIL}
            </a>
            <TikTokButton variant="outline" label="Message on TikTok" />
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-pitch/30 bg-night-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <Logo />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-pitch">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={TIKTOK_SHOP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-pitch">
                  TikTok Shop
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="border-t border-white/10 py-5 text-center text-xs text-mist/60">
          © {new Date().getFullYear()} SealSaves. Purchases are processed by TikTok Shop.
        </p>
      </footer>
    </>
  );
}
