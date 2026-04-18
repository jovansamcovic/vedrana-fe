import Link from "next/link";
import { ProjectsGrid } from "../4-features/projects-grid";
import { CrossfadeSlideshow } from "../4-features/slide-show";
import { getAllProjects } from "../6-shared/api/all-projects";
import { getFeaturedProjects } from "../6-shared/api/gallery";

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

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="h-px bg-[#C4A053] w-16 mb-8" />
        <h3
          className="font-light tracking-[0.15em] uppercase mb-6"
          style={{
            color: "#C4A053",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontFamily: "var(--font-cormorant)",
          }}
        >
          {t.atelierTitle}
        </h3>
        <p
          className="text-base md:text-lg leading-[1.9] text-stone-600 max-w-2xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {t.atelierDescription}
        </p>
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