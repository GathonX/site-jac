import logo from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-14",
  md: "h-20",
  lg: "h-28",
  xl: "h-40",
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  return <img src={logo} alt="Nosy Be Secret Islands Tours" className={`${sizes[size]} w-auto ${className}`} />;
}
