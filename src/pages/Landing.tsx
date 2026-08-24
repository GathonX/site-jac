import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/hooks/useLang";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CalendarCheck,
  PartyPopper,
  Send,
  Loader2,
} from "lucide-react";

const HERO_IMAGE_SRCS = [
  "/img/sunset-beach.jpeg",
  "/img/ylang-ylang.jpeg",
  "/img/img3.jpeg",
  "/img/sandbank-lagoon.jpeg",
  "/img/img11.jpeg",
  "/img/palms-sea.jpeg",
  "/img/sea-turtle.jpeg",
];

const EXCURSION_IMAGES = [
  "/img/diving.jpeg",
  "/img/black-lemur.jpeg",
  "/img/sea-turtle.jpeg",
  "/img/whale-shark.jpeg",
];

const GALLERY_IMAGES = ["/img/img5.jpeg", "/img/img2.jpeg", "/img/img12.jpeg", "/img/img9.jpeg", "/img/img10.jpeg"];

const FEATURE_ICONS = [MapPin, Users, ShieldCheck, Sparkles];
const STEP_ICONS = [MessageCircle, CalendarCheck, PartyPopper];

function HeroCarousel() {
  const { t } = useTranslation();
  const heroImageAlts = t("landing.heroImageAlts", { returnObjects: true }) as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGE_SRCS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => setIndex((i + HERO_IMAGE_SRCS.length) % HERO_IMAGE_SRCS.length);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-sky/30 to-primary/40">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={HERO_IMAGE_SRCS[index]}
          alt={heroImageAlts[index]}
          // @ts-expect-error -- fetchPriority isn't in this React version's img typings yet, but the DOM attribute works
          fetchpriority={index === 0 ? "high" : undefined}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10" />

      {/* Arrows */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label={t("landing.heroPrev")}
        className="glass-dark hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full hover:bg-white/20 items-center justify-center text-background transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label={t("landing.heroNext")}
        className="glass-dark hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full hover:bg-white/20 items-center justify-center text-background transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-20">
        {HERO_IMAGE_SRCS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`${t("landing.heroGoTo")} ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-background" : "w-1.5 bg-background/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

const Landing = () => {
  const { t } = useTranslation();
  const { localize } = useLang();
  const rotatingWords = t("landing.rotatingWords", { returnObjects: true }) as string[];
  const excursions = t("landing.excursions", { returnObjects: true }) as { tag: string; title: string; description: string }[];
  const features = t("landing.features", { returnObjects: true }) as { title: string; description: string }[];
  const steps = t("landing.steps", { returnObjects: true }) as { title: string; description: string }[];
  const galleryAlts = t("landing.galleryAlts", { returnObjects: true }) as string[];

  const [wordIndex, setWordIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error(t("landing.newsletterErrorEmpty"));
      return;
    }

    setNewsletterSubmitting(true);
    try {
      const res = await fetch("/api/send_email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "newsletter", email: newsletterEmail }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || t("landing.newsletterSuccess"));
        setNewsletterEmail("");
      } else {
        toast.error(data.message || t("landing.newsletterErrorGeneric"));
      }
    } catch {
      toast.error(t("landing.newsletterErrorNetwork"));
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Seo title={t("seo.landing.title")} description={t("seo.landing.description")} />
      <SiteNav transparentOverHero scrollThreshold={0.7} />

      {/* Hero */}
      <section className="relative h-[78svh] min-h-[480px] flex items-end overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="glass-dark inline-flex items-center gap-2 mb-7 text-background px-4 py-2 rounded-full text-xs font-bold tracking-[0.18em] uppercase">
              {t("landing.badge")}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display tracking-[-0.03em] leading-[1.05] text-background mb-7">
              {t("landing.heroPrefix")}{" "}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="inline-block italic text-sun"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-background/90 max-w-2xl mb-10 leading-relaxed">
              {t("landing.heroSubhead")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="gradient" className="text-base font-semibold px-8 h-14" asChild>
                <Link to={localize("/contact")}>{t("landing.ctaContact")} <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold px-8 h-14 bg-background/10 text-background border-background/30 hover:bg-background/20 hover:text-background" asChild>
                <Link to={localize("/excursions")}>{t("landing.ctaExcursions")}</Link>
              </Button>
            </div>
            <p className="mt-8 text-xs font-bold tracking-[0.25em] uppercase text-background/70">
              {t("landing.tagline")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Excursions */}
      <section id="excursions" className="section-wash py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[420px] h-[420px] rounded-full bg-sun/10 blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-10 left-0 w-[320px] h-[320px] rounded-full bg-palm/10 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal className="max-w-xl mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
              {t("landing.excursionsEyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-4">
              {t("landing.excursionsTitle")}
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg">
              {t("landing.excursionsSubhead")}
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {excursions.map((item, i) => (
              <StaggerItem key={item.title}>
                <Link to={localize("/excursions")} className="group block">
                  <div className="relative rounded-3xl overflow-hidden mb-4 aspect-[4/5] bg-muted">
                    <img
                      src={EXCURSION_IMAGES[i]}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                    <span className={`${["pill-gradient-ocean", "pill-gradient-palm", "pill-gradient-sun", "pill-gradient-ocean"][i % 4]} absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-foreground/10`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to={localize("/excursions")}>
                {t("landing.viewAllExcursions")} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-xl mb-14 mx-auto text-center">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
              {t("landing.howItWorksEyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-4">
              {t("landing.howItWorksTitle")}
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-sky via-palm to-sun" aria-hidden="true" />
            {steps.map(({ title, description }, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <StaggerItem key={title} className="relative text-center">
                  <div
                    className={`relative z-10 w-16 h-16 mx-auto rounded-full shadow-lg flex items-center justify-center mb-5 ${
                      [
                        "bg-gradient-to-br from-sky to-primary shadow-primary/25",
                        "bg-palm shadow-palm/30",
                        "bg-sun shadow-sun/40",
                      ][i % 3]
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${i === 2 ? "text-foreground" : "text-white"}`} />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                    {t("landing.stepLabel")} {i + 1}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{description}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-wash py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-xl mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
              {t("landing.galleryEyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-4">
              {t("landing.galleryTitle")}
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {GALLERY_IMAGES.slice(0, 3).map((img, i) => (
              <StaggerItem key={img}>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] group bg-muted">
                  <img
                    src={img}
                    alt={galleryAlts[i]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GALLERY_IMAGES.slice(3).map((img, i) => (
              <StaggerItem key={img}>
                <div className="rounded-3xl overflow-hidden aspect-[16/9] group bg-muted">
                  <img
                    src={img}
                    alt={galleryAlts[i + 3]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-muted/60 to-background">
        <div className="absolute -top-10 left-0 w-[380px] h-[380px] rounded-full bg-sky/10 blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-sun/15 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <Reveal direction="right" className="rounded-[2rem] overflow-hidden aspect-[4/3] order-2 lg:order-1 shadow-2xl shadow-primary/10 ring-1 ring-foreground/5 bg-muted">
            <img
              src="/img/pirogue.jpeg"
              alt={t("landing.whyImageAlt")}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
                {t("landing.whyEyebrow")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-10">
                {t("landing.whyTitle")}
              </h2>
            </Reveal>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map(({ title, description }, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <StaggerItem key={title}>
                    <div className="glass rounded-2xl p-6 h-full shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${
                          [
                            "bg-gradient-to-br from-sky/20 to-primary/20",
                            "bg-palm/15",
                            "bg-sun/25",
                            "bg-sky/15",
                          ][i % 4]
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${["text-primary", "text-palm", "text-foreground", "text-primary"][i % 4]}`} />
                      </div>
                      <h3 className="font-display font-semibold text-base text-foreground mb-1.5">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal className="bg-foreground rounded-[2.5rem] relative overflow-hidden px-6 py-16 lg:px-16 lg:py-20 text-center">
            <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-sky/40 blur-[120px] pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-sun/25 blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-display mb-5 text-background tracking-[-0.03em] leading-[1.05]">
                {t("landing.ctaTitlePrefix")} <span className="text-sun">{t("landing.ctaTitleHighlight")}</span>{t("landing.ctaTitleSuffix")}
              </h2>
              <p className="text-background/70 text-lg mb-10 max-w-lg mx-auto">
                {t("landing.ctaSubhead")}
              </p>
              <Button size="lg" variant="gradient" className="text-base font-semibold px-8 h-12" asChild>
                <Link to={localize("/contact")}>{t("landing.ctaContact")} <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal className="glass rounded-[2rem] p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-16 w-[260px] h-[260px] rounded-full bg-sky/15 blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-16 w-[260px] h-[260px] rounded-full bg-sun/20 blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <div className="w-12 h-12 mx-auto rounded-full bg-sun flex items-center justify-center mb-5">
                <Send className="w-5 h-5 text-foreground" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display tracking-[-0.02em] text-foreground mb-3">
                {t("landing.newsletterTitle")}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {t("landing.newsletterSubhead")}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t("landing.newsletterPlaceholder")}
                  className="h-12 rounded-full"
                />
                <Button type="submit" variant="gradient" className="h-12 shrink-0" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>{t("landing.newsletterButton")} <ArrowRight className="ml-1.5 w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Landing;
