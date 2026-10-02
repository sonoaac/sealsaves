import type { StaticImageData } from "next/image";
import { TIKTOK_SHOP_URL } from "./site";

import t7BlackFront from "@/assets/products/gamesir-t7/01-black-front.jpg";
import t7WhiteFront from "@/assets/products/gamesir-t7/02-white-front.jpg";
import t7WhiteAngle from "@/assets/products/gamesir-t7/03-white-angle.jpg";
import t7Colors from "@/assets/products/gamesir-t7/04-colors.webp";
import t7Features from "@/assets/products/gamesir-t7/05-features.jpg";
import t7Compat from "@/assets/products/gamesir-t7/06-compatibility.webp";
import t7Box from "@/assets/products/gamesir-t7/07-in-the-box.jpg";

import g305Angle from "@/assets/products/logitech-g305/01-black-angle.jpg";
import g305Banner from "@/assets/products/logitech-g305/02-banner.webp";
import g305Features from "@/assets/products/logitech-g305/03-key-features.webp";
import g305BlackDiagram from "@/assets/products/logitech-g305/04-black-diagram.jpg";
import g305WhiteDiagram from "@/assets/products/logitech-g305/05-white-diagram.jpg";
import g305Underside from "@/assets/products/logitech-g305/06-underside.webp";
import g305Sensor from "@/assets/products/logitech-g305/07-hero-sensor.jpg";

import miniPink from "@/assets/products/instax-mini-13/01-pink-angle.jpg";
import miniPurple from "@/assets/products/instax-mini-13/02-purple-angle.jpg";
import miniColors from "@/assets/products/instax-mini-13/03-colors.jpg";
import miniWhite from "@/assets/products/instax-mini-13/04-white-close-up.jpg";
import miniBlueAlley from "@/assets/products/instax-mini-13/05-blue-bowling-alley.jpg";
import miniBlueBalls from "@/assets/products/instax-mini-13/06-blue-bowling-balls.jpg";
import miniAccessories from "@/assets/products/instax-mini-13/07-white-with-accessories.jpg";

export type Category = "gaming" | "tech" | "iphone" | "ipad" | "everyday";

export type Condition = "New" | "Used" | "Refurbished";

export type ProductImage = { src: StaticImageData; alt: string };

export type ColorOption = {
  name: string;
  hex: string;
  inStock: boolean;
  /** Gallery photo to jump to when this color is picked (one of the product's images). */
  image?: StaticImageData;
};

