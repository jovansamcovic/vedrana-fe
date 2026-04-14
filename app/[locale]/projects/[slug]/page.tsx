import ProjectDetailsPage from "@/src/2-pages/project-details";


export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <ProjectDetailsPage locale={locale} slug={slug} />;
}