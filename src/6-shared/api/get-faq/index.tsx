import { StrapiResponse } from "../../types";

export interface FaqItem {
  question: string;
  answer: string;
  order: number;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getFaqItems(locale: string = "sr"): Promise<FaqItem[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/faqs?populate=*&locale=${locale}&sort=order:asc`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const data: StrapiResponse<FaqItem[]> = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}