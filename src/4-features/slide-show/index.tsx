"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const CrossfadeSlideshow = ({
  slides = [],
}: {
  slides: {
    desktopUrl: string;
    mobileUrl: string;
    alt: string;
    title: string;
    slug: string;
  }[];
}) => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-[100svh] md:h-[100dvh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slike */}
      {slides.map((img, index) => (
        <div
          key={img.desktopUrl + index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === current ? 1 : 0,
            pointerEvents: index === current ? "auto" : "none",
          }}
        >
          <Link href={`projects/${img?.slug}`} className="block w-full h-full">
            <Image
              src={img.mobileUrl}
              alt={img.alt}
              fill
              className="object-cover block md:hidden"
              priority={index === 0}
            />
            <Image
              src={img.desktopUrl}
              alt={img.alt}
              fill
              className="object-cover hidden md:block"
              priority={index === 0}
            />
          </Link>
        </div>
      ))}

      {/* Gradient odozdo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Donji UI */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-10 md:pb-14">
        <div className="flex items-end justify-between">

          {/* Levo — naziv projekta */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#C4A053]" />
              <span
                className="text-[#C4A053] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Project
              </span>
            </div>
            <Link href={`projects/${slides[current]?.slug}`}>
              <h2
                className="text-white text-xl md:text-4xl font-light tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {slides[current].title}
              </h2>
            </Link>
            {/* Dots */}
            <div className="flex items-center gap-2 mt-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  aria-label={`Idi na slajd ${i + 1}`}
                >
                  <div
                    className={`h-px transition-all duration-300 ${
                      i === current ? "w-8 bg-[#C4A053]" : "w-3 bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Desno — navigacija */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Prethodna"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="w-px h-4 bg-white/30" />
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Sledeća"
            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};