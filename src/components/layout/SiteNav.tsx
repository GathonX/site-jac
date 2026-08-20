import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";

interface SiteNavProps {
  /** Starts transparent over a photo hero, switches to solid once scrolled past it. */
  transparentOverHero?: boolean;
  /** Fraction of the viewport height to scroll before switching to solid (only used when transparentOverHero). */
  scrollThreshold?: number;
}

export function SiteNav({ transparentOverHero = false, scrollThreshold = 0.7 }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(!transparentOverHero);

  useEffect(() => {
    if (!transparentOverHero) return;
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * scrollThreshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentOverHero, scrollThreshold]);

  const solid = !transparentOverHero || scrolled;

  return (
    <nav
      className={`${transparentOverHero ? "fixed" : "sticky"} top-0 w-full z-50 !border-x-0 !border-t-0 transition-colors duration-300 ${solid ? "glass" : "glass-dark"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[92px] px-6 lg:px-8">
        <Link to="/">
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/excursions"
            className={`text-sm font-medium transition-colors hidden sm:inline-block ${solid ? "text-foreground/80 hover:text-foreground" : "text-background/90 hover:text-background"}`}
          >
            Excursions
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hidden sm:inline-block ${solid ? "text-foreground/80 hover:text-foreground" : "text-background/90 hover:text-background"}`}
          >
            About
          </Link>
          <Button className="hidden sm:inline-flex text-sm font-semibold" variant="gradient-ocean" asChild>
            <Link to="/contact">Contact us</Link>
          </Button>
          <MobileNav triggerClassName={solid ? "text-foreground hover:bg-muted" : "text-background hover:bg-white/10"} />
        </div>
      </div>
    </nav>
  );
}
