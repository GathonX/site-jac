import { useEffect, lazy, Suspense, type ComponentType } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageLoader } from "@/components/PageLoader";
import { useLang } from "@/hooks/useLang";
import i18n from "@/i18n";

import Landing from "./pages/Landing";
const About = lazy(() => import("./pages/About"));
const Excursions = lazy(() => import("./pages/Excursions"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/legal/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/legal/PolitiqueConfidentialite"));
const ConditionsGenerales = lazy(() => import("./pages/legal/ConditionsGenerales"));
const PolitiqueCookies = lazy(() => import("./pages/legal/PolitiqueCookies"));

// Every route exists twice: as-is (French, default) and under /en (English).
const ROUTE_DEFS: { path: string; Component: ComponentType }[] = [
  { path: "/", Component: Landing },
  { path: "/about", Component: About },
  { path: "/excursions", Component: Excursions },
  { path: "/contact", Component: Contact },
  { path: "/mentions-legales", Component: MentionsLegales },
  { path: "/politique-de-confidentialite", Component: PolitiqueConfidentialite },
  { path: "/conditions-generales", Component: ConditionsGenerales },
  { path: "/politique-de-cookies", Component: PolitiqueCookies },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LangSync() {
  const { lang } = useLang();
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <LangSync />
          <SmoothScroll />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {ROUTE_DEFS.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              {ROUTE_DEFS.map(({ path, Component }) => (
                <Route key={`en-${path}`} path={path === "/" ? "/en" : `/en${path}`} element={<Component />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
