"use client";

import { Publication } from "@/src/6-shared/api/get-publications";

const cormorant = { fontFamily: "var(--font-cormorant)" };

const translations = {
  en: {
    readFeature: "Read article",
  },
  sr: {
    readFeature: "Pročitaj tekst",
  },
};

const PlaceholderCover = ({ magazine }: { magazine: string }) => (
  <div className="w-full h-full flex items-end p-3 bg-[#E8E4DC]">
    <span
      className="text-stone-500 tracking-[0.15em] uppercase leading-tight"
      style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.6rem" }}
    >
      {magazine}
    </span>
  </div>
);

export function Publications({
  publications,
  locale,
}: {
  publications: Publication[];
  locale: string;
}) {
  const t =
    translations[locale as keyof typeof translations] ?? translations.sr;

  const byYear = publications.reduce<Record<string, Publication[]>>(
    (acc, pub) => {
      if (!acc[pub.year]) acc[pub.year] = [];
      acc[pub.year].push(pub);
      return acc;
    },
    {}
  );

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="w-full min-h-screen bg-[#F5F3EF]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        {years.map((year, yi) => (
          <div key={year} className={yi > 0 ? "mt-28" : ""}>
            {/* YEAR */}
            <div className="flex items-center gap-8 mb-14">
              <span
                className="text-stone-200 font-light leading-none"
                style={{
                  ...cormorant,
                  fontSize: "clamp(3rem, 8vw, 4rem)",
                }}
              >
                {year}
              </span>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            <div>
              {byYear[year].map((pub, pi) => (
                <div key={pub.id}>
                  {pi === 0 && <div className="h-px bg-stone-200" />}

                  {/* ROW */}
                  <div className="group grid grid-cols-[100px_1fr] lg:grid-cols-[220px_1fr_200px] gap-6 lg:gap-10 py-10 lg:py-14 transition hover:bg-[#C4A053]/[0.03]">
                    
                    {/* COVER */}
                    <div>
                      <div
                        className="relative 
                        w-[110px] aspect-[2/3] 
                        lg:w-[200px] lg:aspect-[16/10] 
                        p-2 bg-[#F5F3EF]"
                      >
                        {/* Inner wrapper */}
                        <div className="relative w-full h-full overflow-hidden">
                          
                          {(pub.coverImageMobile || pub.coverImageDesktop) ? (
                            <picture>
                              {pub.coverImageDesktop && (
                                <source
                                  media="(min-width: 1024px)"
                                  srcSet={pub.coverImageDesktop.url}
                                />
                              )}

                              <img
                                src={
                                  pub.coverImageMobile?.url ||
                                  pub.coverImageDesktop?.url
                                }
                                alt={pub.magazine}
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                style={{
                                  filter: "sepia(10%) contrast(0.95)",
                                }}
                              />
                            </picture>
                          ) : (
                            <PlaceholderCover magazine={pub.magazine} />
                          )}

                          {/* Zlatna linija */}
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C4A053] z-10" />

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* FRAME (isto kao ProjectsGrid) */}
                        <div className="absolute inset-0 border border-white/80 pointer-events-none m-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-center">
                      <span
                        className="text-[#C4A053] tracking-[0.35em] uppercase mb-3"
                        style={{ ...cormorant, fontSize: "0.75rem" }}
                      >
                        {pub.magazine}
                      </span>

                      <h2
                        className="text-stone-700 group-hover:text-stone-900 leading-snug mb-3"
                        style={{
                          ...cormorant,
                          fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                        }}
                      >
                        {pub.title}
                      </h2>

                      <p
                        className="text-stone-400 max-w-2xl leading-relaxed"
                        style={{
                          ...cormorant,
                          fontSize: "0.9rem",
                        }}
                      >
                        {pub.excerpt}
                      </p>

                      {/* MOBILE LINK */}
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-stone-400 hover:text-[#C4A053] transition lg:hidden"
                        style={{
                          ...cormorant,
                          fontSize: "0.7rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                        }}
                      >
                        <span className="w-5 h-px bg-current" />
                        {t.readFeature}
                      </a>
                    </div>

                    {/* DESKTOP LINK */}
                    <div className="hidden lg:flex items-center justify-end pr-4">
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-stone-300 group-hover:text-[#C4A053] transition"
                        style={{
                          ...cormorant,
                          fontSize: "0.7rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.readFeature}
                        <span className="transition-transform duration-300 group-hover:translate-x-2">
                          →
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-stone-200" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Publications;