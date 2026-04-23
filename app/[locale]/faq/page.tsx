import FaqPage from "@/src/2-pages/faq";

const locales = ["en", "sr"];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <FaqPage params={{ locale }} />;
}