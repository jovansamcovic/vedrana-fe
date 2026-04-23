import { Project, StrapiResponse } from "../../types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getAllProjects(locale: string = "sr"): Promise<Project[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects?populate=*&locale=${locale}&pagination[pageSize]=100`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data: StrapiResponse<Project[]> = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}