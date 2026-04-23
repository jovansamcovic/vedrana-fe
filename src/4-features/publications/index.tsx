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
  <div className="w-full h-full flex items-end p-2 bg-[#E8E4DC]">
    <span
      className="text-stone-500 tracking-[0.15em] uppercase leading-tight"
      style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.5rem" }}
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
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-20">
        {years.map((year, yi) => (
          <div key={year} className={yi > 0 ? "mt-20 lg:mt-24" : ""}>
            {/* Year */}
            <div className="flex items-center gap-6 lg:gap-8 mb-10 lg:mb-12">
              <span
                className="text-stone-200 font-light leading-none"
                style={{
                  ...cormorant,
                  fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
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
                  <div className="group grid grid-cols-[90px_1fr] lg:grid-cols-[120px_1fr_180px] gap-4 lg:gap-0 py-8 lg:py-10 transition hover:bg-[#C4A053]/[0.03]">
                    {/* COVER */}
                    <div>
                      <div className="relative overflow-hidden w-[80px] h-[110px] lg:w-[96px] lg:h-[128px]">
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C4A053] z-10" />

                        {/* Mobile cover */}
                        {pub.coverImageMobile ? (
                          <img
                            src={pub.coverImageMobile.url}
                            alt={pub.magazine}
                            className="block lg:hidden w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ filter: "sepia(10%) contrast(0.95)" }}
                          />
                        ) : (
                          <div className="block lg:hidden w-full h-full">
                            <PlaceholderCover
                              magazine={pub.magazine}
                            />
                          </div>
                        )}

                        {/* Desktop cover */}
                        {pub.coverImageDesktop ? (
                          <img
                            src={pub.coverImageDesktop.url}
                            alt={pub.magazine}
                            className="hidden lg:block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ filter: "sepia(10%) contrast(0.95)" }}
                          />
                        ) : (
                          <div className="hidden lg:block w-full h-full">
                            <PlaceholderCover
                              magazine={pub.magazine}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-center lg:px-10">
                      <span
                        className="text-[#C4A053] tracking-[0.35em] uppercase mb-2"
                        style={{ ...cormorant, fontSize: "0.7rem" }}
                      >
                        {pub.magazine}
                      </span>

                      <h2
                        className="text-stone-700 group-hover:text-stone-900 leading-snug mb-2"
                        style={{
                          ...cormorant,
                          fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
                        }}
                      >
                        {pub.title}
                      </h2>

                      <p
                        className="text-stone-400 max-w-xl line-clamp-2 lg:line-clamp-none"
                        style={{
                          ...cormorant,
                          fontSize: "0.85rem",
                        }}
                      >
                        {pub.excerpt}
                      </p>

                      {/* LINK (mobile) */}
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-stone-400 hover:text-[#C4A053] transition lg:hidden"
                        style={{
                          ...cormorant,
                          fontSize: "0.65rem",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                        }}
                      >
                        <span className="w-4 h-px bg-current" />
                        {t.readFeature}
                      </a>
                    </div>

                    {/* DESKTOP LINK */}
                    <div className="hidden lg:flex items-center justify-end">
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-stone-300 group-hover:text-[#C4A053] transition"
                        style={{
                          ...cormorant,
                          fontSize: "0.65rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.readFeature}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
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