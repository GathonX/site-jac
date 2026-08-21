import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

const PolitiqueCookies = () => (
  <>
    <Seo
      title="Politique de cookies — Nosy Be Secret Islands Tours"
      description="Utilisation des cookies et du stockage local sur le site Nosy Be Secret Islands Tours."
      path="/politique-de-cookies"
    />
    <LegalPageLayout title="Politique de cookies" updatedAt="21 août 2026">
      <section>
        <h2>Ce site n'utilise pas de cookies de suivi</h2>
        <p>
          Nous n'utilisons aucun cookie publicitaire, d'analyse d'audience (type Google Analytics) ou de traçage
          entre sites. Aucune donnée de navigation n'est vendue ou partagée avec des tiers.
        </p>
      </section>

      <section>
        <h2>Stockage local technique</h2>
        <p>
          Le site conserve uniquement votre préférence d'affichage (thème clair) dans le stockage local de votre
          navigateur, afin de ne pas vous la redemander à chaque visite. Cette information reste sur votre appareil
          et n'est jamais transmise à nos serveurs.
        </p>
      </section>

      <section>
        <h2>Évolution de cette politique</h2>
        <p>
          Si des outils de mesure d'audience ou des cookies tiers venaient à être ajoutés au site, cette page serait
          mise à jour en conséquence.
        </p>
      </section>
    </LegalPageLayout>
  </>
);

export default PolitiqueCookies;
