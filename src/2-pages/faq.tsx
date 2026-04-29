import { FaqSection } from "../4-features/faq";
import { getFaqItems } from "../6-shared/api/get-faq";
import { getTranslations } from "next-intl/server";

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("FaqPage");
  const items = await getFaqItems(locale);

  return (
    <main>
      <FaqSection
        items={items}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        contactText={t("contactText")}
        contactCta={t("contactCta")}
        answer={t("answer")}
        locale={locale}
      />
    </main>
  );
}