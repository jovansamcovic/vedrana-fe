const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: any,
  name: string
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: any;
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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error('Failed to fetch project');

  const data: StrapiResponse<Project[]> = await res.json();
  return data.data[0] ?? null;
}