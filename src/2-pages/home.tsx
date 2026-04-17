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

  console.log("featuredProjects")
  console.log(featuredProjects)

  console.log("projects");
  console.log(projects)

  const slides = featuredProjects
    .filter((p) => p.coverImageDesktop)
    .map((p) => ({
      src: p.coverImageDesktop!.url,
      alt: p.coverImageDesktop?.alternativeText || p.title,
      title: p.title,
    }));

  return (
    <main>
      <CrossfadeSlideshow slides={slides} />

      <div className="p-8">
        <h3
          style={{
            color: "#C4A053",
            fontSize: "40px",
            textTransform: "uppercase",
          }}
        >
          The Atelier
        </h3>

        <p className="mt-4">
          Founded in 2022 in Kragujevac, Vedrana Marković Atelier brings
          together the rigour of Italian design and the intimacy of a local
          practice. Trained in Milan and shaped by international experience,
          Vedrana creates residential and commercial interiors that feel deeply
          personal — spaces where opposing ideas are reconciled and every client
          receives far more than they expected.
        </p>
      </div>

      <ProjectsGrid projects={projects} locale={locale} />

      <div className="flex justify-center my-8">
        <Link
          href={`/${locale}/projects`}
          className="text-xs tracking-[0.4em] uppercase text-black border-b border-black pb-px hover:opacity-50 transition-opacity no-underline"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          All Projects
        </Link>
      </div>
    </main>
  );
};

export default HomePage;