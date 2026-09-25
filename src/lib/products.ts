import type { StaticImageData } from "next/image";
import { TIKTOK_SHOP_URL } from "./site";

import t7BlackFront from "@/assets/products/gamesir-t7/01-black-front.jpg";
import t7WhiteFront from "@/assets/products/gamesir-t7/02-white-front.jpg";
import t7WhiteAngle from "@/assets/products/gamesir-t7/03-white-angle.jpg";
import t7Colors from "@/assets/products/gamesir-t7/04-colors.webp";
import t7Features from "@/assets/products/gamesir-t7/05-features.jpg";
import t7Compat from "@/assets/products/gamesir-t7/06-compatibility.webp";
import t7Box from "@/assets/products/gamesir-t7/07-in-the-box.jpg";

export type Category = "gaming" | "tech" | "everyday";

export type ProductImage = { src: StaticImageData; alt: string };

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
  /** First image is the main card photo; the rest appear in the gallery. */
  images?: ProductImage[];
  /** Bullet points shown on the product page. */
  highlights?: string[];
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
    images: [
      { src: t7BlackFront, alt: "GameSir T7 wired controller in black with blue-lit thumbsticks, front view" },
      { src: t7WhiteFront, alt: "GameSir T7 in white with orange D-pad and A/B buttons, front view" },
      { src: t7WhiteAngle, alt: "GameSir T7 in white, angled view showing the grip and triggers" },
      { src: t7Colors, alt: "GameSir T7 in translucent red, translucent blue and white" },
      { src: t7Features, alt: "GameSir T7 feature callouts: Hall effect sticks and triggers, headphone jack, rumble motors" },
      { src: t7Compat, alt: "GameSir T7 held in hands, compatible with Xbox Series X|S, Xbox One, Steam and Windows" },
      { src: t7Box, alt: "What's in the box: GameSir T7 controller, 3m USB-C cable, manual and Game Pass card" },
    ],
    highlights: [
      "Hall effect sticks and triggers — no stick drift",
      "Designed for Xbox Series X|S and Xbox One, works on Windows 10/11 and Steam",
      "3.5mm headphone jack and four rumble motors",
      "Detachable 3m USB-C cable included",
      "Available in black, white, translucent red and translucent blue",
    ],
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

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const tiktokLink = (p: Product) => p.tiktokUrl ?? TIKTOK_SHOP_URL;

export const isDeal = (p: Product) => p.compareAt !== undefined && p.compareAt > p.price;

export const savingsPercent = (p: Product) =>
  p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
