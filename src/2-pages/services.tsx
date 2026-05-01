import { getTranslations } from "next-intl/server";
import { ServicesFlow } from "../4-features/services-flow";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("ServicesPage");
const contactHref = `/${locale}/contact`;

  const phases = [
    {
      num: "01",
      tag: t("preparation"),
      title: t("phase1Title"),
      description: t("phase1Description"),
      items: t.raw("phase1Items") as string[],
      deliverable: t("phase1Deliverable"),
    },
    {
      num: "02",
      tag: t("design"),
      title: t("phase2Title"),
      description: t("phase2Description"),
      items: t.raw("phase2Items") as string[],
      deliverable: t("phase2Deliverable"),
    },
    {
      num: "03",
      tag: t("technical"),
      title: t("phase3Title"),
      description: t("phase3Description"),
      items: t.raw("phase3Items") as string[],
      deliverable: t("phase3Deliverable"),
    },
    {
      num: "04",
      tag: t("execution"),
      title: t("phase4Title"),
      description: t("phase4Description"),
      items: t.raw("phase4Items") as string[],
      deliverable: t("phase4Deliverable"),
    },
  ];

  return (
    <main>
      <ServicesFlow
        phases={phases}
        pageTitle={t("pageTitle")}
        pageIntro={t("pageIntro")}
        eyebrow={t("eyebrow")}
        closing={t("closing")}
        closingCta={t("closingCta")}
        contactHref={contactHref}
      />
    </main>
  );
}