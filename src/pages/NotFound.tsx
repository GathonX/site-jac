import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { localize } = useLang();

  useEffect(() => {
    console.error("404 — page introuvable :", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <Seo title={t("seo.notFound.title")} description={t("seo.notFound.description")} noindex />
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-display font-bold text-foreground">{t("notFound.heading")}</h1>
        <p className="mb-6 text-xl text-muted-foreground">{t("notFound.text")}</p>
        <Button variant="gradient" asChild>
          <Link to={localize("/")}>{t("notFound.backHome")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
