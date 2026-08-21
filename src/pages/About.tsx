import { Link } from "react-router-dom";
import { Leaf, Compass, Gem, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

const VALUES = [
  {
    Icon: Leaf,
    title: "Nature",
    description: "De la forêt primaire du Parc de Lokobe aux fonds coralliens de Nosy Tanikely, chaque excursion vous plonge dans une nature préservée, unique à Madagascar.",
  },
  {
    Icon: Compass,
    title: "Évasion",
    description: "Îlots secrets, sorties en mer, randonnées vers les plus beaux points de vue : on vous emmène loin du tourisme de masse, à la découverte du vrai Nosy Be.",
  },
  {
    Icon: Gem,
    title: "Authenticité",
    description: "Guides locaux, rencontres avec les habitants, savoir-faire traditionnel comme la distillation d'ylang-ylang : une expérience vraie, jamais standardisée.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo
        title="À propos — Nosy Be Secret Islands Tours"
        description="Nosy Be Secret Islands Tours, une agence locale qui vous fait découvrir Nosy Be autrement : nature, mer, maki, tortues de mer et requins-baleines, loin des circuits figés."
        path="/about"
      />
      <SiteNav transparentOverHero scrollThreshold={0.4} />

      <main className="flex-1">
        {/* Intro */}
        <section className="relative h-[52svh] min-h-[380px] flex items-end overflow-hidden">
          <img
            src="/img/img9.jpeg"
            alt="Terre rouge caractéristique des paysages de Madagascar"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal className="max-w-2xl">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-sun mb-4">
                À propos de Nosy Be Secret Islands Tours
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-5">
                À la découverte de l'île paradisiaque de Nosy Be
              </h1>
              <p className="text-lg lg:text-xl text-background/85 leading-relaxed">
                Nosy Be Secret Islands Tours est un tour opérateur local spécialisé dans les excursions en mer et
                terrestres : plongée, visites de parc, rencontres avec maki, tortues de mer et requins-baleines.
                Avec nos guides, on vous fait découvrir Nosy Be comme un local, loin des circuits figés.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal className="max-w-xl mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
                Notre signature
              </span>
              <h2 className="text-3xl sm:text-4xl font-display tracking-[-0.03em] text-foreground mb-4">
                Nature · Évasion · Authenticité
              </h2>
              <p className="text-muted-foreground text-base lg:text-lg">
                Les trois piliers qui guident chaque excursion qu'on organise.
              </p>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {VALUES.map(({ Icon, title, description }, i) => (
                <StaggerItem key={title}>
                  <div className="glass rounded-2xl p-6 h-full shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${
                        [
                          "bg-palm/15",
                          "bg-gradient-to-br from-sky/20 to-primary/20",
                          "bg-sun/25",
                        ][i % 3]
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${["text-palm", "text-primary", "text-foreground"][i % 3]}`} />
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-1.5">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Image + text */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-muted/60 to-background">
          <div className="absolute top-10 left-0 w-[320px] h-[320px] rounded-full bg-palm/10 blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-sun/15 blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            <Reveal>
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-gradient mb-4">
                Notre approche
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-[-0.03em] text-foreground mb-6">
                Voyager avec des gens du coin
              </h2>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
                Pas de bus climatisés ni de groupes de cinquante personnes. On organise des sorties à taille
                humaine, pensées pour que chaque participant reparte avec de vrais souvenirs — pas juste des
                photos.
              </p>
              <Button variant="gradient" size="lg" asChild>
                <Link to="/excursions">
                  Voir nos excursions <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Reveal>

            <Reveal direction="left" className="rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-primary/10 ring-1 ring-foreground/5">
              <img
                src="/img/img7.jpeg"
                alt="Cascade et bassin naturel lors d'une excursion terrestre à Nosy Be"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default About;
