import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "../6-shared/api/project-details";
import { FadeSection } from "../4-features/face-section";
import { GalleryGrid } from "../4-features/gallery-light-box";

type Props = {
  slug: string;
  locale: string;
};

type ImageItem = {
  id: number;
  url: string;
  orientation: "landscape" | "portrait";
};

const ProjectDetailsPage = async ({ slug, locale }: Props) => {
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();

  const isSr = locale === "sr";

  const heroDesktop = project.coverImageDesktop;
  const heroMobile = project.coverImageMobile;

  const landscapeImages: ImageItem[] = (project.galleryDesktop ?? []).map(
    (img: any) => ({
      id: img.id,
      url: img.url,
      orientation: "landscape",
    })
  );

  const portraitImages: ImageItem[] = (project.galleryMobile ?? []).map(
    (img: any) => ({
      id: img.id,
      url: img.url,
      orientation: "portrait",
    })
  );

  const mixed: ImageItem[] = [];
  let li = 0;
  let pi = 0;

  while (li < landscapeImages.length || pi < portraitImages.length) {
    if (li < landscapeImages.length) mixed.push(landscapeImages[li++]);
    if (li < landscapeImages.length) mixed.push(landscapeImages[li++]);
    if (pi < portraitImages.length) mixed.push(portraitImages[pi++]);
  }

  return (
    <main className="bg-[#F5F3EF] text-[#2C2C2A]">

      {/* HERO */}
      {(heroDesktop || heroMobile) && (
        <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-stone-100">

          {heroMobile?.url && (
            <Image
              src={heroMobile.url}
              alt={project.title ?? ""}
              fill
              priority
              className="object-cover md:hidden"
              sizes="100vw"
            />
          )}

          {heroDesktop?.url && (
            <Image
              src={heroDesktop.url}
              alt={project.title ?? ""}
              fill
              priority
              className="object-cover hidden md:block"
              sizes="100vw"
            />
          )}

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-12 md:pb-20 z-10">

            <div className="max-w-[900px]">
              <div className="mb-6 w-10 h-px bg-[#C4A053]" />

              <h1
                className="text-white uppercase font-light tracking-[0.2em]
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {project.title}
              </h1>

              <p
                className="mt-4 text-white/60 text-[11px] tracking-[0.45em] uppercase"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {isSr ? "Projekat" : "Project"}
              </p>
            </div>

          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      <div className="max-w-[780px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <FadeSection delay={0}>
          {Array.isArray(project.description) &&
            project.description.map((block: any, i: number) =>
              block.children?.map((child: any, j: number) =>
                child.text ? (
                  <p
                    key={`${i}-${j}`}
                    className="text-lg leading-[2.1] mb-7 text-stone-500"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {child.text}
                  </p>
                ) : null
              )
            )}
        </FadeSection>
      </div>

      {/* GALLERY */}
      {mixed.length > 0 && <GalleryGrid images={mixed} />}

     {/* ── 4. PREV / NEXT CTA ─────────────────────────────────────────── */}
      {(project.prevProject?.slug || project.nextProject?.slug) && (
        <div className="flex flex-col lg:flex-row w-full gap-px bg-[#F5F3EF]">
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