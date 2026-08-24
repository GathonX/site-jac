import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/site-config";

const ConditionsGenerales = () => {
  const { t } = useTranslation();
  const l = t("legal.terms", { returnObjects: true }) as Record<string, string>;

  return (
    <>
      <Seo title={t("seo.legal.terms.title")} description={t("seo.legal.terms.description")} path="/conditions-generales" />
      <LegalPageLayout title={l.title}>
        <section>
          <h2>{l.objectHeading}</h2>
          <p>{l.objectText}</p>
        </section>

        <section>
          <h2>{l.bookingHeading}</h2>
          <p>{l.bookingText}</p>
        </section>

        <section>
          <h2>{l.weatherHeading}</h2>
          <p>{l.weatherText}</p>
        </section>

        <section>
          <h2>{l.liabilityHeading}</h2>
          <p>{l.liabilityText}</p>
        </section>

        <section>
          <h2>{l.contactHeading}</h2>
          <p>
            {l.contactText} {SITE_CONFIG.email}.
          </p>
        </section>
      </LegalPageLayout>
    </>
  );
};

export default ConditionsGenerales;
