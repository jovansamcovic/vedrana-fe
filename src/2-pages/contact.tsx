import { ContactSection } from "../4-features/contact-section";

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <main>
      <ContactSection locale={locale} />
    </main>
  );
}