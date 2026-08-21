import { Link } from "react-router-dom";
import { Mail, Phone, Globe } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram, SiX, SiGithub } from "react-icons/si";
import { Logo } from "@/components/Logo";
import { SITE_CONFIG } from "@/lib/site-config";

const DEVELOPER = {
  website: "https://mandimbizara-juno.mada-nosybe-tourism.com/",
  email: "mandimbizarajuno@gmail.com",
  whatsappUrl: "https://wa.me/261326687543",
  github: "https://github.com/GathonX",
};

const socialLinks = [
  { href: SITE_CONFIG.whatsappUrl, label: "WhatsApp", Icon: SiWhatsapp, bg: "bg-[#25D366]" },
  { href: SITE_CONFIG.social.facebook, label: "Facebook", Icon: SiFacebook, bg: "bg-[#1877F2]" },
  {
    href: SITE_CONFIG.social.instagram,
    label: "Instagram",
    Icon: SiInstagram,
    bg: "bg-[radial-gradient(circle_at_30%_110%,#FFD600_0%,#FF7A00_25%,#FF0069_50%,#D300C5_75%,#7638FA_100%)]",
  },
  { href: SITE_CONFIG.social.x, label: "X", Icon: SiX, bg: "bg-[#000000]" },
];

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/excursions", label: "Excursions" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-foreground overflow-hidden">
      <div className="absolute -top-32 -left-20 w-[380px] h-[380px] rounded-full bg-sky/25 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-20 w-[340px] h-[340px] rounded-full bg-sun/15 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/">
              <Logo size="xl" />
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mt-4 max-w-sm">
              Tour opérateur local à Nosy Be : excursions en mer et terrestres, plongée, visites de parc et
              rencontres avec maki, tortues de mer et requins-baleines.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, label, Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center text-white shadow-sm hover:scale-110 hover:shadow-md transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-display font-semibold text-background mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-background/70 hover:text-sun transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-display font-semibold text-background mb-4">Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-sun transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-sun transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-sun transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/15 text-center md:text-left">
          <p className="text-sm text-background/60">© {new Date().getFullYear()} Nosy Be Secret Islands Tours. Tous droits réservés.</p>
        </div>
      </div>

      <div className="relative border-t border-background/10 bg-foreground/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-center">
            <p className="text-xs text-background/50">Site développé par Juno Mandimbizara</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href={DEVELOPER.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-background/50 hover:text-sun transition-colors"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                Site web
              </a>
              <a
                href={`mailto:${DEVELOPER.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-background/50 hover:text-sun transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                {DEVELOPER.email}
              </a>
              <a
                href={DEVELOPER.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-background/50 hover:text-sun transition-colors"
              >
                <SiWhatsapp className="w-3.5 h-3.5 shrink-0" />
                WhatsApp
              </a>
              <a
                href={DEVELOPER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-background/50 hover:text-sun transition-colors"
              >
                <SiGithub className="w-3.5 h-3.5 shrink-0" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
