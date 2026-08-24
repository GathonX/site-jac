import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EXCURSIONS = [
  {
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    tag: "Plongée",
    title: "Plongée & snorkeling",
    description: "Explorez les récifs coralliens et leur faune marine colorée avec des guides expérimentés, en palmes-masque-tuba ou en bouteille.",
  },
  {
    img: "https://images.pexels.com/photos/31974945/pexels-photo-31974945.jpeg?auto=compress&cs=tinysrgb&w=900",
    tag: "Nature",
    title: "Nosy Komba, l'île aux lémuriens",
    description: "Une balade sur l'île voisine à la rencontre des lémuriens en liberté et du village local.",
  },
  {
    img: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=900&q=80",
    tag: "Réserve marine",
    title: "Nosy Tanikely",
    description: "Snorkeling dans la réserve marine protégée : tortues, poissons-clowns et fonds coralliens préservés.",
  },
  {
    img: "/img/img2.jpeg",
    tag: "Réserve",
    title: "Réserve Lokobe",
    description: "La dernière forêt primaire de Nosy Be, accessible en pirogue puis à pied avec un guide agréé : lémuriens nocturnes, geckos-feuilles et caméléons endémiques.",
  },
  {
    img: "/img/img4.jpeg",
    tag: "Bateau",
    title: "Excursion en mer & îlots",
    description: "Une journée entre plages désertes et criques secrètes à bord de nos bateaux traditionnels.",
  },
  {
    img: "https://images.unsplash.com/photo-1656750675118-04c0c4179b54?auto=format&fit=crop&w=900&q=80",
    tag: "Croisière",
    title: "Croisière coucher de soleil",
    description: "Une sortie en mer en fin de journée pour profiter du coucher de soleil sur l'océan Indien.",
  },
  {
    img: "https://images.unsplash.com/photo-1464925029952-5d9ca1cf4f64?auto=format&fit=crop&w=900&q=80",
    tag: "Saisonnier",
    title: "Nage avec les requins-baleines",
    description: "D'octobre à décembre, les requins-baleines viennent se nourrir au large de Nosy Be. Une rencontre exceptionnelle avec les plus grands poissons de l'océan.",
  },
  {
    img: "/img/img8.jpeg",
    tag: "Terrestre",
    title: "Randonnée, point de vue dans une forêt primaire Lokobe",
    description: "À pied dans la forêt primaire de la réserve de Lokobe, jusqu'aux plus beaux points de vue et panoramas sur l'océan Indien.",
  },
  {
    img: "https://images.unsplash.com/photo-1759521626408-4118f14632ac?auto=format&fit=crop&w=900&q=80",
    tag: "Nautique",
    title: "Kayak & paddle",
    description: "Longez la côte à votre rythme, seul ou accompagné, pour découvrir les criques inaccessibles autrement.",
  },
  {
    img: "https://images.unsplash.com/photo-1710260715197-d43a51dbd2fa?auto=format&fit=crop&w=900&q=80",
    tag: "Culture",
    title: "Plantation d'ylang-ylang",
    description: "Nosy Be, « l'île aux parfums » : visite d'une plantation et d'une distillerie pour découvrir la récolte et la production d'huile essentielle d'ylang-ylang.",
  },
];

const PILL_ROTATION = ["pill-gradient-ocean", "pill-gradient-palm", "pill-gradient-sun"];

const Excursions = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo
        title="Excursions à Nosy Be — Lémuriens, tortues de mer, requins-baleines | Nosy Be Secret Islands Tours"
        description="Toutes nos excursions en mer et terrestres sur l'île paradisiaque de Nosy Be : plongée, visite de la réserve de Lokobe, Nosy Komba, Nosy Tanikely, randonnée et rencontres avec lémuriens, tortues de mer et requins-baleines."
        path="/excursions"
      />
      <SiteNav transparentOverHero scrollThreshold={0.4} />

      <main className="flex-1">
        <section className="relative h-[52svh] min-h-[380px] flex items-end overflow-hidden">
          <img
            src="/img/img11.jpeg"
            alt="Randonnée sur les rochers côtiers de Nosy Be avec vue sur l'océan"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal className="max-w-2xl">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-sun mb-4">
                Nos excursions
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-5">
                Toutes nos activités sur l'île paradisiaque
              </h1>
              <p className="text-lg lg:text-xl text-background/85 leading-relaxed">
                Excursions en mer et terrestres, visites de réserve, plongée, rencontres avec lémuriens, tortues de mer et requins-baleines... choisissez l'expérience qui vous correspond, on s'occupe du reste.
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
              {EXCURSIONS.map((item, i) => (
                <StaggerItem key={item.title}>
                  <div className="glass group rounded-3xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.img}
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
                        <Link to={`/contact?sujet=${encodeURIComponent(item.title)}`}>
                          Réserver <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
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
