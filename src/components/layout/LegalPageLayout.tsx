import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-display tracking-[-0.03em] text-foreground mb-3">{title}</h1>
            <p className="text-sm text-muted-foreground mb-12">
              {t("common.lastUpdated")} : {t("legal.updatedAt")}
            </p>

            <div className="prose-readable space-y-8 text-foreground/85 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2">
              {children}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
