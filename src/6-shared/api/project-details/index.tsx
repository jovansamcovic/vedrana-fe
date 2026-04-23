export async function getProjectBySlug(slug: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const res = await fetch(
    `${baseUrl}/api/projects?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  const project = data?.data?.[0];

  if (!project) {
    return null;
  }

  return project;
}