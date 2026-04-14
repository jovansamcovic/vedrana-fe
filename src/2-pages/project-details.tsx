import { getProjectBySlug } from "../6-shared/api/project-details";
import Image from "next/image";

type Props = {
  slug: string;
};

const ProjectDetailsPage = async ({ slug }: Props) => {
  const project = await getProjectBySlug(slug);

  return (
    <main>
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-16">
        
        {/* Naslov - responsive */}
        <h3
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase mb-6 sm:mb-8 md:mb-10 font-light tracking-wider"
          style={{
            color: "#C4A053",
          }}
        >
          {project?.title}
        </h3>

        {/* Opis - ograničena širina na velikim ekranima */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-2xl lg:max-w-3xl">
          {Array.isArray(project?.description) &&
            project.description.map((block: any, i: number) =>
              block.children?.map((child: any, j: number) => (
                <p
                  key={`${i}-${j}`}
                  className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-relaxed md:leading-[1.8] lg:leading-[1.8] my-3 sm:my-4 md:my-5 text-gray-700"
                >
                  {child.text}
                </p>
              )),
            )}
        </div>

        {/* Galerija - responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl">
          {project?.gallery.map((image) => {
            return (
              <div
                key={image.id}
                className="relative w-full overflow-hidden aspect-[4/5] rounded-sm hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={image.url}
                  alt={project?.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  priority={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailsPage;