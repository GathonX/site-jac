import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useLang } from "@/hooks/useLang";

interface PricingRow {
  name: string;
  detail: string;
  group: string;
  private: string;
  note: string;
}

interface PricingSection {
  title: string;
  subtitle: string;
  itemLabel: string;
  noteLabel: string;
  rows: PricingRow[];
}

interface InclusionItem {
  title: string;
  description: string;
}

const Tarifs = () => {
  const { t } = useTranslation();
  const { localize } = useLang();
  const sections = t("pricing.sections", { returnObjects: true }) as PricingSection[];
  const inclusions = t("pricing.inclusions", { returnObjects: true }) as InclusionItem[];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo title={t("seo.pricing.title")} description={t("seo.pricing.description")} path="/tarifs" />
      <SiteNav transparentOverHero scrollThreshold={0.4} />

      <main className="flex-1">
        <section className="relative h-[46svh] min-h-[340px] flex items-end overflow-hidden bg-muted">
          <img
            src="/img/sandbank-lagoon.jpeg"
            alt={t("pricing.heroImageAlt")}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal className="max-w-2xl">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-sun mb-4">
                {t("pricing.eyebrow")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-5">
                {t("pricing.title")}
              </h1>
              <p className="text-lg lg:text-xl text-background/85 leading-relaxed">
                {t("pricing.subhead")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-wash py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 -left-24 w-[340px] h-[340px] rounded-full bg-palm/15 blur-[110px] pointer-events-none" aria-hidden="true" />

          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative space-y-14">
            {sections.map((section) => (
              <Reveal key={section.title}>
                <div className="mb-5">
                  <h2 className="text-2xl sm:text-3xl font-display tracking-[-0.02em] text-foreground mb-1.5">
                    {section.title}
                  </h2>
                  {section.subtitle && <p className="text-sm text-muted-foreground">{section.subtitle}</p>}
                </div>
                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-foreground font-semibold">{section.itemLabel}</TableHead>
                        <TableHead className="text-foreground font-semibold">{t("pricing.groupLabel")}</TableHead>
                        <TableHead className="text-foreground font-semibold">{t("pricing.privateLabel")}</TableHead>
                        {section.noteLabel && (
                          <TableHead className="text-foreground font-semibold hidden md:table-cell">
                            {section.noteLabel}
                          </TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell className="align-top">
                            <span className="font-semibold text-foreground block">{row.name}</span>
                            {row.detail && <span className="text-sm text-muted-foreground">{row.detail}</span>}
                          </TableCell>
                          <TableCell className="align-top text-sm text-foreground whitespace-nowrap">{row.group}</TableCell>
                          <TableCell className="align-top text-sm text-foreground">{row.private}</TableCell>
                          {section.noteLabel && (
                            <TableCell className="align-top text-sm text-muted-foreground hidden md:table-cell">
                              {row.note}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Reveal>
            ))}

            <Reveal className="glass rounded-2xl p-6 lg:p-8">
              <p className="text-sm text-foreground/85 leading-relaxed">{t("pricing.groupTip")}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{t("pricing.conditions")}</p>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-display tracking-[-0.02em] text-foreground mb-6">
                {t("pricing.inclusionsTitle")}
              </h2>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {inclusions.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="glass rounded-2xl p-6 h-full shadow-sm">
                      <h3 className="font-display font-semibold text-base text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>

            <p className="text-xs text-muted-foreground text-center">{t("pricing.disclaimer")}</p>
          </div>
        </section>

        <section className="py-16 lg:py-20 bg-foreground relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-display tracking-[-0.03em] text-background mb-4">
                {t("pricing.ctaTitle")}
              </h2>
              <p className="text-background/80 text-base lg:text-lg mb-8">{t("pricing.ctaSubhead")}</p>
              <Button variant="gradient" size="lg" asChild>
                <Link to={localize("/contact")}>
                  {t("nav.contactCta")} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Tarifs;
