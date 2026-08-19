import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/excursions", label: "Excursions" },
  { to: "/about", label: "About" },
];

export function MobileNav({ triggerClassName = "text-foreground" }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className={`sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${triggerClassName}`}
      >
        <Menu className="w-5 h-5" />
      </button>
      <SheetContent side="right" className="w-[280px] flex flex-col">
        <SheetTitle>
          <Logo size="sm" />
        </SheetTitle>
        <nav className="flex flex-col gap-1 mt-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-foreground py-3 px-2 rounded-lg hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <Button variant="gradient" className="w-full" asChild>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact us</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
