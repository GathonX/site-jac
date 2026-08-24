import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/site-config";

const PolitiqueConfidentialite = () => {
  const { t } = useTranslation();
  const l = t("legal.privacy", { returnObjects: true }) as Record<string, string>;

  return (
    <>
      <Seo title={t("seo.legal.privacy.title")} description={t("seo.legal.privacy.description")} path="/politique-de-confidentialite" />
      <LegalPageLayout title={l.title}>
        <section>
          <h2>{l.dataHeading}</h2>
          <p>{l.dataText}</p>
        </section>

        <section>
          <h2>{l.useHeading}</h2>
          <p>{l.useText}</p>
        </section>

        <section>
          <h2>{l.shareHeading}</h2>
          <p>{l.shareText}</p>
        </section>

        <section>
          <h2>{l.retentionHeading}</h2>
          <p>{l.retentionText}</p>
        </section>

        <section>
          <h2>{l.rightsHeading}</h2>
          <p>
            {l.rightsText} {SITE_CONFIG.email}.
          </p>
        </section>
      </LegalPageLayout>
    </>
  );
};

export default PolitiqueConfidentialite;
