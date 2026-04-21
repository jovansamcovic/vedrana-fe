import { ContactSection } from "../4-features/contact-section";
import { getAllProjects } from "../6-shared/api/all-projects";

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
 const projects = await getAllProjects(locale);

  return (
    <main>
      <ContactSection locale={locale} />
    </main>
  );
}