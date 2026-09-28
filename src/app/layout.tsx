import type { Metadata, Viewport } from "next";
import { DM_Sans, Silkscreen } from "next/font/google";
import "./globals.css";

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const pixel = Silkscreen({
  variable: "--font-silkscreen",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "SealSaves — Save More. Shop Smarter.",
  description:
    "Great tech, gaming, electronics and everyday finds at prices worth checking out. Shop SealSaves on TikTok.",
  openGraph: {
    title: "SealSaves — Save More. Shop Smarter.",
    description: "Tech, gaming and everyday finds at prices worth checking out.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070d1f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${body.variable} ${pixel.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
