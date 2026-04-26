"use client";
import { useEffect, useRef, useState } from "react";

const GIF_DURATION = 2000;
const WORD_DURATION = 500;
const WORD_FADE = 300;
const FADE_DURATION = 700;

const DESKTOP_GIF = "/gifs/DeskGif.gif";
const MOBILE_GIF = "/gifs/MobileGif.gif";

const WORDS_SR = ["Prostor.", "Karakter.", "Identitet.", "Vaše."];
const WORDS_EN = ["Space.", "Character.", "Identity.", "Yours."];

interface LoadingScreenProps {
  locale?: "sr" | "en";
}

export const LoadingScreen = ({ locale = "sr" }: LoadingScreenProps) => {
  const atelier = locale === "en" ? "Atelier" : "Atelje";
  const words = locale === "en" ? WORDS_EN : WORDS_SR;

  const [phase, setPhase] = useState<"gif" | "words" | "logo">("gif");
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [gifVisible, setGifVisible] = useState(true);
  const [frozen, setFrozen] = useState(false);
  const [out, setOut] = useState(false);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const freezeGif = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (img && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = img.naturalWidth || 1920;
        canvas.height = img.naturalHeight || 1080;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
    setFrozen(true);
  };

  useEffect(() => {
    const t1 = setTimeout(() => {
      freezeGif();
      setGifVisible(false);
      setPhase("words");

      // Prva reč se pojavljuje
      setTimeout(() => {
        setWordVisible(true);

        // Tek nakon što je prva reč vidljiva, počinje ciklus
        setTimeout(cycleWords, WORD_FADE + WORD_DURATION);
      }, 400);

      let i = 0;
      const totalWords = words.length;

      function cycleWords() {
        setWordVisible(false);

        setTimeout(() => {
          i++;
          if (i >= totalWords) {
            setPhase("logo");
            setLogoVisible(true);

            setTimeout(() => {
              setOut(true);
              setTimeout(() => setDone(true), FADE_DURATION);
            }, 1800);
            return;
          }
          setWordIndex(i);
          setWordVisible(true);
          setTimeout(cycleWords, WORD_FADE + WORD_DURATION);
        }, WORD_FADE);
      }
    }, GIF_DURATION);

    return () => clearTimeout(t1);
  }, []);
  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "#0a0a0a",
        opacity: out ? 0 : 1,
        pointerEvents: out ? "none" : "auto",
        transition: `opacity ${FADE_DURATION}ms ease`,
      }}
    >
      {/* GIF */}
      <img
        ref={imgRef}
        src={isMobile ? MOBILE_GIF : DESKTOP_GIF}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: gifVisible && !frozen ? 1 : 0,
          transition: "opacity 600ms ease",
          pointerEvents: "none",
        }}
      />

      {/* Canvas — zamrznuti frejm (nije vidljiv, samo drži ref) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, pointerEvents: "none" }}
      />

      {/* Overlay na gifu */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "rgba(0,0,0,0.30)",
          opacity: gifVisible ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      />

      {/* Reči — crna pozadina */}
      {phase === "words" && (
        <span
          className="relative z-10 font-cormorant font-light uppercase"
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            letterSpacing: "0.22em",
            color: "#F5F3EF",
            opacity: wordVisible ? 1 : 0,
            transition: `opacity ${WORD_FADE}ms ease`,
          }}
        >
          {words[wordIndex]}
        </span>
      )}

      {/* Logo */}
      {phase === "logo" && (
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 900ms ease, transform 900ms ease",
          }}
        >
          <span
            className="font-cormorant font-light uppercase mb-2"
            style={{
              fontSize: "10px",
              letterSpacing: "0.55em",
              color: "#C4A053",
            }}
          >
            {atelier}
          </span>
          <div
            style={{
              height: "1px",
              background: "#C4A053",
              marginBottom: "8px",
              width: logoVisible ? "48px" : "0px",
              transition: "width 700ms ease 200ms",
            }}
          />
          <span
            className="font-cormorant italic font-light"
            style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              letterSpacing: "0.08em",
              color: "#F5F3EF",
            }}
          >
            Vedrana Marković
          </span>
        </div>
      )}
    </div>
  );
};
