// Central site config. Set NEXT_PUBLIC_TIKTOK_SHOP_URL in .env.local
// (and in Vercel) once the TikTok Shop storefront link is final.
export const TIKTOK_SHOP_URL =
  process.env.NEXT_PUBLIC_TIKTOK_SHOP_URL ?? "https://www.tiktok.com/@sealsaves";

export const CONTACT_EMAIL = "hello@sealsaves.com";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/#featured" },
  { label: "Deals", href: "/#deals" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
