import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/site-config";

const ConditionsGenerales = () => (
  <>
    <Seo
      title="Conditions générales — Nosy Be Secret Islands Tours"
      description="Conditions générales d'utilisation du site et de réservation des excursions Nosy Be Secret Islands Tours."
      path="/conditions-generales"
    />
    <LegalPageLayout title="Conditions générales" updatedAt="21 août 2026">
      <section>
        <h2>Objet</h2>
        <p>
          Les présentes conditions régissent l'utilisation du site {SITE_CONFIG.siteUrl.replace("https://", "")} et
          les demandes de réservation d'excursions auprès de {SITE_CONFIG.name}.
        </p>
      </section>

      <section>
        <h2>Réservations</h2>
        <p>
          Toute demande d'excursion effectuée via le formulaire de contact, par email ou par WhatsApp constitue une
          demande de renseignement, pas une réservation ferme. Chaque réservation est confirmée individuellement
          avec {SITE_CONFIG.name}, qui communique les modalités (tarif, horaires, conditions d'annulation) au cas
          par cas selon l'excursion choisie.
        </p>
      </section>

      <section>
        <h2>Conditions météo et sécurité</h2>
        <p>
          Les excursions en mer et terrestres peuvent être reportées ou annulées pour des raisons de sécurité
          (conditions météo, état de la mer). {SITE_CONFIG.name} en informe les participants dans les meilleurs
          délais.
        </p>
      </section>

      <section>
        <h2>Limitation de responsabilité</h2>
        <p>
          Les informations présentées sur ce site sont fournies à titre indicatif et peuvent évoluer. {SITE_CONFIG.name}{" "}
          ne saurait être tenu responsable d'une indisponibilité temporaire du site ou d'une erreur de contenu.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>Pour toute question relative à ces conditions, contactez-nous à {SITE_CONFIG.email}.</p>
      </section>
    </LegalPageLayout>
  </>
);

export default ConditionsGenerales;
