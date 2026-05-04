"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

const GIF_DURATION  = 1400;
const WORD_DURATION = 380;
const WORD_FADE     = 220;
const LOGO_HOLD     = 800;
const FADE_DURATION = 400;

const DESKTOP_GIF = "/gifs/DeskGif.gif";
const MOBILE_GIF  = "/gifs/MobileGif.gif";

export const LoadingScreen = () => {
  const t       = useTranslations("LoadingScreen");
  const atelier = t("atelier");
  const words   = t.raw("words") as string[];

  const [phase, setPhase]             = useState<"gif" | "words" | "logo">("gif");
  const [wordIndex, setWordIndex]     = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [gifVisible, setGifVisible]   = useState(true);
  const [frozen, setFrozen]           = useState(false);
  const [out, setOut]                 = useState(false);
  const [done, setDone]               = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [progress, setProgress]       = useState(0);

  const imgRef      = useRef<HTMLImageElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const timersRef   = useRef<NodeJS.Timeout[]>([]);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const addTimer = (cb: NodeJS.Timeout) => { timersRef.current.push(cb); return cb; };
  const clearAllTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setMounted(true);
  }, []);

  const exit = () => {
    clearAllTimers();
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
    setOut(true);
    setTimeout(() => setDone(true), FADE_DURATION);
  };

  const freezeGif = () => {
    const img    = imgRef.current;
    const canvas = canvasRef.current;
    if (img && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width  = img.naturalWidth  || 1920;
        canvas.height = img.naturalHeight || 1080;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
    setFrozen(true);
  };

  useEffect(() => {
    const totalDuration =
      GIF_DURATION +
      words.length * (WORD_FADE + WORD_DURATION) +
      LOGO_HOLD;

    const interval = 30;
    const step = (interval / totalDuration) * 100;

    progressRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + step;
        if (next >= 100) {
          if (progressRef.current) clearInterval(progressRef.current);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, []);

  useEffect(() => {
    addTimer(setTimeout(() => {
      freezeGif();
      setGifVisible(false);
      setPhase("words");

      let i = 0;
      const totalWords = words.length;

      function cycleWords() {
        setWordVisible(false);
        addTimer(setTimeout(() => {
          i++;
          if (i >= totalWords) {
            setPhase("logo");
            setLogoVisible(true);
            addTimer(setTimeout(() => {
              setOut(true);
              addTimer(setTimeout(() => setDone(true), FADE_DURATION));
            }, LOGO_HOLD));
            return;
          }
          setWordIndex(i);
          addTimer(setTimeout(() => {
            setWordVisible(true);
            addTimer(setTimeout(cycleWords, WORD_DURATION));
          }, 32));
        }, WORD_FADE));
      }

      setWordVisible(true);
      addTimer(setTimeout(cycleWords, WORD_DURATION));

    }, GIF_DURATION));

    return () => clearAllTimers();
  }, []);

  if (!mounted || done) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-[400ms] ease-in-out ${out ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* GIF */}
      <img
        ref={imgRef}
        src={isMobile ? MOBILE_GIF : DESKTOP_GIF}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-in-out ${gifVisible && !frozen ? "opacity-100" : "opacity-0"}`}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 z-[2] bg-black/30 transition-opacity duration-500 ease-in-out ${gifVisible ? "opacity-100" : "opacity-0"}`}
      />

      {/* X */}
      <button
        onClick={exit}
        aria-label={t("close")}
        className="absolute top-7 right-8 z-20 bg-transparent border-none cursor-pointer text-[#F5F3EF] opacity-55 hover:opacity-100 transition-opacity duration-[250ms] p-1.5 leading-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-7 left-8 right-8 z-20 transition-opacity duration-500 ease-in-out ${phase === "logo" ? "opacity-0" : "opacity-85"}`}
      >
        <span
          className="block font-light tracking-[0.28em] uppercase text-[#F5F3EF] text-[11px] mb-2 opacity-60"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {t("loading")}
        </span>
        <div className="relative w-full h-px bg-[#F5F3EF]/15 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#C4A053] transition-[width] duration-[30ms] linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Reči */}
      {phase === "words" && (
        <span
          className={`relative z-10 font-light tracking-[0.22em] uppercase text-[#F5F3EF] text-[clamp(28px,5vw,52px)] transition-opacity duration-200 ease-in-out ${
            wordVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {words[wordIndex]}
        </span>
      )}

      {/* Logo */}
      {phase === "logo" && (
        <div
          className={`absolute z-10 flex flex-col items-center transition-[opacity,transform] duration-700 ease-in-out ${logoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5"}`}
        >
          <span
            className="font-light tracking-[0.55em] uppercase text-[#C4A053] text-[10px] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {atelier}
          </span>
          <div
            className={`h-px bg-[#C4A053] mb-2 transition-[width] duration-[600ms] ease-in-out delay-150 ${logoVisible ? "w-12" : "w-0"}`}
          />
          <span
            className="font-light italic tracking-[0.08em] text-[#F5F3EF] text-[clamp(20px,3vw,28px)]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Vedrana Marković
          </span>
        </div>
      )}
    </div>,
    document.body
  );
};