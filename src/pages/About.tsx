import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";

const About = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-foreground mb-6">
                À propos de nous
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Cette page présentera bientôt notre histoire, notre équipe et notre passion pour vous faire
                découvrir les plus belles expériences touristiques. Contenu à venir.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default About;
