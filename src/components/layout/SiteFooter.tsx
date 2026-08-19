import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { Logo } from "@/components/Logo";
import { SITE_CONFIG } from "@/lib/site-config";

const socialLinks = [
  { href: SITE_CONFIG.whatsappUrl, label: "WhatsApp", Icon: SiWhatsapp },
  { href: SITE_CONFIG.social.facebook, label: "Facebook", Icon: SiFacebook },
  { href: SITE_CONFIG.social.instagram, label: "Instagram", Icon: SiInstagram },
  { href: SITE_CONFIG.social.x, label: "X", Icon: SiX },
];

export function SiteFooter() {
  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              {SITE_CONFIG.email}
            </a>
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              {SITE_CONFIG.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-sky hover:to-primary hover:text-white hover:shadow-md hover:shadow-primary/30 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
