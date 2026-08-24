import { useLocation } from "react-router-dom";

export type Lang = "fr" | "en";

/**
 * Language is derived purely from the URL (/en/... vs everything else) —
 * no browser-language auto-detection, so the language a crawler or visitor
 * lands on is always exactly what the URL says.
 */
export function useLang() {
  const location = useLocation();
  const isEn = location.pathname === "/en" || location.pathname.startsWith("/en/");
  const lang: Lang = isEn ? "en" : "fr";
  const prefix = isEn ? "/en" : "";

  /** Prefixes an absolute French-rooted path (e.g. "/contact") with the current language. */
  const localize = (path: string) => (path === "/" ? prefix || "/" : `${prefix}${path}`);

  /** The bare (un-prefixed) path, and this page's URL in each language — for the language switcher. */
  const barePath = isEn ? location.pathname.slice(3) || "/" : location.pathname;
  const frPath = barePath;
  const enPath = `/en${barePath === "/" ? "" : barePath}`;
  const otherLang: Lang = isEn ? "fr" : "en";
  const otherLangPath = isEn ? frPath : enPath;

  return { lang, prefix, localize, otherLang, otherLangPath, frPath, enPath };
}
