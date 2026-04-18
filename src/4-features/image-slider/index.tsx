"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function GallerySlider({
  images,
  title,
  orientation = "landscape",
}: {
  images: any[];
  title: string;
  orientation?: "landscape" | "portrait";
}) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // 🔒 Lock scroll kad je lightbox otvoren
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);

  const next = () => setCurrent((c) => (c + 1) % images.length);

  // 👉 swipe start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // 👉 swipe end
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }

    touchStartX.current = null;
  };

  const aspectClass =
    orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]";

  if (!images.length) return null;

  return (
    <>
      {/* Slider */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-sm bg-stone-100`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
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

        {/* Strelice (desktop only) */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-60 transition-opacity hidden md:block"
        >
          <ChevronLeft size={40} />
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-60 transition-opacity hidden md:block"
        >
          <ChevronRight size={40} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 right-6 z-10 text-white text-sm tracking-widest">
          {current + 1} / {images.length}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${
                i === current
                  ? "w-2.5 h-2.5 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrent(index)}
            className={`relative shrink-0 overflow-hidden rounded-sm transition-opacity ${
              orientation === "portrait" ? "w-12 h-16" : "w-16 h-16"
            } ${
              index === current
                ? "opacity-100 ring-1 ring-[#C4A053]"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={image.url}
              alt={title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setLightbox(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white hover:opacity-60"
            onClick={() => setLightbox(false)}
          >
            <X size={32} />
          </button>

          {/* Prev (desktop) */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-60 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={48} />
          </button>

          {/* Image */}
          <div
            className={`relative ${
              orientation === "portrait"
                ? "aspect-[4/3] h-[80vh] max-w-[80vw]"
                : "max-h-[80vh] w-[90vw] aspect-[3/4]"
            }`}
          >
            <Image
              src={images[current].url}
              alt={title}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next (desktop) */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-60 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={48} />
          </button>

          {/* Lightbox dots (mobile) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                  i === current
                    ? "bg-white opacity-100"
                    : "bg-white opacity-30"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}