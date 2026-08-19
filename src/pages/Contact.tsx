import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Phone, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const initialForm = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const sujet = searchParams.get("sujet");
    if (sujet) setForm((prev) => ({ ...prev, subject: sujet }));
  }, [searchParams]);

  const handleChange = (field: keyof typeof initialForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Merci de remplir tous les champs obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/send_email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "contact", ...form }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Message envoyé avec succès !");
        setForm(initialForm);
      } else {
        toast.error(data.message || "Échec de l'envoi. Veuillez réessayer.");
      }
    } catch {
      toast.error("Impossible d'envoyer le message. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <SiteNav />

      <main className="flex-1">
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/3 -right-24 w-[340px] h-[340px] rounded-full bg-sun/25 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-foreground mb-6">
                Contactez-nous
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
                Une question, une envie de voyage ? Écrivez-nous par le canal qui vous convient le mieux.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {contactMethods.map(({ Icon, label, value, href, external }) => (
                <Card key={label} className="glass shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky/20 to-primary/20 flex items-center justify-center">
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

            <Reveal className="glass rounded-[2rem] p-6 lg:p-10">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Honeypot — hidden from real visitors, catches bots */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input id="name" required value={form.name} onChange={handleChange("name")} placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required value={form.email} onChange={handleChange("email")} placeholder="vous@exemple.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="Optionnel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" value={form.subject} onChange={handleChange("subject")} placeholder="Optionnel" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" required rows={5} value={form.message} onChange={handleChange("message")} placeholder="Votre message..." />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" variant="gradient" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le message"
                    )}
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Contact;
