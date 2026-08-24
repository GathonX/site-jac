import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Phone, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/site-config";
import { celebrate } from "@/lib/confetti";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

const Contact = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const contactMethods = [
    { Icon: Mail, label: t("contactPage.methods.email"), value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { Icon: Phone, label: t("contactPage.methods.phone"), value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phoneTel}` },
    {
      Icon: SiWhatsapp,
      label: t("contactPage.methods.whatsapp"),
      value: t("contactPage.methods.whatsappValue"),
      href: SITE_CONFIG.whatsappUrl,
      external: true,
    },
  ];

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
      toast.error(t("contactPage.errors.required"));
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
        toast.success(data.message || t("contactPage.success"));
        celebrate();
        setForm(initialForm);
      } else {
        toast.error(data.message || t("contactPage.errors.generic"));
      }
    } catch {
      toast.error(t("contactPage.errors.network"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Seo title={t("seo.contact.title")} description={t("seo.contact.description")} path="/contact" />
      <SiteNav transparentOverHero scrollThreshold={0.35} />

      <main className="flex-1">
        <section className="relative h-[42svh] min-h-[320px] flex items-end overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1656750675118-04c0c4179b54?auto=format&fit=crop&w=1600&q=80"
            alt={t("contactPage.heroImageAlt")}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-16 relative z-10 w-full">
            <Reveal className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-[-0.03em] text-background mb-5">
                {t("contactPage.title")}
              </h1>
              <p className="text-lg lg:text-xl text-background/85 leading-relaxed">
                {t("contactPage.subhead")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full bg-sky/20 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/3 -right-24 w-[340px] h-[340px] rounded-full bg-sun/25 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-1/3 w-[260px] h-[260px] rounded-full bg-palm/15 blur-[110px] pointer-events-none" aria-hidden="true" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {contactMethods.map(({ Icon, label, value, href, external }, i) => (
                <Card key={label} className="glass shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        [
                          "bg-gradient-to-br from-sky/20 to-primary/20",
                          "bg-palm/15",
                          "bg-sun/25",
                        ][i % 3]
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${["text-primary", "text-palm", "text-foreground"][i % 3]}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {t("common.contactButton")}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Reveal className="glass rounded-[2rem] p-6 lg:p-10">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6">{t("contactPage.formTitle")}</h2>
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
                  <Label htmlFor="name">{t("contactPage.form.name")}</Label>
                  <Input id="name" required value={form.name} onChange={handleChange("name")} placeholder={t("contactPage.form.namePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contactPage.form.email")}</Label>
                  <Input id="email" type="email" required value={form.email} onChange={handleChange("email")} placeholder={t("contactPage.form.emailPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("contactPage.form.phone")}</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={handleChange("phone")} placeholder={t("contactPage.form.phonePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contactPage.form.subject")}</Label>
                  <Input id="subject" value={form.subject} onChange={handleChange("subject")} placeholder={t("contactPage.form.subjectPlaceholder")} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">{t("contactPage.form.message")}</Label>
                  <Textarea id="message" required rows={5} value={form.message} onChange={handleChange("message")} placeholder={t("contactPage.form.messagePlaceholder")} />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" variant="gradient" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" /> {t("contactPage.form.submitting")}
                      </>
                    ) : (
                      t("contactPage.form.submit")
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
