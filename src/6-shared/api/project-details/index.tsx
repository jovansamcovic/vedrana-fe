import { Project, StrapiResponse } from "../../types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getProjectBySlug(slug: string, locale: string = "en"): Promise<Project | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?populate=*&filters[slug][$eq]=${slug}&locale=${locale}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch project");

  const data: StrapiResponse<Project[]> = await res.json();
  return data.data[0] ?? null;
}