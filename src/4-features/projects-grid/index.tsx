import Image from "next/image";
import Link from "next/link";

const translations = {
  en: {
    sectionLabel: "Projects",
  },
  sr: {
    sectionLabel: "Projekti",
  },
};

export const ProjectsGrid = async ({ projects, locale }: any) => {
  const t =
    translations[locale as keyof typeof translations] ?? translations.en;

  return (
    <section className="w-full bg-[#F5F3EF] px-6 md:px-12 lg:px-20 py-20">
      <div>
        {/* Header */}
        <div className="flex items-center gap-6 mb-12 md:mb-16">
          <div className="h-px flex-1 bg-stone-300" />
          <span
            className="text-[#C4A053] tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem" }}
          >
            {t.sectionLabel}
          </span>
          <div className="h-px flex-1 bg-stone-300" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => {
            const imageUrl =
              project.coverImageDesktop?.url ||
              project.coverImageMobile?.url ||
              null;

            return (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="group relative block no-underline overflow-hidden"
              >
                {/* Slika */}
                <div className="relative overflow-hidden aspect-[4/3] p-3 bg-[#F5F3EF]">
                  <div className="relative w-full h-full overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-stone-200" />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Animirana zlatna linija na dnu slike */}
                    <div className="absolute bottom-0 left-0 h-px bg-[#C4A053] w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
                  </div>

                  {/* Okvir */}
                  <div className="absolute inset-0 border border-white/80 pointer-events-none m-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
                </div>

                {/* Tekst ispod slike */}
                <div className="pt-3 pb-6 flex items-center justify-between">
                  <div>
                    <div className="h-px bg-[#C4A053] w-6 mb-2" />
                    <span
                      className="text-stone-600 font-light tracking-[0.2em] uppercase block"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {project.title}
                    </span>
                  </div>
                  <span
                    className="text-[#C4A053] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    →
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
