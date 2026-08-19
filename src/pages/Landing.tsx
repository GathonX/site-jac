import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileNav } from "@/components/layout/MobileNav";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    alt: "Lever de soleil sur une plage de sable blanc",
  },
  {
    src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1920&q=80",
    alt: "Vue aérienne de bungalows sur pilotis au-dessus d'un lagon turquoise",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80",
    alt: "Plage bordée de palmiers avec voilier",
  },
  {
    src: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1920&q=80",
    alt: "Palmiers encadrant une mer turquoise",
  },
  {
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80",
    alt: "Lounge au coucher du soleil face à l'océan",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80",
    alt: "Piscine de resort entourée de palmiers et de montagnes",
  },
];

const ROTATING_WORDS = ["Nosy Be.", "l'aventure.", "l'authenticité.", "l'évasion."];

const EXCURSIONS = [
  {
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    tag: "Plongée",
    title: "Plongée & snorkeling",
    description: "Explorez les récifs coralliens et leur faune marine avec des guides expérimentés.",
  },
  {
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80",
    tag: "Bateau",
    title: "Excursions en mer",
    description: "Îlots, criques secrètes et couchers de soleil à bord de nos bateaux traditionnels.",
  },
  {
    img: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?auto=format&fit=crop&w=900&q=80",
    tag: "Faune",
    title: "Faune marine",
    description: "Tortues, poissons-clowns et récifs colorés à quelques mètres de la surface.",
  },
  {
    img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80",
    tag: "Sport",
    title: "Sports nautiques",
    description: "Surf, kayak et paddle pour les amateurs de sensations sur l'eau.",
  },
];

const FEATURES = [
  {
    Icon: MapPin,
    title: "Circuits sur mesure",
    description: "Chaque excursion est adaptée à vos envies et à votre rythme de voyage.",
  },
  {
    Icon: Users,
    title: "Guides locaux",
    description: "Une équipe qui connaît Nosy Be et partage sa culture avec passion.",
  },
  {
    Icon: ShieldCheck,
    title: "Réservation simple",
    description: "Contactez-nous par téléphone, email ou WhatsApp, on s'occupe du reste.",
  },
  {
    Icon: Sparkles,
    title: "Expériences authentiques",
    description: "Loin des sentiers battus, à la découverte du vrai Nosy Be.",
  },
];

const STEPS = [
  {
    Icon: MessageCircle,
    title: "Contactez-nous",
    description: "Par téléphone, email ou WhatsApp, dites-nous ce que vous avez envie de vivre à Nosy Be.",
  },
  {
    Icon: CalendarCheck,
    title: "On construit votre programme",
    description: "On vous propose des excursions adaptées à votre séjour, votre budget et votre rythme.",
  },
  {
    Icon: PartyPopper,
    title: "Vous profitez",
    description: "Guides, matériel, logistique : tout est prêt. Il ne vous reste plus qu'à en profiter.",
  },
];

