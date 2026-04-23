import { StrapiResponse } from "../../types";

export interface About {
  id: number;
  title: string;
  description: any;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getAbouts(locale: string = "sr"): Promise<About[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/abouts?populate=*&locale=${locale}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data: StrapiResponse<About[]> = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}