import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "@/lib/site-config";

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/excursions" — leave empty for the homepage. */
  path?: string;
  /** Set for pages that shouldn't appear in search results (e.g. 404). */
  noindex?: boolean;
}

export function Seo({ title, description, path = "", noindex = false }: SeoProps) {
  const url = `${SITE_CONFIG.siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={url} />}
      <meta property="og:url" content={url} />
      {/*
        No per-page og:title/og:description/og:image here on purpose: this is a
        client-only SPA (no SSR/prerendering), and link-preview crawlers
        (WhatsApp, Facebook, iMessage...) fetch the raw HTML without running
        JS, so they only ever see index.html's static Open Graph tags —
        Helmet-injected ones would just create duplicates without actually
        varying the preview per page.
      */}
    </Helmet>
  );
}
