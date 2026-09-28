import Image from "next/image";
import Link from "next/link";
import logoMark from "@/assets/brand/logo-s2-transparent.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center gap-2.5 ${className}`} aria-label="SealSaves home">
      <Image src={logoMark} alt="" width={67} height={56} loading="eager" className="shrink-0" style={{ width: 67, height: 56 }} />
      <span className="font-pixel text-xl font-bold tracking-wide">
        SEAL<span className="text-pitch">SAVES</span>
      </span>
    </Link>
  );
}
