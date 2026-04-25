import { FaqSection } from "../4-features/faq";
import { getFaqItems } from "../6-shared/api/get-faq";

const translations = {
  en: {
    eyebrow: "FAQ",
    title: "Everything you need to know",
    subtitle: "Answers to the most common questions before we start working together.",
    contactText: "Didn't find your answer? Write to us directly.",
    contactCta: "Contact us",
  },
  sr: {
    eyebrow: "Česta pitanja",
    title: "Sve što želite da znate",
    subtitle: "Odgovori na pitanja koja se najčešće postavljaju pre nego što krenemo da radimo zajedno.",
    contactText: "Niste pronašli odgovor? Pišite nam direktno.",
    contactCta: "Kontaktirajte nas",
  },
};

export default async function FaqPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] ?? translations.sr;
  const items = await getFaqItems(locale);

  return (
    <main>
      <FaqSection
        items={items}
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
        contactText={t.contactText}
        contactCta={t.contactCta}
        locale={locale}
      />
    </main>
  );
}