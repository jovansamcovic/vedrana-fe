import { CrossfadeSlideshow } from "../4-features/slide-show";
import { getFeaturedProjects } from "../6-shared/api/gallery";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: Props) => {
  const { locale } = await params;

  const t = await getTranslations("HomePage");
  const featuredProjects = await getFeaturedProjects(locale);

  const slides = featuredProjects
    .filter((p) => p.coverImageDesktop)
    .map((p) => ({
      desktopUrl: p.coverImageDesktop!.url,
      mobileUrl: p.coverImageMobile!.url,
      alt: p.coverImageDesktop?.alternativeText || p.title,
      title: p.title,
      slug: p.slug,
    }));

  return (
    <main className="bg-[#F5F3EF]">
      <CrossfadeSlideshow slides={slides} />
    </main>
  );
};

export default HomePage;