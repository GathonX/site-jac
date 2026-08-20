import logo from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-10",
  md: "h-12",
  lg: "h-16",
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  return <img src={logo} alt="Nosy Be Secret Islands" className={`${sizes[size]} w-auto ${className}`} />;
}
