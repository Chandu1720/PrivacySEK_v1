import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showTagline = false, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? "size-7" : size === "lg" ? "size-10" : "size-8.5";
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 ${className}`}
      aria-label="PrivacySEK home"
    >
      <img
        src="/logo-icon.png"
        alt="PrivacySEK emblem"
        className={`${iconSize} shrink-0 object-contain transition-transform duration-300 group-hover:scale-105`}
        width={36}
        height={36}
      />
      <div className="flex flex-col leading-none">
        <span className={`font-display ${textSize} font-extrabold tracking-tight text-foreground`}>
          PRIVACY<span className="bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">SEK</span>
        </span>
        {showTagline && (
          <span className="mt-1 font-sans text-[11px] font-medium tracking-normal text-muted-foreground">
            Protect your privacy
          </span>
        )}
      </div>
    </Link>
  );
}
