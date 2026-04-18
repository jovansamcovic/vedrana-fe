"use client";


import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProjectBySlug } from "@/src/6-shared/api/project-details";

type Props = {
  slug: string;
  locale: string;
};

// Slider komponenta
export function GallerySlider({ images, title }: { images: any[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  if (!images.length) return null;

  return (
    <>
      {/* Slider */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-stone-100">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: index === current ? 1 : 0 }}
          >
            <Image
              src={image.url}
              alt={title}
              fill
              className="object-cover cursor-pointer"
              sizes="100vw"
              priority={index === 0}
              onClick={() => setLightbox(true)}
            />
          </div>
        ))}

        {/* Nav dugmad */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-60 transition-opacity"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-60 transition-opacity"
        >
          <ChevronRight size={40} />
        </button>

        {/* Brojač */}
        <div className="absolute bottom-4 right-6 z-10 text-white text-sm tracking-widest">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrent(index)}
            className={`relative shrink-0 w-16 h-16 overflow-hidden rounded-sm transition-opacity ${
              index === current ? "opacity-100 ring-1 ring-[#C4A053]" : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image src={image.url} alt={title} fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:opacity-60"
            onClick={() => setLightbox(false)}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-60"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={48} />
          </button>
          <div className="relative w-[90vw] h-[85vh]">
            <Image
              src={images[current].url}
              alt={title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-60"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}

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