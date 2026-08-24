import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLang } from "@/hooks/useLang";

interface SiteNavProps {
  /** Starts transparent over a photo hero, switches to solid once scrolled past it. */
  transparentOverHero?: boolean;
  /** Fraction of the viewport height to scroll before switching to solid (only used when transparentOverHero). */
  scrollThreshold?: number;
}

export function SiteNav({ transparentOverHero = false, scrollThreshold = 0.7 }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(!transparentOverHero);
  const { t } = useTranslation();
  const { localize } = useLang();

  useEffect(() => {
    if (!transparentOverHero) return;
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * scrollThreshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentOverHero, scrollThreshold]);

  const solid = !transparentOverHero || scrolled;
  const linkClass = `text-sm font-medium transition-colors hidden sm:inline-block ${solid ? "text-foreground/80 hover:text-foreground" : "text-background/90 hover:text-background"}`;

  return (
    <nav
      className={`${transparentOverHero ? "fixed" : "sticky"} top-0 w-full z-50 !border-x-0 !border-t-0 transition-colors duration-300 ${solid ? "glass" : "glass-dark"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[92px] px-6 lg:px-8">
        <Link to={localize("/")}>
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to={localize("/excursions")} className={linkClass}>
            {t("nav.excursions")}
          </Link>
          <Link to={localize("/about")} className={linkClass}>
            {t("nav.about")}
          </Link>
          <LanguageSwitcher
            className={`hidden sm:inline-flex ${solid ? "text-foreground/80 hover:bg-muted hover:text-foreground" : "text-background/90 hover:bg-white/10 hover:text-background"}`}
          />
          <Button className="hidden sm:inline-flex text-sm font-semibold" variant="gradient-ocean" asChild>
            <Link to={localize("/contact")}>{t("nav.contactCta")}</Link>
          </Button>
          <MobileNav triggerClassName={solid ? "text-foreground hover:bg-muted" : "text-background hover:bg-white/10"} />
        </div>
      </div>
    </nav>
  );
}
