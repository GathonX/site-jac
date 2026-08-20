import logoMark from "@/assets/logo-mark.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
}

const sizes = {
  sm: { glyph: "h-8", text: "text-xs" },
  md: { glyph: "h-10", text: "text-sm sm:text-base" },
  lg: { glyph: "h-14", text: "text-lg sm:text-xl" },
};

export function Logo({ size = "md", className = "", textClassName = "text-foreground" }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={logoMark} alt="" className={`${s.glyph} w-auto shrink-0 drop-shadow-sm`} />
      <span className={`font-display font-bold tracking-tight leading-tight whitespace-nowrap ${s.text} ${textClassName}`}>
        Nosy Be Secret Islands
      </span>
    </span>
  );
}
