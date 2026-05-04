import { Footer } from "@/src/4-features/footer";
import { Header } from "@/src/4-features/header";
import { LoadingScreen } from "@/src/4-features/loading-screen";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function Layout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LoadingScreen key={locale} />
      <Header locale={locale}/>
      {children}
    </NextIntlClientProvider>
  );
}