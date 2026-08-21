import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/site-config";

const MentionsLegales = () => (
  <>
    <Seo title="Mentions légales — Nosy Be Secret Islands Tours" description="Mentions légales du site Nosy Be Secret Islands Tours." path="/mentions-legales" />
    <LegalPageLayout title="Mentions légales" updatedAt="21 août 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site {SITE_CONFIG.siteUrl.replace("https://", "")} est édité par {SITE_CONFIG.name}, tour opérateur
          local basé à Nosy Be, Madagascar, spécialisé dans les excursions en mer et terrestres.
        </p>
        <ul>
          <li>Nom commercial : {SITE_CONFIG.name}</li>
          <li>Adresse : Nosy Be, Madagascar</li>
          <li>Email : {SITE_CONFIG.email}</li>
          <li>Téléphone : {SITE_CONFIG.phone}</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Numéro d'immatriculation à compléter par l'éditeur (registre du commerce malgache).
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>Ce site est hébergé chez Hostinger.</p>
      </section>

      <section>
        <h2>Conception et développement</h2>
        <p>Site conçu et développé par Juno Mandimbizara.</p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, photographies, logo, mise en page) est la propriété
          de {SITE_CONFIG.name} ou de ses partenaires, sauf mention contraire. Toute reproduction ou représentation,
          totale ou partielle, sans autorisation préalable est interdite.
        </p>
      </section>
    </LegalPageLayout>
  </>
);

export default MentionsLegales;
