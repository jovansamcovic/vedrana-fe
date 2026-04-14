import HomePage from "@/src/2-pages/home";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <HomePage params={{ locale }} />;
}