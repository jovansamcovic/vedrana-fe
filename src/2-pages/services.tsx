import { getTranslations } from "next-intl/server";
import { Icon1, Icon2, Icon3, Icon4, ServicesFlow } from "../4-features/services-flow";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const t = await getTranslations("ServicesPage");

  const phases = [
    {
      num: "01",
      tag: t("preparation"),
      title: t("phase1Title"),
      items: t.raw("phase1Items") as string[],
      deliverable: t("phase1Deliverable"),
      icon: <Icon1 />,
    },
    {
      num: "02",
      tag: t("design"),
      title: t("phase2Title"),
      items: t.raw("phase2Items") as string[],
      deliverable: t("phase2Deliverable"),
      icon: <Icon2 />,
    },
    {
      num: "03",
      tag: t("technical"),
      title: t("phase3Title"),
      items: t.raw("phase3Items") as string[],
      deliverable: t("phase3Deliverable"),
      icon: <Icon3 />,
    },
    {
      num: "04",
      tag: t("execution"),
      title: t("phase4Title"),
      items: t.raw("phase4Items") as string[],
      deliverable: t("phase4Deliverable"),
      icon: <Icon4 />,
    },
  ];

  return (
    <main className="bg-[#F5F3EF] min-h-screen">
      <ServicesFlow
        phases={phases}
        pageTitle={t("pageTitle")}
        pageSubtitle={t("pageSubtitle")}
        eyebrow={t("eyebrow")}
      />
    </main>
  );
}