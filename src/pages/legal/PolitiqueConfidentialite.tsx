import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/site-config";

const PolitiqueConfidentialite = () => (
  <>
    <Seo
      title="Politique de confidentialité — Nosy Be Secret Islands Tours"
      description="Comment Nosy Be Secret Islands Tours collecte et utilise vos données personnelles."
      path="/politique-de-confidentialite"
    />
    <LegalPageLayout title="Politique de confidentialité" updatedAt="21 août 2026">
      <section>
        <h2>Données collectées</h2>
        <p>
          Nous collectons uniquement les informations que vous nous transmettez volontairement via le formulaire de
          contact du site : nom, email, téléphone (facultatif), sujet et message.
        </p>
      </section>

      <section>
        <h2>Utilisation des données</h2>
        <p>
          Ces informations sont utilisées exclusivement pour répondre à votre demande (renseignement, réservation
          d'excursion). Le message est envoyé directement par email à {SITE_CONFIG.email} — il n'est stocké dans
          aucune base de données sur nos serveurs.
        </p>
      </section>

      <section>
        <h2>Partage des données</h2>
        <p>
          Vos données ne sont jamais vendues, louées ni partagées avec des tiers à des fins commerciales. Elles ne
          sont utilisées que pour vous recontacter dans le cadre de votre demande.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>Les échanges par email sont conservés le temps nécessaire au traitement de votre demande.</p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données en nous
          contactant à {SITE_CONFIG.email}.
        </p>
      </section>
    </LegalPageLayout>
  </>
);

export default PolitiqueConfidentialite;
