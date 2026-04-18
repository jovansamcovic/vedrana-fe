import { GallerySlider } from "../4-features/image-slider";
import { getProjectBySlug } from "../6-shared/api/project-details";
import Image from "next/image";

type Props = {
  slug: string;
  locale: string;
};

const ProjectDetailsPage = async ({ slug, locale }: Props) => {
  const project = await getProjectBySlug(slug, locale);
  const gallery = project?.galleryDesktop ?? [];

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="h-px bg-[#C4A053] mb-8 w-16" />
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-light tracking-[0.15em]"
            style={{ color: "#C4A053", fontFamily: "var(--font-cormorant)" }}
          >
            {project?.title}
          </h1>
        </div>

        {/* Layout: slider levo, tekst desno */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Slider */}
          <div className="lg:sticky lg:top-8">
            <GallerySlider images={gallery} title={project?.title ?? ""} />
          </div>

          {/* Tekst */}
          <div>
            <div className="h-px bg-stone-300 mb-8" />
            {Array.isArray(project?.description) &&
              project.description.map((block: any, i: number) =>
                block.children?.map((child: any, j: number) => (
                  <p
                    key={`${i}-${j}`}
                    className="text-base md:text-lg leading-[1.9] mb-6 text-stone-600"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {child.text}
                  </p>
                ))
              )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailsPage;