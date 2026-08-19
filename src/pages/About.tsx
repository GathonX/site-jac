import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";

const About = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/3 -left-24 w-[340px] h-[340px] rounded-full bg-sun/25 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
            <Reveal className="glass rounded-[2rem] p-8 lg:p-12">
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
