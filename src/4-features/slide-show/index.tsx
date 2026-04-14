"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CrossfadeSlideshow = ({ slides = [] }: { slides: any[] }) => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-end">
      {slides.map((img: any, index: number) => (
        <div
          key={img.src + index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between px-8 py-3">
          <button
            onClick={prev}
            className="text-white hover:opacity-60 transition-opacity"
            aria-label="Prethodna slika"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={next}
            className="text-white hover:opacity-60 transition-opacity"
            aria-label="Sledeća slika"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        <div className="border-t border-white mx-8" />

        <div className="px-8 py-4">
          <span
            className="text-white text-sm tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {slides[current].title}
          </span>
        </div>
      </div>
    </div>
  );
};
