import { Project, StrapiResponse } from "../../types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getFeaturedProjects(locale: string = "en"): Promise<Project[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?filters[featured][$eq]=true&populate[0]=coverImageDesktop&populate[1]=coverImageMobile&locale=${locale}&pagination[pageSize]=100`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error('Failed to fetch featured projects');

  const data: StrapiResponse<Project[]> = await res.json();
  return data.data;
}