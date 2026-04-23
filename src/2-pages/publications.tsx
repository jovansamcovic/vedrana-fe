import Publications from "../4-features/publications";
import { getPublications } from "../6-shared/api/get-publications";

export default async function PublicationsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const publications = await getPublications(locale);

  return (
    <main>
      <Publications publications={publications} locale={locale} />
    </main>
  );
}