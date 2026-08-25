import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SITE_CONFIG } from "@/lib/site-config";

const MentionsLegales = () => {
  const { t } = useTranslation();
  const l = t("legal.mentions", { returnObjects: true }) as Record<string, string>;

  return (
    <>
      <Seo title={t("seo.legal.mentions.title")} description={t("seo.legal.mentions.description")} path="/mentions-legales" />
      <LegalPageLayout title={l.title}>
        <section>
          <h2>{l.editorHeading}</h2>
          <p>
            {SITE_CONFIG.siteUrl.replace("https://", "")} {l.editorIntro} {SITE_CONFIG.name}, {l.editorSuffix}
          </p>
          <ul>
            <li>{l.companyName} : {SITE_CONFIG.name}</li>
            <li>{l.address} : {l.addressValue}</li>
            <li>{l.email} : {SITE_CONFIG.email}</li>
            <li>{l.phone} : {SITE_CONFIG.phone}</li>
          </ul>
          <p className="text-sm text-muted-foreground">{l.registrationNote}</p>
        </section>

        <section>
          <h2>{l.hostingHeading}</h2>
          <p>{l.hostingText}</p>
        </section>

        <section>
          <h2>{l.devHeading}</h2>
          <p>{l.devText}</p>
        </section>

        <section>
          <h2>{l.ipHeading}</h2>
          <p>{l.ipText}</p>
        </section>

        <section>
          <h2>{l.photoCreditsHeading}</h2>
          <p>
            {l.photoCreditsText}{" "}
            <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer">
              CC BY-SA 2.0
            </a>{" "}
            (
            <a href="https://commons.wikimedia.org/wiki/File:Mont_Passot2.jpg" target="_blank" rel="noopener noreferrer">
              source
            </a>
            ).
          </p>
        </section>
      </LegalPageLayout>
    </>
  );
};

export default MentionsLegales;
