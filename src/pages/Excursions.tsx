import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const EXCURSION_IMAGES = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  "https://images.pexels.com/photos/31974945/pexels-photo-31974945.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=900&q=80",
  "/img/img2.jpeg",
  "/img/img4.jpeg",
  "https://images.unsplash.com/photo-1656750675118-04c0c4179b54?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1464925029952-5d9ca1cf4f64?auto=format&fit=crop&w=900&q=80",
  "/img/img8.jpeg",
  "https://images.unsplash.com/photo-1759521626408-4118f14632ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1710260715197-d43a51dbd2fa?auto=format&fit=crop&w=900&q=80",
];

const PILL_ROTATION = ["pill-gradient-ocean", "pill-gradient-palm", "pill-gradient-sun"];

const Excursions = () => {
  const { t } = useTranslation();
  const { localize } = useLang();
  const list = t("excursionsPage.list", { returnObjects: true }) as { tag: string; title: string; description: string }[];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo title={t("seo.excursions.title")} description={t("seo.excursions.description")} path="/excursions" />
      <SiteNav transparentOverHero scrollThreshold={0.4} />

      <main className="flex-1">
        <section className="relative h-[52svh] min-h-[380px] flex items-end overflow-hidden">
          <img
            src="/img/img11.jpeg"
            alt={t("excursionsPage.heroImageAlt")}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal className="max-w-2xl">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-sun mb-4">
                {t("excursionsPage.eyebrow")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-5">
                {t("excursionsPage.title")}
              </h1>
              <p className="text-lg lg:text-xl text-background/85 leading-relaxed">
                {t("excursionsPage.subhead")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-wash py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 -left-24 w-[340px] h-[340px] rounded-full bg-palm/15 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-1/4 w-[280px] h-[280px] rounded-full bg-sun/20 blur-[110px] pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {list.map((item, i) => (
                <StaggerItem key={item.title}>
                  <div className="glass group rounded-3xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={EXCURSION_IMAGES[i]}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                      <span className={`${PILL_ROTATION[i % PILL_ROTATION.length]} absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-foreground/10`}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2 tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {item.description}
                      </p>
                      <Button variant="gradient" size="sm" className="self-start" asChild>
                        <Link to={`${localize("/contact")}?sujet=${encodeURIComponent(item.title)}`}>
                          {t("common.book")} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                        </Link>
                      </Button>
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

export default Excursions;
