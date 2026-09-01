import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLang } from "@/hooks/useLang";

export function MobileNav({ triggerClassName = "text-foreground" }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { localize } = useLang();
  const categories = t("experiences.categories", { returnObjects: true }) as { id: string; label: string }[];

  const links = [{ to: localize("/"), label: t("nav.home") }];
  const trailingLinks = [
    { to: localize("/galerie"), label: t("nav.gallery") },
    { to: localize("/tarifs"), label: t("nav.pricing") },
    { to: localize("/about"), label: t("nav.about") },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        type="button"
        aria-label={t("common.openMenu")}
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

          <div className="text-base font-medium text-foreground py-3 px-2">
            {t("nav.excursions")}
          </div>
          <div className="flex flex-col gap-0.5 pl-4 mb-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={localize(`/excursions/${cat.id}`)}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground py-2 px-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {trailingLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-foreground py-3 px-2 rounded-lg hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-2 mt-2">
            <LanguageSwitcher className="text-foreground hover:bg-muted" onNavigate={() => setOpen(false)} />
          </div>
        </nav>
        <div className="mt-auto pt-6">
          <Button variant="gradient-ocean" className="w-full" asChild>
            <Link to={localize("/contact")} onClick={() => setOpen(false)}>{t("nav.contactCta")}</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
