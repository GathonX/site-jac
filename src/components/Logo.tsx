import { Compass } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
}

const sizes = {
  sm: { glyph: "w-7 h-7", icon: "w-4 h-4", text: "text-lg" },
  md: { glyph: "w-9 h-9", icon: "w-5 h-5", text: "text-[22px]" },
  lg: { glyph: "w-12 h-12", icon: "w-6 h-6", text: "text-2xl" },
};

export function Logo({ size = "md", className = "", textClassName = "text-primary" }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`${s.glyph} rounded-full bg-gradient-to-br from-sky to-primary flex items-center justify-center shadow-sm shadow-primary/30 shrink-0`}>
        <Compass className={`${s.icon} text-white`} strokeWidth={2.25} />
      </span>
      <span className={`font-display font-bold tracking-tight ${s.text} ${textClassName}`}>
        JacTour
      </span>
    </span>
  );
}
