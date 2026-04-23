import { Project, StrapiResponse } from "../../types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getProjectBySlug(slug: string, locale: string = "sr"): Promise<Project | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?populate=*&filters[slug][$eq]=${slug}&locale=${locale}`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) throw new Error("Failed to fetch project");

  const data: StrapiResponse<Project[]> = await res.json();

  if (!data.data[0] && locale !== "en") {
    return getProjectBySlug(slug, "en");
  }

  return data.data[0] ?? null;
}