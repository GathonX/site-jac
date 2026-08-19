import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteNav() {
  return (
    <nav className="glass sticky top-0 z-50 w-full !border-x-0 !border-t-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-6 lg:px-8">
        <Link to="/">
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/excursions" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hidden sm:inline-block">
            Excursions
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hidden sm:inline-block">
            About
          </Link>
          <Button className="hidden sm:inline-flex text-sm font-semibold" variant="gradient-ocean" asChild>
            <Link to="/contact">Contact us</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
