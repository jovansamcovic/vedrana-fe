// Server Component — bez "use client"
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "../6-shared/api/project-details";
import { FadeSection } from "../4-features/face-section";

type Props = {
  slug: string;
  locale: string;
};

// Miksuje landscape i portrait slike u jedan niz
// Pattern po redu: L L P | P L P | L L P ...
// Svaka slika dobija span i aspect na osnovu pozicije u pattern-u
type ImageItem = {
  id: number;
  url: string;
  orientation: "landscape" | "portrait";
};

type SlotConfig = {
  cols: string;        // lg:col-span-X
  aspect: string;      // aspect-[w/h]
};

// 9-slot pattern koji se ponavlja (3 reda po 3 kolone u 12-col gridu)
const PATTERN: SlotConfig[] = [
  { cols: "lg:col-span-5", aspect: "aspect-[16/10]" }, // L — velika landscape
  { cols: "lg:col-span-4", aspect: "aspect-[16/10]" }, // L — manja landscape
  { cols: "lg:col-span-3", aspect: "aspect-[3/4]"   }, // P — portrait
  { cols: "lg:col-span-3", aspect: "aspect-[3/4]"   }, // P — portrait
  { cols: "lg:col-span-5", aspect: "aspect-[16/10]" }, // L — landscape sredina
  { cols: "lg:col-span-4", aspect: "aspect-[3/4]"   }, // P — portrait
  { cols: "lg:col-span-4", aspect: "aspect-[16/10]" }, // L
  { cols: "lg:col-span-4", aspect: "aspect-[16/10]" }, // L
  { cols: "lg:col-span-4", aspect: "aspect-[3/4]"   }, // P
];

const ProjectDetailsPage = async ({ slug, locale }: Props) => {
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();

  const isSr = locale === "sr";
  const heroImage = project.galleryDesktop?.[0];

  // Sve slike osim hero-a, landscape + portrait ismiksovane
  const landscapeImages: ImageItem[] = (project.galleryDesktop?.slice(1) ?? []).map(
    (img: any) => ({ id: img.id, url: img.url, orientation: "landscape" as const })
  );
  const portraitImages: ImageItem[] = (project.galleryMobile ?? []).map(
    (img: any) => ({ id: img.id, url: img.url, orientation: "portrait" as const })
  );

  // Interleave: L, L, P, L, P, P, L, L...
  const mixed: ImageItem[] = [];
  let li = 0, pi = 0;
  while (li < landscapeImages.length || pi < portraitImages.length) {
    if (li < landscapeImages.length) mixed.push(landscapeImages[li++]);
    if (li < landscapeImages.length) mixed.push(landscapeImages[li++]);
    if (pi < portraitImages.length)  mixed.push(portraitImages[pi++]);
  }

  return (
    <main style={{ backgroundColor: "#F5F3EF", color: "#2C2C2A" }}>

      {/* ── 1. FULL-BLEED HERO ─────────────────────────────────────────── */}
      {heroImage && (
        <section className="relative w-full h-[90vh] md:h-screen overflow-hidden">
          <Image
            src={heroImage.url}
            alt={project.title ?? ""}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 z-10">
            <div className="mb-5" style={{ width: 40, height: 1, backgroundColor: "#C4A053" }} />
            <h1
              className="text-white uppercase font-light tracking-[0.2em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {project.title}
            </h1>
            <p
              className="mt-3 text-white/60 text-xs tracking-[0.45em] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {isSr ? "Projekat" : "Project"}
            </p>
          </div>
          <div className="absolute bottom-10 right-8 md:bottom-16 md:right-16 flex flex-col items-center gap-2 z-10">
            <span
              className="text-white/50 text-[10px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {isSr ? "Skroluj" : "Scroll"}
            </span>
            <div className="w-px bg-white/30 animate-pulse" style={{ height: 48 }} />
          </div>
        </section>
      )}

      {/* ── 2. TEKST ───────────────────────────────────────────────────── */}
      <div className="max-w-[780px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <FadeSection delay={0}>
          <div className="mb-10" style={{ width: 32, height: 1, backgroundColor: "#C4A053" }} />
          {Array.isArray(project.description) &&
            project.description.map((block: any, i: number) =>
              block.children?.map((child: any, j: number) =>
                child.text ? (
                  <p
                    key={`${i}-${j}`}
                    className="text-base md:text-lg leading-[2.1] mb-7 text-stone-500"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {child.text}
                  </p>
                ) : null
              )
            )}
        </FadeSection>
      </div>

      {/* ── 3. MIXED GRID ──────────────────────────────────────────────── */}
      {mixed.length > 0 && (
        <div className="px-4 md:px-8 pb-24 md:pb-32">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-end">
            {mixed.map((img, i) => {
              const slot = PATTERN[i % PATTERN.length];
              return (
                <FadeSection
                  key={img.id}
                  delay={i * 60}
                  className={`col-span-1 ${slot.cols}`}
                >
                  <div className={`relative overflow-hidden ${slot.aspect}`}>
                    <Image
                      src={img.url}
                      alt={project.title ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
                    />
                  </div>
                </FadeSection>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 4. PREV / NEXT CTA ─────────────────────────────────────────── */}
      {(project.prevProject?.slug || project.nextProject?.slug) && (
        <div className="flex flex-col sm:flex-row w-full gap-px bg-[#F5F3EF]">
          {[
            { data: project.prevProject, label: isSr ? "Prethodni projekat" : "Previous project", align: "left" },
            { data: project.nextProject, label: isSr ? "Sledeći projekat"   : "Next project",     align: "right" },
          ].map(({ data, label, align }) =>
            data?.slug ? (
              <Link
                key={data.slug}
                href={`/${locale}/projects/${data.slug}`}
                className="group relative block overflow-hidden flex-1"
                style={{ height: "40vh", minHeight: 240 }}
              >
                {/* Slika — blago zamrznuta, hover je otključava */}
                {data.coverUrl && (
                  <Image
                    src={data.coverUrl}
                    alt={data.title}
                    fill
                    className="object-cover scale-[1.04] blur-[2px] transition-all duration-700 group-hover:scale-110 group-hover:blur-0"
                    sizes="50vw"
                  />
                )}

                {/* Jak overlay koji se povlači na hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: "rgba(245,243,239,0.55)" }}
                />

                {/* Tekst */}
                <div
                  className={`absolute bottom-7 z-10 px-8 md:px-12 ${
                    align === "right" ? "right-0 text-right" : "left-0 text-left"
                  }`}
                >
                  <p
                    className="text-stone-400 text-[9px] tracking-[0.5em] uppercase mb-2 transition-colors duration-300 group-hover:text-white/70"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {label}
                  </p>
                  <h2
                    className="text-stone-700 uppercase font-light tracking-[0.15em] text-lg md:text-2xl lg:text-3xl transition-colors duration-300 group-hover:text-white"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {data.title}
                  </h2>
                  <div
                    className={`mt-3 flex items-center gap-3 ${
                      align === "right" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className="h-px bg-[#C4A053] transition-all duration-500 group-hover:w-10"
                      style={{ width: 20 }}
                    />
                  </div>
                </div>
              </Link>
            ) : null
          )}
        </div>
      )}
    </main>
  );
};

export default ProjectDetailsPage;