import { StrapiResponse } from "../../types";

export interface FaqItem {
  question: string;
  answer: string;
  order: number;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getFaqItems(locale: string = "sr"): Promise<FaqItem[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/faqs?populate=*&locale=${locale}&sort=order:asc`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch FAQ items: ${res.status} — ${error}`);
  }

  const data: StrapiResponse<FaqItem[]> = await res.json();
  return data.data;
}