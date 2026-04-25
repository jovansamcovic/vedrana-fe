export async function getProjectBySlug(slug: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  // ── 1. Fetch trenutnog projekta ────────────────────────────────────────────
  const res = await fetch(
    `${baseUrl}/api/projects?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const project = data?.data?.[0];
  if (!project) return null;

  // ── 2. Fetch svih projekata za prev/next ───────────────────────────────────
  const allRes = await fetch(
    `${baseUrl}/api/projects?locale=${locale}&fields[0]=slug&fields[1]=title&populate[coverImageDesktop][fields][0]=url&sort=createdAt:asc`,
    { cache: "force-cache" }
  );

  let nextProject = null;
  let prevProject = null;

  if (allRes.ok) {
    const allData = await allRes.json();
    const allProjects: any[] = allData?.data ?? [];
    const total = allProjects.length;
    const currentIndex = allProjects.findIndex((p) => p?.slug === slug);

    if (currentIndex !== -1 && total > 1) {
      const buildProject = (raw: any) => ({
        slug: raw.slug ?? null,
        title: raw.title ?? "",
        coverUrl: raw?.coverImageDesktop?.url ?? null,
      });

      nextProject = buildProject(allProjects[(currentIndex + 1) % total]);
      prevProject = buildProject(allProjects[(currentIndex - 1 + total) % total]);
    }
  }

  return {
    ...project,
    nextProject,
    prevProject,
  };
}