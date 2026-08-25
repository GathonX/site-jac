import { useEffect, lazy, Suspense, type ComponentType } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageLoader } from "@/components/PageLoader";
import { useLang } from "@/hooks/useLang";
import i18n from "@/i18n";

// On a fast connection the lazy chunk can resolve in a few ms, so the
// PageLoader flashes by too quickly to register as a loading state at
// all. Padding the promise to a minimum duration keeps it on screen
// long enough to actually be seen (and seen spinning).
function lazyMinDelay<T extends { default: ComponentType<any> }>(
  importFn: () => Promise<T>,
  minDelayMs = 700,
) {
  return lazy(() =>
    Promise.all([importFn(), new Promise((resolve) => setTimeout(resolve, minDelayMs))]).then(
      ([moduleExports]) => moduleExports,
    ),
  );
}

import Landing from "./pages/Landing";
const About = lazyMinDelay(() => import("./pages/About"));
const ExperienceCategory = lazyMinDelay(() => import("./pages/ExperienceCategory"));
const ExperienceDetail = lazyMinDelay(() => import("./pages/ExperienceDetail"));
const Contact = lazyMinDelay(() => import("./pages/Contact"));
const NotFound = lazyMinDelay(() => import("./pages/NotFound"));
const MentionsLegales = lazyMinDelay(() => import("./pages/legal/MentionsLegales"));
const PolitiqueConfidentialite = lazyMinDelay(() => import("./pages/legal/PolitiqueConfidentialite"));
const ConditionsGenerales = lazyMinDelay(() => import("./pages/legal/ConditionsGenerales"));
const PolitiqueCookies = lazyMinDelay(() => import("./pages/legal/PolitiqueCookies"));

// Every route exists twice: as-is (French, default) and under /en (English).
const ROUTE_DEFS: { path: string; Component: ComponentType }[] = [
  { path: "/", Component: Landing },
  { path: "/about", Component: About },
  { path: "/excursions/:categoryId", Component: ExperienceCategory },
  { path: "/excursions/:categoryId/:itemSlug", Component: ExperienceDetail },
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
              {/* The old single-page /excursions no longer exists — send old links/bookmarks somewhere useful. */}
              <Route path="/excursions" element={<Navigate to="/excursions/marine-experiences" replace />} />
              <Route path="/en/excursions" element={<Navigate to="/en/excursions/marine-experiences" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
