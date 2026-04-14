import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const ProjectsGrid = async ({ projects, locale }: any) => {
  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-24">
      <div className="flex items-center gap-6 mb-10 md:mb-14">
        <div className="h-px flex-1 bg-black" />
        <span
          className="text-xs tracking-[0.4em] uppercase text-black"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Projects
        </span>
        <div className="h-px flex-1 bg-black" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project:any) => {
         const imageUrl = project.coverImage?.url || null;

          return (
            <Link
              key={project.slug}
              href={`/${locale}/projects/${project.slug}`}
              className="group relative flex flex-col no-underline overflow-hidden aspect-[4/5]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-stone-200" />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

              <div className="absolute bottom-6 left-5 right-5 z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg tracking-[0.3em] uppercase text-white group-hover:opacity-50 transition-opacity"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {project.title}
                  </span>
                  <ChevronRight
                    size={36}
                    className="text-white group-hover:opacity-50 transition-opacity shrink-0"
                  />
                </div>
                <div className="border-t-2 border-white" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
