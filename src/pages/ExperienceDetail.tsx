import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";
import NotFound from "@/pages/NotFound";

interface ExperienceItem {
  slug: string;
  image: string;
  tag: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
}

interface ExperienceCategory {
  id: string;
  emoji: string;
  label: string;
  eyebrow: string;
  title: string;
  subhead: string;
  heroImageAlt: string;
  items: ExperienceItem[];
}

const ExperienceDetailPage = () => {
  const { categoryId, itemSlug } = useParams<{ categoryId: string; itemSlug: string }>();
  const { t } = useTranslation();
  const { localize } = useLang();
  const categories = t("experiences.categories", { returnObjects: true }) as ExperienceCategory[];
  const category = categories.find((c) => c.id === categoryId);
  const item = category?.items.find((i) => i.slug === itemSlug);

  if (!category || !item) return <NotFound />;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo
        title={`${item.title} — Nosy Be Secret Islands Tours`}
        description={item.shortDescription}
        path={`/excursions/${category.id}/${item.slug}`}
      />
      <SiteNav transparentOverHero scrollThreshold={0.4} />

      <main className="flex-1">
        <section className="relative h-[58svh] min-h-[420px] flex items-end overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.title}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal>
              <span className="pill-gradient-sun inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg mb-4">
                {item.tag}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-3">
                {item.title}
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <Link
                to={localize(`/excursions/${category.id}`)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {category.emoji && <span aria-hidden="true">{category.emoji}</span>} {category.label}
              </Link>

              <p className="text-lg text-foreground/85 leading-relaxed mb-10 max-w-2xl">
                {item.fullDescription}
              </p>

              <Button variant="gradient" size="lg" asChild>
                <Link to={`${localize("/contact")}?sujet=${encodeURIComponent(item.title)}`}>
                  {t("common.book")} <ArrowRight className="ml-2 w-4 h-4" />
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

export default ExperienceDetailPage;