const GALLERY = [
  {
    img: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1400&q=80",
    alt: "Baleine à bosse sautant hors de l'eau",
  },
  {
    img: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=900&q=80",
    alt: "Tortue de mer nageant près de la surface",
  },
  {
    img: "https://images.unsplash.com/photo-1704175970578-e0e1d83536f0?auto=format&fit=crop&w=900&q=80",
    alt: "Lémurien catta sur une colline verdoyante",
  },
  {
    img: "https://images.unsplash.com/photo-1759521626408-4118f14632ac?auto=format&fit=crop&w=1400&q=80",
    alt: "Kayaks vus du ciel sur une eau turquoise",
  },
  {
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    alt: "Vague de l'océan Indien en gros plan",
  },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => setIndex((i + HERO_IMAGES.length) % HERO_IMAGES.length);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={HERO_IMAGES[index].src}
          alt={HERO_IMAGES[index].alt}
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
        aria-label="Image précédente"
        className="glass-dark hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full hover:bg-white/20 items-center justify-center text-background transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Image suivante"
        className="glass-dark hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full hover:bg-white/20 items-center justify-center text-background transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Aller à l'image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-background" : "w-1.5 bg-background/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

const Landing = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Merci de renseigner votre email.");
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
        toast.success(data.message || "Inscription réussie !");
        setNewsletterEmail("");
      } else {
        toast.error(data.message || "Échec de l'inscription. Veuillez réessayer.");
      }
    } catch {
      toast.error("Impossible d'envoyer votre demande. Vérifiez votre connexion.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar — switches from light-on-photo to dark-on-white once past the hero */}
      <nav className={`fixed top-0 w-full z-50 !border-x-0 !border-t-0 transition-colors duration-300 ${scrolled ? "glass" : "glass-dark"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-6 lg:px-8">
          <Link to="/">
            <Logo size="md" textClassName={scrolled ? "text-primary" : "text-background"} />
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/excursions"
              className={`text-sm font-medium transition-colors hidden sm:inline-block ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-background/90 hover:text-background"}`}
            >
              Excursions
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hidden sm:inline-block ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-background/90 hover:text-background"}`}
            >
              About
            </Link>
            <Button variant="gradient-ocean" className="hidden sm:inline-flex text-sm font-semibold" asChild>
              <Link to="/contact">Contact us</Link>
            </Button>
            <MobileNav triggerClassName={scrolled ? "text-foreground hover:bg-muted" : "text-background hover:bg-white/10"} />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[100svh] min-h-[560px] flex items-end overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="glass-dark inline-flex items-center gap-2 mb-6 text-background px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase">
              Agence locale · Nosy Be, Madagascar
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] leading-[1.05] text-background mb-6">
              Découvrez{" "}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                    className="inline-block italic text-sun"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-background/85 max-w-xl mb-10 leading-relaxed">
              Excursions, plongée, hébergements et circuits sur mesure : JacTour vous fait vivre Nosy Be comme un local.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="gradient" className="text-base font-semibold px-8 h-14" asChild>
                <Link to="/contact">Contactez-nous <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold px-8 h-14 bg-background/10 text-background border-background/30 hover:bg-background/20 hover:text-background" asChild>
                <Link to="/excursions">Voir nos excursions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Excursions */}
      <section id="excursions" className="section-wash py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[420px] h-[420px] rounded-full bg-sun/10 blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal className="max-w-xl mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
              Nos activités
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-4">
              Des expériences inoubliables
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg">
              De la plongée aux excursions en mer, chaque sortie est pensée pour révéler le meilleur de Nosy Be.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXCURSIONS.map((item, i) => (
              <StaggerItem key={item.title}>
                <Link to="/excursions" className="group block">
                  <div className="relative rounded-3xl overflow-hidden mb-4 aspect-[4/5]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                    <span className={`${["pill-gradient", "pill-gradient-ocean", "pill-gradient-sun", "pill-gradient"][i % 4]} absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-foreground/10`}>
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
              <Link to="/excursions">
                Voir toutes nos excursions <ArrowRight className="ml-2 w-4 h-4" />
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
              Comment ça marche
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-4">
              Simple, du premier message au débarquement
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-sky to-sun" aria-hidden="true" />
            {STEPS.map(({ Icon, title, description }, i) => (
              <StaggerItem key={title} className="relative text-center">
                <div
                  className={`relative z-10 w-16 h-16 mx-auto rounded-full shadow-lg flex items-center justify-center mb-5 ${
                    [
                      "bg-gradient-to-br from-sky to-primary shadow-primary/25",
                      "bg-sun shadow-sun/40",
                      "bg-gradient-to-br from-sky to-primary shadow-primary/25",
                    ][i % 3]
                  }`}
                >
                  <Icon className={`w-7 h-7 ${i === 1 ? "text-foreground" : "text-white"}`} />
                </div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                  Étape {i + 1}
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{description}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-wash py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-xl mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
              En images
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-4">
              Un aperçu de Nosy Be
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {GALLERY.slice(0, 3).map((item) => (
              <StaggerItem key={item.alt}>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] group">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GALLERY.slice(3).map((item) => (
              <StaggerItem key={item.alt}>
                <div className="rounded-3xl overflow-hidden aspect-[16/9] group">
                  <img
                    src={item.img}
                    alt={item.alt}
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
          <Reveal direction="right" className="rounded-[2rem] overflow-hidden aspect-[4/3] order-2 lg:order-1 shadow-2xl shadow-primary/10 ring-1 ring-foreground/5">
            <img
              src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=80"
              alt="Vue depuis un hébergement donnant sur le lagon"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
                Pourquoi JacTour
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-10">
                Une agence locale, à votre écoute
              </h2>
            </Reveal>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map(({ Icon, title, description }, i) => (
                <StaggerItem key={title}>
                  <div className="glass rounded-2xl p-6 h-full shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${
                        [
                          "bg-gradient-to-br from-sky/20 to-primary/20",
                          "bg-sun/25",
                          "bg-sky/15",
                          "bg-sun/15",
                        ][i % 4]
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${["text-primary", "text-foreground", "text-primary", "text-foreground"][i % 4]}`} />
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-1.5">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </StaggerItem>
              ))}
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
                Prêt à découvrir <span className="text-sun">Nosy Be</span> ?
              </h2>
              <p className="text-background/70 text-lg mb-10 max-w-lg mx-auto">
                Parlez-nous de votre projet de voyage, on vous répond rapidement par téléphone, email ou WhatsApp.
              </p>
              <Button size="lg" variant="gradient" className="text-base font-semibold px-8 h-12" asChild>
                <Link to="/contact">Contactez-nous <ArrowRight className="ml-2 w-4 h-4" /></Link>
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
                Ne manquez aucune bonne adresse
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Inscrivez-vous pour recevoir nos idées d'excursions et nos bons plans à Nosy Be.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="h-12 rounded-full"
                />
                <Button type="submit" variant="gradient" className="h-12 shrink-0" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>S'inscrire <ArrowRight className="ml-1.5 w-4 h-4" /></>
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
