"use client";

import { useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import { Logo } from "./Logo";
import { TikTokButton } from "./TikTokButton";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="whitespace-nowrap text-sm font-semibold text-mist transition-colors hover:text-pitch">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <TikTokButton label="TikTok Shop" />
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center border-2 border-white/20 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-white/10 bg-night lg:hidden">
        <ul className="flex flex-col px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-pixel text-base text-mist hover:text-pitch"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3 pb-2">
            <TikTokButton className="w-full" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
