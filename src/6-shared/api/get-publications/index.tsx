import { StrapiResponse } from "../../types";

export interface Publication {
  id: number;
  year: number; // 👈 koristi number svuda
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
  const res = await fetch(
    `${STRAPI_URL}/api/publications?populate=*&locale=${locale}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) throw new Error("Failed to fetch publications");

  const data: StrapiResponse<Publication[]> = await res.json();
  return data.data;
}
