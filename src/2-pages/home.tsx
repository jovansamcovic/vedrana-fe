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

const HomePage = async ({ params }: Props) => {
  const { locale } = params;

  const projects = await getAllProjects(locale);
  const featuredProjects = await getFeaturedProjects(locale);

  const slides = featuredProjects
    .filter((p) => p.coverImageDesktop)
    .map((p) => ({
      src: p.coverImageDesktop!.url,
      alt: p.coverImageDesktop?.alternativeText || p.title,
      title: p.title,
    }));

  return (
    <main className="bg-[#F5F3EF]">
      {/* Galerija - full width */}
      <CrossfadeSlideshow slides={slides} />

      {/* Atelier sekcija */}
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
          The Atelier
        </h3>
        <p
          className="text-base md:text-lg leading-[1.9] text-stone-600 max-w-2xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Founded in 2022 in Kragujevac, Vedrana Marković Atelier brings
          together the rigour of Italian design and the intimacy of a local
          practice. Trained in Milan and shaped by international experience,
          Vedrana creates residential and commercial interiors that feel deeply
          personal — spaces where opposing ideas are reconciled and every client
          receives far more than they expected.
        </p>
      </div>

      {/* Projects grid - full width unutar svoje sekcije */}
      <ProjectsGrid projects={projects} locale={locale} />

      {/* All Projects link */}
      <div className="max-w-[1440px] mx-auto flex justify-center py-12 md:py-16">
        <Link
          href={`/${locale}/projects`}
          className="text-xs tracking-[0.4em] uppercase text-stone-600 border-b border-stone-400 pb-px hover:opacity-50 transition-opacity no-underline"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          All Projects
        </Link>
      </div>
    </main>
  );
};

export default HomePage;