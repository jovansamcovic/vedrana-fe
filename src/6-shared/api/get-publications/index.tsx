import { StrapiResponse } from "../../types";

export interface Publication {
  id: number;
  year: number;
  magazine: string;
  title: string;
  excerpt: string;
  href: string;
  coverImageDesktop: { url: string };
  coverImageMobile: { url: string };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getPublications(
  locale: string = "sr",
): Promise<Publication[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/publications?populate=*&locale=${locale}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const data: StrapiResponse<Publication[]> = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}