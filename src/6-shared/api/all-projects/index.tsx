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


export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(`${STRAPI_URL}/api/projects?populate=*&sort=year:desc`);

  if (!res.ok) throw new Error('Failed to fetch projects');

  const data: StrapiResponse<Project[]> = await res.json();
  return data.data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!res.ok) throw new Error('Failed to fetch project');

  const data: StrapiResponse<Project[]> = await res.json();
  return data.data[0] ?? null;
}