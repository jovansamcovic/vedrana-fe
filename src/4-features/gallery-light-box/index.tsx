"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FadeSection } from "../face-section";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageItem = {
  id: number;
  url: string;
};

type SlotConfig = {
  cols: string;
  aspect: string;
};

const PATTERN: SlotConfig[] = [
  { cols: "lg:col-span-5", aspect: "aspect-[16/10]" },
  { cols: "lg:col-span-4", aspect: "aspect-[16/10]" },
  { cols: "lg:col-span-3", aspect: "aspect-[3/4]" },
  { cols: "lg:col-span-3", aspect: "aspect-[3/4]" },
  { cols: "lg:col-span-5", aspect: "aspect-[16/10]" },
  { cols: "lg:col-span-4", aspect: "aspect-[3/4]" },
  { cols: "lg:col-span-4", aspect: "aspect-[16/10]" },
  { cols: "lg:col-span-4", aspect: "aspect-[16/10]" },
  { cols: "lg:col-span-4", aspect: "aspect-[3/4]" },
];

export const GalleryGrid = ({ images }: { images: ImageItem[] }) => {
  const [index, setIndex] = useState<number | null>(null);

  const next = () => {
    setIndex((prev) =>
      prev === null ? prev : (prev + 1) % images.length
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev === null ? prev : (prev - 1 + images.length) % images.length
    );
  };

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (index === null) return;

      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index]);

  // lock scroll
  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);

  let startX = 0;

  const onTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();
  };

  return (
    <>
      {/* GRID */}
      <div className="px-4 md:px-8 pb-24 md:pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 items-end">
          {images.map((img, i) => {
            const slot = PATTERN[i % PATTERN.length];

            return (
              <FadeSection
                key={img.id}
                delay={i * 60}
                className={`col-span-1 ${slot.cols}`}
              >
                <div
                  className={`relative overflow-hidden ${slot.aspect} cursor-pointer`}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    src={img.url}
                    alt=""
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

      {/* LIGHTBOX */}
      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIndex(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* LEFT ARROW (desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-60 hidden md:block"
          >
            <ChevronLeft size={48} />
          </button>

          {/* IMAGE */}
          <div className="relative w-full h-full p-[8px]">
            <div className="relative w-full h-full">
              <Image
                src={images[index].url}
                alt=""
                fill
                className="object-contain rounded-sm"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* RIGHT ARROW (desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-60 hidden md:block"
          >
            <ChevronRight size={48} />
          </button>

          {/* CLOSE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex(null);
            }}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>

          {/* DOTS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index
                    ? "bg-white scale-150"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};