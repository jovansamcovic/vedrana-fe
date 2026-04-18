import Image from "next/image";
import Link from "next/link";

export const ProjectsGrid = async ({ projects, locale }: any) => {
  return (
    <section className="w-full bg-[#F5F3EF] px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex items-center gap-6 mb-12 md:mb-16">
          <div className="h-px flex-1 bg-stone-400" />
          <span
            className="text-xs tracking-[0.4em] uppercase text-stone-500"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Projects
          </span>
          <div className="h-px flex-1 bg-stone-400" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {projects.map((project: any) => {
            const desktopUrl = project.coverImageDesktop?.url || null;
            const mobileUrl = project.coverImageMobile?.url || null;

            return (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="group relative block no-underline overflow-hidden aspect-[3/4] sm:aspect-[4/3]"
              >
                {/* Mobile slika */}
                {mobileUrl && (
                  <Image
                    src={mobileUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 block sm:hidden"
                    sizes="100vw"
                  />
                )}

                {/* Desktop slika */}
                {desktopUrl && (
                  <Image
                    src={desktopUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 hidden sm:block"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                )}

                {/* Fallback */}
                {!mobileUrl && !desktopUrl && (
                  <div className="absolute inset-0 bg-stone-200" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Title */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <div className="h-px bg-[#C4A053] w-8 mb-3" />
                  <span
                    className="text-xl tracking-[0.2em] uppercase text-white font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {project.title}
                  </span>
                  <span className="text-xs tracking-[0.3em] uppercase text-[#C4A053] mt-1">
                    View Project →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};