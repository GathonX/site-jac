import { Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const contactMethods = [
  {
    Icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    Icon: Phone,
    label: "Téléphone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phoneTel}`,
  },
  {
    Icon: SiWhatsapp,
    label: "WhatsApp",
    value: "Discuter avec nous",
    href: SITE_CONFIG.whatsappUrl,
    external: true,
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-foreground mb-6">
                Contactez-nous
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
                Une question, une envie de voyage ? Écrivez-nous par le canal qui vous convient le mieux.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {contactMethods.map(({ Icon, label, value, href, external }) => (
                <Card key={label} className="border-0 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        Contacter
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Contact;
