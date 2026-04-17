const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  year: number;
  featured: boolean;
  coverImage: StrapiImage | null;
  gallery: StrapiImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getFeaturedProjects(locale: string = "en"): Promise<Project[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?filters[featured][$eq]=true&populate=coverImage&sort=year:desc&locale=${locale}&pagination[pageSize]=100`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error('Failed to fetch featured projects');

  const data: StrapiResponse<Project[]> = await res.json();
  return data.data;
}