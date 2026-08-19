import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="glass-dark fixed top-0 w-full z-50 !border-x-0 !border-t-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[72px] px-6 lg:px-8">
          <Link to="/">
            <Logo size="md" textClassName="text-background" />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/excursions" className="text-sm font-medium text-background/90 hover:text-background transition-colors hidden sm:inline-block">
              Excursions
            </Link>
            <Link to="/about" className="text-sm font-medium text-background/90 hover:text-background transition-colors hidden sm:inline-block">
              About
            </Link>
            <Button className="text-sm font-semibold" asChild>
              <Link to="/contact">Contact us</Link>
            </Button>
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
              <Button size="lg" className="text-base font-semibold px-8 h-14" asChild>
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
      <section id="excursions" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="max-w-xl mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">
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
            {EXCURSIONS.map((item) => (
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
                    <span className="glass absolute top-4 left-4 text-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-sm">
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

      {/* Why choose us */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="right" className="rounded-[2rem] overflow-hidden aspect-[4/3] order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=80"
              alt="Vue depuis un hébergement donnant sur le lagon"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">
                Pourquoi JacTour
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-10">
                Une agence locale, à votre écoute
              </h2>
            </Reveal>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map(({ Icon, title, description }) => (
                <StaggerItem key={title}>
                  <div className="glass rounded-2xl p-6 h-full shadow-sm">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
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
            <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[120px] pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-display mb-5 text-background tracking-[-0.03em] leading-[1.05]">
                Prêt à découvrir Nosy Be ?
              </h2>
              <p className="text-background/70 text-lg mb-10 max-w-lg mx-auto">
                Parlez-nous de votre projet de voyage, on vous répond rapidement par téléphone, email ou WhatsApp.
              </p>
              <Button size="lg" className="text-base font-semibold px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/contact">Contactez-nous <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Landing;
