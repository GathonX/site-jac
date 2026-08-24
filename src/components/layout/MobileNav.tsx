import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useLang } from "@/hooks/useLang";

export function MobileNav({ triggerClassName = "text-foreground" }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { localize, otherLang, otherLangPath } = useLang();

  const links = [
    { to: localize("/"), label: t("nav.home") },
    { to: localize("/excursions"), label: t("nav.excursions") },
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
          <Link
            to={otherLangPath}
            onClick={() => setOpen(false)}
            className="text-base font-medium text-foreground py-3 px-2 rounded-lg hover:bg-muted transition-colors uppercase"
          >
            {otherLang}
          </Link>
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
