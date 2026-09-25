import { NAV_LINKS, TIKTOK_SHOP_URL } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
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
  );
}