export type Product = {
  slug: string;
  name: string;
  blurb: string;
  category: Category;
  /** Omit to show "See price on TikTok" (e.g. devices priced per model/condition). */
  price?: number;
  /** Conditions this item is sold in. Omit for new-only items. */
  conditions?: Condition[];
  /** Specific models covered by this listing, e.g. "iPhone 14 Pro". */
  models?: string[];
  colors?: ColorOption[];
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
    colors: [
      { name: "Black", hex: "#1a1a1a", inStock: true, image: t7BlackFront },
      { name: "White", hex: "#f2f2f2", inStock: true, image: t7WhiteFront },
      { name: "Translucent Red", hex: "#d62a2a", inStock: false, image: t7Colors },
      { name: "Translucent Blue", hex: "#2b5fd9", inStock: false, image: t7Colors },
    ],
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
    ],
  },
  // --- iPhones: used & refurbished only ---
  {
    slug: "iphone-13",
    name: "iPhone 13 Series",
    blurb: "A15 Bionic, dual cameras, all-day battery. Tested and ready to go.",
    category: "iphone",
    conditions: ["Refurbished", "Used"],
    models: ["iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"],
  },
  {
    slug: "iphone-14",
    name: "iPhone 14 Series",
    blurb: "Crash Detection, Emergency SOS via satellite and a brighter camera.",
    category: "iphone",
    conditions: ["Refurbished", "Used"],
    models: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
  },
  {
    slug: "iphone-15",
    name: "iPhone 15 Series",
    blurb: "USB-C, Dynamic Island on every model and a 48MP main camera.",
    category: "iphone",
    conditions: ["Refurbished", "Used"],
    models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
  },
  {
    slug: "iphone-16",
    name: "iPhone 16 Series",
    blurb: "Built for Apple Intelligence, with Camera Control and the Action button.",
    category: "iphone",
    conditions: ["Refurbished", "Used"],
    models: ["iPhone 16e", "iPhone 16", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max"],
  },
  {
    slug: "iphone-17",
    name: "iPhone 17 Series",
    blurb: "The latest generation for less. Limited stock.",
    category: "iphone",
    conditions: ["Refurbished", "Used"],
    models: ["iPhone 17", "iPhone Air", "iPhone 17 Pro", "iPhone 17 Pro Max"],
  },
  // --- iPads: new & used ---
  {
    slug: "ipad-a16",
    name: "iPad (A16)",
    blurb: "The everyday iPad: 11-inch display, A16 chip, USB-C and Touch ID.",
    category: "ipad",
    conditions: ["New", "Used"],
  },
  {
    slug: "ipad-air",
    name: "iPad Air",
    blurb: "Thin, light and powerful. Works with Apple Pencil Pro and Magic Keyboard.",
    category: "ipad",
    conditions: ["New", "Used"],
    models: ["iPad Air 11-inch", "iPad Air 13-inch"],
  },
  {
    slug: "ipad-mini",
    name: "iPad mini",
    blurb: "Full iPad power in an 8.3-inch size that fits in one hand.",
    category: "ipad",
    conditions: ["New", "Used"],
  },
  {
    slug: "logitech-g305",
    name: "Logitech G305 Lightspeed",
    blurb: "Wireless gaming mouse with HERO sensor and 250hr battery.",
    category: "gaming",
    price: 49.99,
    featured: true,
    images: [
      { src: g305Angle, alt: "Logitech G305 Lightspeed wireless gaming mouse in black, angled view" },
      { src: g305Banner, alt: "Logitech G305 in black with its blue LED glowing, in front of rows of G305 mice" },
      { src: g305Features, alt: "G305 key features: Lightspeed wireless 1ms, HERO 12,000 DPI sensor, 250 hours battery, 99 grams, 6 programmable buttons" },
      { src: g305BlackDiagram, alt: "Black G305 diagram: DPI button, LED indicator, HERO 12K sensor, customizable buttons, receiver storage, on/off switch" },
      { src: g305WhiteDiagram, alt: "White G305 diagram showing the same buttons, sensor and on/off switch" },
      { src: g305Underside, alt: "Underside of the black G305 showing the HERO sensor, glide feet and power switch" },
      { src: g305Sensor, alt: "Close-up of the G305's glowing HERO sensor" },
    ],
    highlights: [
      "LIGHTSPEED wireless with a 1ms report rate — no cable, no lag",
      "HERO sensor: up to 12,000 DPI and 400 IPS",
      "Up to 250 hours of play on one AA battery, with low-battery indicator",
      "Just 99 grams for fast, easy movement",
      "6 programmable buttons and storage for the USB receiver inside the mouse",
      "Available in black and white",
    ],
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
    slug: "instax-mini-13",
    name: "Instax mini 13",
    blurb: "Point, shoot, print. Credit-card-sized instant photos in seconds.",
    category: "tech",
    price: 95.99,
    badge: "New",
    colors: [
      { name: "Pink", hex: "#e9c3d3", inStock: true, image: miniPink },
      { name: "Purple", hex: "#c8c2e8", inStock: true, image: miniPurple },
      { name: "White", hex: "#e8e9ee", inStock: true, image: miniWhite },
      { name: "Blue", hex: "#a7c3e2", inStock: true, image: miniBlueAlley },
      { name: "Green", hex: "#a6dcc3", inStock: true, image: miniColors },
    ],
    images: [
      { src: miniPink, alt: "Instax mini 13 instant camera in pink with matching wrist strap, angled view" },
      { src: miniPurple, alt: "Instax mini 13 in purple, angled view" },
      { src: miniColors, alt: "Instax mini 13 in white, pink, blue, purple and green" },
      { src: miniWhite, alt: "Instax mini 13 in white: twist the lens once to turn on, again for close-up mode" },
      { src: miniBlueAlley, alt: "Blue Instax mini 13 on a bowling alley floor surrounded by instant photos and pins" },
      { src: miniBlueBalls, alt: "Blue Instax mini 13 resting between bowling balls" },
      { src: miniAccessories, alt: "White Instax mini 13 shown with a case, photo frames, clips, string and a film pack (accessories not included)" },
    ],
    highlights: [
      "Twist the lens to turn it on, twist again for close-up shots",
      "Instax 60mm lens, focus range 0.3m to infinity",
      "Built-in flash and self-timer",
      "Prints credit-card-sized photos on Instax mini film (sold separately)",
      "Camera only. Case, frames, clips and film shown in photos are not included",
    ],
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

export const isDeal = (p: Product) =>
  p.price !== undefined && p.compareAt !== undefined && p.compareAt > p.price;

export const savingsPercent = (p: Product) =>
  p.price !== undefined && p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
