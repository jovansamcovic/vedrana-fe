import { Footer } from "@/src/4-features/footer";
import { Header } from "@/src/4-features/header";
import { LoadingScreen } from "@/src/4-features/loading-screen";

export default async function Layout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  console.log("locale")
  console.log(locale)

  return (
    <>
      <LoadingScreen key={locale} locale={locale as "sr" | "en"} />
      <Header />
      {children}
      <Footer />
    </>
  );
}