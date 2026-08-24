import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

const PolitiqueCookies = () => {
  const { t } = useTranslation();
  const l = t("legal.cookies", { returnObjects: true }) as Record<string, string>;

  return (
    <>
      <Seo title={t("seo.legal.cookies.title")} description={t("seo.legal.cookies.description")} path="/politique-de-cookies" />
      <LegalPageLayout title={l.title}>
        <section>
          <h2>{l.noTrackingHeading}</h2>
          <p>{l.noTrackingText}</p>
        </section>

        <section>
          <h2>{l.storageHeading}</h2>
          <p>{l.storageText}</p>
        </section>

        <section>
          <h2>{l.evolutionHeading}</h2>
          <p>{l.evolutionText}</p>
        </section>
      </LegalPageLayout>
    </>
  );
};

export default PolitiqueCookies;
