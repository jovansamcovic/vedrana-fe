import ProjectDetailsPage from "@/src/2-pages/project-details";

const locales = ["en", "sr"];

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined.");
  }

  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const res = await fetch(
      `${baseUrl}/api/projects?locale=${locale}&fields[0]=slug`,
      {
        cache: "force-cache",
      },
    );

    const data = await res.json();

    const projects = data?.data ?? [];

    params.push(
      ...projects.map((project: any) => ({
        locale,
        slug:
          project?.attributes?.slug ??
          project?.slug ??
          project?.data?.attributes?.slug,
      })),
    );
  }

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;

  return <ProjectDetailsPage slug={slug} locale={locale} />;
}
