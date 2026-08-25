import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Expand, Download, Play } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GalleryItem {
  src: string;
  type: "image" | "video";
  alt: string;
  poster?: string;
}

type Filter = "all" | "image" | "video";

function downloadName(src: string) {
  return `nosybe-secret-islands-tours-${src.split("/").pop()}`;
}

const GalleryPage = () => {
  const { t } = useTranslation();
  const items = t("gallery.items", { returnObjects: true }) as GalleryItem[];
  const [filter, setFilter] = useState<Filter>("all");
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.type === filter)),
    [items, filter],
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo title={t("seo.gallery.title")} description={t("seo.gallery.description")} path="/galerie" />
      <SiteNav />

      <main className="flex-1">
        <section className="section-wash py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 -left-24 w-[340px] h-[340px] rounded-full bg-palm/15 blur-[110px] pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <Reveal className="max-w-2xl mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-sun mb-4">
                {t("gallery.eyebrow")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-foreground mb-5">
                {t("gallery.title")}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("gallery.subhead")}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mb-10">
                <TabsList>
                  <TabsTrigger value="all">{t("gallery.tabs.all")}</TabsTrigger>
                  <TabsTrigger value="image">{t("gallery.tabs.images")}</TabsTrigger>
                  <TabsTrigger value="video">{t("gallery.tabs.videos")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </Reveal>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground">{t("gallery.empty")}</p>
            ) : (
              <StaggerGroup key={filter} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((item) => (
                  <StaggerItem key={item.src}>
                    <div className="group relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-sm">
                      <img
                        src={item.type === "video" ? item.poster : item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-12 h-12 rounded-full bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-5 h-5 text-background ml-0.5" fill="currentColor" />
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setOpenItem(item)}
                        aria-label={t("gallery.enlarge")}
                        className="absolute inset-0 w-full h-full flex items-center justify-center gap-3 bg-foreground/0 opacity-0 group-hover:bg-foreground/50 group-hover:opacity-100 focus-visible:bg-foreground/50 focus-visible:opacity-100 transition-all duration-300"
                      >
                        <span
                          role="button"
                          aria-label={t("gallery.enlarge")}
                          className="w-10 h-10 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Expand className="w-4 h-4" />
                        </span>
                        <a
                          href={item.src}
                          download={downloadName(item.src)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={t("gallery.download")}
                          className="w-10 h-10 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </button>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />

      <Dialog open={!!openItem} onOpenChange={(open) => !open && setOpenItem(null)}>
        <DialogContent className="max-w-3xl w-[calc(100%-2rem)] p-4 sm:p-6 bg-background">
          {openItem && (
            <>
              <DialogTitle className="text-sm font-medium text-foreground pr-8">{openItem.alt}</DialogTitle>
              <div className="rounded-xl overflow-hidden bg-muted">
                {openItem.type === "image" ? (
                  <img src={openItem.src} alt={openItem.alt} className="w-full max-h-[70vh] object-contain" />
                ) : (
                  <video
                    src={openItem.src}
                    poster={openItem.poster}
                    controls
                    autoPlay
                    className="w-full max-h-[70vh]"
                  />
                )}
              </div>
              <a
                href={openItem.src}
                download={downloadName(openItem.src)}
                className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                {t("gallery.download")}
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
