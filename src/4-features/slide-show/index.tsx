"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("CrossfadeSlideshow");

  const [current, setCurrent] = useState(0);
  // true  = vidljiv pri loadu
  // false = korisnik je počeo da slajduje → tekst odlazi levo, zauvek
  const [heroVisible, setHeroVisible] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const dismiss = () => setHeroVisible(false);

  const prev = () => {
    dismiss();
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };
  const next = () => {
    dismiss();
    setCurrent((c) => (c + 1) % slides.length);
  };

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
      // auto-advance ne sklanja tekst — korisnik nije interagovao
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
      {/* SLIDES */}
      {slides.map((img, index) => (
        <div
          key={img.desktopUrl + index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === current ? 1 : 0,
            pointerEvents: index === current ? "auto" : "none",
          }}
        >
          <Link href={`/projects/${img.slug}`} className="block w-full h-full">
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

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* HERO — sklanja se levo pri prvoj interakciji, zauvek */}
      <div
        className="absolute inset-0 z-10 flex items-start justify-center pt-[25vh] text-center px-6 md:px-12"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateX(0)" : "translateX(-60px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          pointerEvents: heroVisible ? "auto" : "none",
        }}
      >
        <div className="max-w-2xl flex flex-col items-center gap-5">
          {/* H1 */}
          <h1
            className="text-white text-2xl md:text-5xl font-light tracking-[0.04em] leading-snug"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Timeless interiors designed with intention
          </h1>

          {/* Subtext */}
          <p className="text-white/75 text-sm md:text-base max-w-md leading-relaxed">
            We create refined, functional spaces tailored to your lifestyle.
          </p>

          <div className="flex items-center gap-8 mt-6">
            {/* PRIMARY — zlatno */}
            <Link
              href="/contact"
              className="group relative text-[#C4A053] text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-70"
            >
              Start a project
              <span className="absolute left-0 -bottom-1 h-px w-6 bg-[#C4A053] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* SECONDARY — belo */}
            <Link
              href="/projects"
              className="group relative text-white/80 text-[11px] tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-70"
            >
              View projects
              <span className="absolute left-0 -bottom-1 h-px w-6 bg-white/60 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-8 md:pb-10">
        <div className="flex items-center justify-between">
          {/* Project */}
          <Link href={`/projects/${slides[current]?.slug}`}>
            <h2
              className="text-white/80 text-sm md:text-lg font-light tracking-[0.08em] uppercase hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {slides[current].title}
            </h2>
          </Link>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="text-white/50 hover:text-white transition-colors"
              aria-label={t("prevSlide")}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={next}
              className="text-white/50 hover:text-white transition-colors"
              aria-label={t("nextSlide")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};