import { GallerySlider } from "../4-features/image-slider";
import { getProjectBySlug } from "../6-shared/api/project-details";

type Props = {
  slug: string;
  locale: string;
};

const ProjectDetailsPage = async ({ slug, locale }: Props) => {
  const project = await getProjectBySlug(slug, locale);

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="h-px bg-[#C4A053] mb-6 w-10" />
          <h1
            className="text-2xl sm:text-3xl md:text-4xl uppercase font-light tracking-[0.25em] mb-6"
            style={{ color: "#C4A053", fontFamily: "var(--font-cormorant)" }}
          >
            {project?.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px bg-stone-300 w-8" />
            <span
              className="text-xs tracking-[0.4em] uppercase text-stone-400"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {locale === "sr" ? "Projekat" : "Project"}
            </span>
          </div>
        </div>

        {/* Landscape slider */}
        <div className="mb-20 md:mb-28">
          <GallerySlider
            images={project?.galleryDesktop ?? []}
            title={project?.title ?? ""}
            orientation="landscape"
          />
        </div>

        {/* Dekorativni separator */}
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px flex-1 bg-stone-200" />
          <div className="w-1 h-1 rounded-full bg-[#C4A053] opacity-50" />
          <div className="w-1 h-1 rounded-full bg-[#C4A053] opacity-30" />
          <div className="w-1 h-1 rounded-full bg-[#C4A053] opacity-50" />
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* Portrait slider + tekst */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Portrait slider */}
          <div className="lg:sticky lg:top-8 order-3 lg:order-none">
            <GallerySlider
              images={project?.galleryMobile ?? []}
              title={project?.title ?? ""}
              orientation="portrait"
            />
          </div>

          {/* Tekst */}
          <div className="order-2 lg:order-none">
            <div className="h-px bg-[#C4A053] w-10 mb-10" />
            {Array.isArray(project?.description) &&
              project.description.map((block: any, i: number) =>
                block.children?.map((child: any, j: number) =>
                  child.text ? (
                    <p
                      key={`${i}-${j}`}
                      className="text-base md:text-lg leading-[2] mb-6 text-stone-500"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {child.text}
                    </p>
                  ) : null
                )
              )}
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProjectDetailsPage;