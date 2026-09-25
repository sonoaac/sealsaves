import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="SealSaves home">
      <span className="grid size-10 place-items-center bg-seal font-pixel text-lg font-bold text-night pixel-shadow">
        SS
      </span>
      <span className="font-pixel text-xl font-bold tracking-wide">
        SEAL<span className="text-pitch">SAVES</span>
      </span>
    </Link>
  );
}
