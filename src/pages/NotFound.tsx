import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — page introuvable :", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <Seo title="Page introuvable — Nosy Be Secret Islands Tours" description="Cette page n'existe pas." noindex />
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-display font-bold text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oups ! Cette page n'existe pas.</p>
        <Button variant="gradient" asChild>
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
