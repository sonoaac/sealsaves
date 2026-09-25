import Image from "next/image";
import Link from "next/link";
import logoMark from "@/assets/brand/logo-s2-transparent.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center gap-2.5 ${className}`} aria-label="SealSaves home">
      {/* width/height attrs keep it small even before CSS loads */}
      <Image src={logoMark} alt="" width={67} height={56} className="h-14 w-auto shrink-0" />
      <span className="font-pixel text-xl font-bold tracking-wide">
        SEAL<span className="text-pitch">SAVES</span>
      </span>
    </Link>
  );
}
