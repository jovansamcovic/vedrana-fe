import Link from "next/link";
import { ProjectsGrid } from "../4-features/projects-grid";
import { CrossfadeSlideshow } from "../4-features/slide-show";
import { getAllProjects } from "../6-shared/api/all-projects";
import { getFeaturedProjects } from "../6-shared/api/gallery";
import Image from "next/image";
import { getAbouts } from "../6-shared/api/get-about";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type Props = {
  params: {
    locale: string;
  };
};

const translations = {
  en: {
    atelierTitle: "The Atelier",
    atelierDescription:
      "Founded in 2022 in Kragujevac, Vedrana Marković Atelier brings together the rigour of Italian design and the intimacy of a local practice. Trained in Milan and shaped by international experience, Vedrana creates residential and commercial interiors that feel deeply personal — spaces where opposing ideas are reconciled and every client receives far more than they expected.",
    allProjects: "All Projects",
  },
  sr: {
    atelierTitle: "Atelje",
    atelierDescription:
      "Osnovan 2022. godine u Kragujevcu, Atelje Vedrana Marković spaja preciznost italijanskog dizajna i intimnost lokalne prakse. Školovana u Milanu i oblikovana međunarodnim iskustvom, Vedrana stvara stambene i poslovne enterijere koji deluju duboko lično — prostore u kojima se suprotne ideje usklađuju i svaki klijent dobija daleko više nego što je očekivao.",
    allProjects: "Svi projekti",
  },
};

const HomePage = async ({ params }: Props) => {
  const { locale } = params;

  const t = translations[locale as keyof typeof translations] ?? translations.en;

  const projects = await getAllProjects(locale);
  const featuredProjects = await getFeaturedProjects(locale);
  const abouts = await getAbouts(locale);
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

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-32">
        <div className="flex flex-col xl:flex-row md:items-center gap-10 md:gap-20 lg:gap-28">

          {/* Tekst */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-px bg-[#C4A053] w-16 mb-10" />

            <h3
              className="font-light tracking-[0.2em] uppercase mb-10"
              style={{
                color: "#C4A053",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontFamily: "var(--font-cormorant)",
              }}
            >
              {abouts[0]?.title}
            </h3>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-stone-400" />
              <div className="w-1 h-1 rounded-full bg-stone-400" />
            </div>

            <div
              className="text-base md:text-lg leading-[2] text-stone-500 max-w-lg"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {abouts[0]?.description ? (
                <BlocksRenderer content={abouts[0].description} />
              ) : null}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-[#C4A053] opacity-60" />
              <span
                className="text-sm tracking-[0.3em] text-[#C4A053] uppercase font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Vedrana Marković
              </span>
            </div>
          </div>

          {/* Slika */}
          <div className="relative shrink-0 w-full md:w-[450px] lg:w-[500px]">
            <div className="absolute -top-4 -right-4 w-full h-full border border-[#C4A053] opacity-20 hidden md:block" />
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/Vedrana.webp"
                alt="Vedrana Marković"
                fill
                className="object-cover grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-[#F5F3EF] opacity-5" />
            </div>
          </div>

        </div>
      </div>

      <ProjectsGrid projects={projects.slice(0, 3)} locale={locale} />

      <div className="max-w-[1440px] mx-auto flex justify-center mb-12 md:mb-16">
        <Link
          href={`/${locale}/projects`}
          className="text-xs tracking-[0.4em] uppercase text-stone-600 border-b border-stone-400 pb-px hover:opacity-50 transition-opacity no-underline"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {t.allProjects}
        </Link>
      </div>
    </main>
  );
};

export default HomePage;