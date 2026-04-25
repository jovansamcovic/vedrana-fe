"use client";
import { useEffect, useState, useRef } from "react";

const translations = {
  sr: {
    words: ["Prostor.", "Karakter.", "Identitet.", "Vaše."],
    atelier: "Atelje",
  },
  en: {
    words: ["Space.", "Character.", "Identity.", "Yours."],
    atelier: "Atelier",
  },
};

type Locale = keyof typeof translations;

const WORD_INTERVAL = 900;
const FADE_DURATION = 900;

// Svaka reč ima svoju sliku — isti index, isti trenutak promene
const DEFAULT_IMAGES = [
  "https://res.cloudinary.com/dyfbsb7to/image/upload/v1777085928/cover_fae619e5ef.jpg",
  "https://res.cloudinary.com/dyfbsb7to/image/upload/v1777086927/7_b47de9fb02.webp",
  "https://res.cloudinary.com/dyfbsb7to/image/upload/v1777086412/porodicni_dom_sl_taajpl2ebbf8217649_4adc2dc0de.webp",
  "https://res.cloudinary.com/dyfbsb7to/image/upload/v1777087250/porodicni_dom_mn_t6aetm8ac2e9f9c4f4_a5f8f296ea.webp",
];

interface LoadingScreenProps {
  locale?: Locale;
  images?: string[];
}

export const LoadingScreen = ({
  locale = "sr",
  images = DEFAULT_IMAGES,
}: LoadingScreenProps) => {
  const t = translations[locale] ?? translations.sr;
  const wordsRef = useRef(t.words);

  const [done, setDone]               = useState(false);
  const [pct, setPct]                 = useState(0);
  const [index, setIndex]             = useState(0); // jedan index za i reč i sliku
  const [wordVisible, setWordVisible] = useState(false);
  const [showLogo, setShowLogo]       = useState(false);
  const [out, setOut]                 = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const exit = () => {
    setOut(true);
    setTimeout(() => setDone(true), FADE_DURATION);
  };

  useEffect(() => {
    const words = wordsRef.current;

    setTimeout(() => setWordVisible(true), 300);

    let i = 0;
    const cycle = setInterval(() => {
      i++;
      if (i >= words.length) {
        clearInterval(cycle);
        // Izlaz poslednje reči → logo
        setWordVisible(false);
        setTimeout(() => setShowLogo(true), 400);
        return;
      }
      // Reč i slika se menjaju zajedno, u istom trenutku
      setWordVisible(false);
      setTimeout(() => {
        setIndex(i);
        setWordVisible(true);
      }, 350);
    }, WORD_INTERVAL);

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 3 + 0.5;
      if (current >= 100) { current = 100; clearInterval(intervalRef.current!); }
      setPct(Math.floor(current));
    }, 50);

    const totalDuration = 300 + words.length * WORD_INTERVAL + 400 + 1200;
    setTimeout(() => setOut(true), totalDuration);
    setTimeout(() => setDone(true), totalDuration + FADE_DURATION);

    return () => {
      clearInterval(cycle);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity ease-in-out ${
        out ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
    >
      {/* Slike — menjaju se zajedno sa rečima, isti index */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 1 : 0,
            transition: "opacity 500ms ease-in-out",
          }}
        />
      ))}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,14,0.72) 0%, rgba(20,18,14,0.52) 40%, rgba(20,18,14,0.58) 60%, rgba(20,18,14,0.82) 100%)",
        }}
      />

      {/* X */}
      <button
        onClick={exit}
        aria-label="Zatvori"
        className="absolute top-8 right-8 z-20 text-[#F5F3EF] opacity-30 hover:opacity-80 transition-opacity duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Tekst */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="relative flex items-center justify-center"
          style={{ height: "clamp(44px, 8vw, 68px)", minWidth: "200px" }}
        >
          <span
            className="font-cormorant font-light uppercase tracking-[0.22em] transition-opacity duration-500 ease-in-out"
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              color: "#F5F3EF",
              opacity: wordVisible && !showLogo ? 1 : 0,
            }}
          >
            {wordsRef.current[index]}
          </span>
        </div>

        {/* Logo */}
        <div
          className="flex flex-col items-center transition-[opacity,transform] duration-[900ms] ease-in-out"
          style={{
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <span
            className="font-cormorant font-light uppercase mb-[8px]"
            style={{ fontSize: "10px", letterSpacing: "0.55em", color: "#C4A053" }}
          >
            {t.atelier}
          </span>
          <div
            className="mb-[8px] transition-[width] duration-[700ms] delay-200 ease-in-out"
            style={{ height: "1px", background: "#C4A053", width: showLogo ? "48px" : "0px" }}
          />
          <span
            className="font-cormorant italic font-light tracking-[0.08em]"
            style={{ fontSize: "clamp(18px, 3vw, 26px)", color: "#F5F3EF" }}
          >
            Vedrana Marković
          </span>
        </div>
      </div>

      {/* Progress */}
      <div
        className="absolute bottom-0 left-0 h-px z-10 transition-[width] duration-150 ease-linear"
        style={{ width: `${pct}%`, background: "rgba(196,160,83,0.5)" }}
      />
    </div>
  );
};