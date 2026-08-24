import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
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

const PILL_ROTATION = ["pill-gradient-ocean", "pill-gradient-palm", "pill-gradient-sun"];

const ExperienceCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useTranslation();
  const { localize } = useLang();
  const categories = t("experiences.categories", { returnObjects: true }) as ExperienceCategory[];
  const category = categories.find((c) => c.id === categoryId);

  if (!category) return <NotFound />;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo
        title={`${category.label} — Nosy Be Secret Islands Tours`}
        description={category.subhead}
        path={`/excursions/${category.id}`}
      />
      <SiteNav transparentOverHero scrollThreshold={0.4} />

      <main className="flex-1">
        <section className="relative h-[52svh] min-h-[380px] flex items-end overflow-hidden bg-muted">
          <img
            src={category.items[0].image}
            alt={category.heroImageAlt}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal className="max-w-2xl">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-sun mb-4">
                {category.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-5">
                {category.title}
              </h1>
              <p className="text-lg lg:text-xl text-background/85 leading-relaxed">
                {category.subhead}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-wash py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 -left-24 w-[340px] h-[340px] rounded-full bg-palm/15 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-1/4 w-[280px] h-[280px] rounded-full bg-sun/20 blur-[110px] pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="flex flex-wrap gap-2.5 mb-12">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={localize(`/excursions/${cat.id}`)}
                  className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors inline-flex items-center gap-1.5 ${
                    cat.id === category.id ? "bg-foreground text-background" : "glass text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {cat.emoji && <span aria-hidden="true">{cat.emoji}</span>}
                  {cat.label}
                </Link>
              ))}
            </div>

            <StaggerGroup key={category.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, i) => (
                <StaggerItem key={item.slug}>
                  <div className="glass group rounded-3xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                    <Link to={localize(`/excursions/${category.id}/${item.slug}`)} className="relative aspect-[4/3] overflow-hidden bg-muted block">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                      <span className={`${PILL_ROTATION[i % PILL_ROTATION.length]} absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-foreground/10`}>
                        {item.tag}
                      </span>
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2 tracking-[-0.01em]">
                        <Link to={localize(`/excursions/${category.id}/${item.slug}`)} className="hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {item.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <Button variant="gradient" size="sm" asChild>
                          <Link to={`${localize("/contact")}?sujet=${encodeURIComponent(item.title)}`}>
                            {t("common.book")} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={localize(`/excursions/${category.id}/${item.slug}`)}>
                            {t("experiences.detailsButton")}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ExperienceCategoryPage;
