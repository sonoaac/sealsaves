import { TIKTOK_SHOP_URL } from "./site";

export type Category = "gaming" | "tech" | "everyday";

export type Product = {
  slug: string;
  name: string;
  blurb: string;
  category: Category;
  price: number;
  /** Original price, shown struck through when the item is on deal. */
  compareAt?: number;
  badge?: string;
  featured?: boolean;
  /** Direct TikTok Shop product link. Falls back to the storefront. */
  tiktokUrl?: string;
};

// Sample catalog — replace prices and add per-product TikTok links.
// This will move to the database (products table) in a later phase.
export const PRODUCTS: Product[] = [
  {
    slug: "gamesir-t7",
    name: "GameSir T7 Wired Controller",
    blurb: "Hall-effect sticks, Xbox & PC ready, zero drift.",
    category: "gaming",
    price: 33.0,
    compareAt: 39.99,
    badge: "Top Save",
    featured: true,
  },
  {
    slug: "logitech-g305",
    name: "Logitech G305 Lightspeed",
    blurb: "Wireless gaming mouse with HERO sensor and 250hr battery.",
    category: "gaming",
    price: 49.99,
    featured: true,
  },
  {
    slug: "macbook-air",
    name: "MacBook Air",
    blurb: "Thin, silent, all-day battery. Check TikTok for current specs.",
    category: "tech",
    price: 899.0,
    compareAt: 999.0,
    badge: "Deal",
    featured: true,
  },
  {
    slug: "usb-c-hub",
    name: "7-in-1 USB-C Hub",
    blurb: "HDMI 4K, SD, 100W passthrough. One cable, every port.",
    category: "tech",
    price: 24.99,
    compareAt: 34.99,
  },
  {
    slug: "wireless-earbuds",
    name: "Wireless Earbuds",
    blurb: "Noise-cancelling buds with a pocket-sized charging case.",
    category: "tech",
    price: 29.99,
  },
  {
    slug: "rgb-headset",
    name: "RGB Gaming Headset",
    blurb: "7.1 surround, detachable mic, soft memory-foam cups.",
    category: "gaming",
    price: 27.5,
    compareAt: 44.99,
    badge: "Hot",
    featured: true,
  },
  {
    slug: "led-strip",
    name: "Smart LED Strip Lights",
    blurb: "App-controlled, music sync, 16 million colors.",
    category: "everyday",
    price: 15.99,
    compareAt: 22.99,
  },
  {
    slug: "desk-mat",
    name: "XL Desk Mat",
    blurb: "Stitched edges, smooth glide, fits keyboard and mouse.",
    category: "everyday",
    price: 12.99,
  },
];

export const tiktokLink = (p: Product) => p.tiktokUrl ?? TIKTOK_SHOP_URL;

export const isDeal = (p: Product) => p.compareAt !== undefined && p.compareAt > p.price;

export const savingsPercent = (p: Product) =>
  p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
