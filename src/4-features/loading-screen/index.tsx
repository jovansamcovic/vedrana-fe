"use client";
import { useEffect, useState, useRef } from "react";

const translations = {
  sr: {
    words: ["Prostor.", "Karakter.", "Identitet."],
    atelier: "Atelje",
  },
  en: {
    words: ["Space.", "Character.", "Identity."],
    atelier: "Atelier",
  },
};

type Locale = keyof typeof translations;

export const LoadingScreen = ({ locale = "sr" }: { locale?: Locale }) => {
  const t = translations[locale] ?? translations.sr;
  const wordsRef = useRef(t.words);

  const [pct, setPct] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordState, setWordState] = useState<"hidden" | "visible" | "exit">("hidden");
  const [showLogo, setShowLogo] = useState(false);
  const [out, setOut] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const words = wordsRef.current;

    setTimeout(() => setWordState("visible"), 200);

    let i = 0;
    const wordCycle = setInterval(() => {
      i++;
      if (i >= words.length) {
        clearInterval(wordCycle);
        setTimeout(() => setWordState("exit"), 200);
        setTimeout(() => {
          setWordState("hidden");
          setShowLogo(true);
        }, 700);
        return;
      }
      setWordState("exit");
      setTimeout(() => {
        setWordIndex(i);
        setWordState("hidden");
        requestAnimationFrame(() => requestAnimationFrame(() => setWordState("visible")));
      }, 400);
    }, 1400);

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 3 + 0.5;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
      }
      setPct(Math.floor(current));
    }, 60);

    const totalDuration = 200 + words.length * 1400 + 800 + 1200;
    setTimeout(() => setOut(true), totalDuration);
    setTimeout(() => setDone(true), totalDuration + 1200);

    return () => {
      clearInterval(wordCycle);
      clearInterval(intervalRef.current!);
    };
  }, []);

  if (done) return null;

  const wordTransform: Record<string, string> = {
    visible: "translate-y-0 opacity-100",
    exit: "-translate-y-full opacity-0",
    hidden: "translate-y-full opacity-0",
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1814] transition-opacity duration-[1200ms] ease-in-out ${
        out ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* Veliki broj u pozadini */}
      <span
        className="absolute font-cormorant font-light leading-none select-none tracking-[-0.02em] text-[#F5F3EF] opacity-[0.06]"
        style={{ fontSize: "clamp(80px, 18vw, 160px)" }}
      >
        {pct}
      </span>

      {/* Reči ili logo */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Reči */}
        <div className="overflow-hidden" style={{ height: "clamp(44px, 8vw, 72px)" }}>
          <span
            className={`font-cormorant font-light text-[#F5F3EF] tracking-[0.18em] uppercase transition-[transform,opacity] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showLogo ? "hidden" : "block"
            } ${wordTransform[wordState]}`}
            style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
          >
            {wordsRef.current[wordIndex]}
          </span>
        </div>

        {/* Logo */}
        <div
          className={`flex flex-col items-center transition-[opacity,transform] duration-[1000ms] ease-in-out ${
            showLogo
              ? "opacity-100 translate-y-0 relative"
              : "opacity-0 translate-y-[10px] absolute"
          }`}
        >
          <span className="font-cormorant font-light text-[10px] tracking-[0.6em] text-[#C4A053] uppercase mb-[6px]">
            {t.atelier}
          </span>
          <div
            className={`h-px bg-[#C4A053] mb-[6px] transition-[width] duration-[800ms] delay-300 ease-in-out ${
              showLogo ? "w-[60px]" : "w-0"
            }`}
          />
          <span
            className="font-cormorant italic font-light text-[#F5F3EF] tracking-[0.1em]"
            style={{ fontSize: "clamp(18px, 3vw, 26px)" }}
          >
            Vedrana Marković
          </span>
        </div>

      </div>

      {/* Progress bar + procenat */}
      <div className="absolute bottom-12 flex flex-col items-center gap-[10px]">
        <span className="font-cormorant text-[11px] tracking-[0.2em] text-[#C4A053]">
          {pct}%
        </span>
        <div className="w-[120px] h-px bg-white/[0.06]">
          <div
            className="h-full bg-[#C4A053] transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};