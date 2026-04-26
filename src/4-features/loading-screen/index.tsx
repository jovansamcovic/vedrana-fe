"use client";
import { useEffect, useRef, useState } from "react";

const GIF_DURATION  = 1400;
const WORD_DURATION = 280;
const WORD_FADE     = 200;
const LOGO_HOLD     = 800;
const FADE_DURATION = 400;

const DESKTOP_GIF = "/gifs/DeskGif.gif";
const MOBILE_GIF  = "/gifs/MobileGif.gif";

const WORDS_SR = ["Prostor.", "Karakter.", "Identitet.", "Vaše."];
const WORDS_EN = ["Space.", "Character.", "Identity.", "Yours."];

interface LoadingScreenProps {
  locale?: "sr" | "en";
}

export const LoadingScreen = ({ locale = "sr" }: LoadingScreenProps) => {
  const atelier = locale === "en" ? "Atelier" : "Atelje";
  const words   = locale === "en" ? WORDS_EN : WORDS_SR;

  const [phase, setPhase]             = useState<"gif" | "words" | "logo">("gif");
  const [wordIndex, setWordIndex]     = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [gifVisible, setGifVisible]   = useState(true);
  const [frozen, setFrozen]           = useState(false);
  const [out, setOut]                 = useState(false);
  const [done, setDone]               = useState(false);
  const [isMobile, setIsMobile]       = useState(false);

  const imgRef    = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const addTimer = (t: NodeJS.Timeout) => { timersRef.current.push(t); return t; };
  const clearAllTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  const exit = () => {
    clearAllTimers();
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
          setWordVisible(true);
          addTimer(setTimeout(cycleWords, WORD_FADE + WORD_DURATION));
        }, WORD_FADE));
      }

      addTimer(setTimeout(() => {
        setWordVisible(true);
        addTimer(setTimeout(cycleWords, WORD_FADE + WORD_DURATION));
      }, 200));

    }, GIF_DURATION));

    return () => clearAllTimers();
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
          transition: "opacity 500ms ease",
          pointerEvents: "none",
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, pointerEvents: "none" }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "rgba(0,0,0,0.30)",
          opacity: gifVisible ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      />

      {/* X */}
      <button
        onClick={exit}
        aria-label="Zatvori"
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
        style={{
          position: "absolute",
          top: "28px",
          right: "32px",
          zIndex: 20,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#F5F3EF",
          opacity: 0.55,
          padding: "6px",
          transition: "opacity 0.25s ease",
          lineHeight: 1,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Loading — dole levo */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "32px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: phase === "logo" ? 0 : 0.6,
          transition: "opacity 500ms ease",
        }}
      >
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#F5F3EF",
                animation: `ldpulse 1.1s ease-in-out ${i * 0.18}s infinite`,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.28em",
            color: "#F5F3EF",
            textTransform: "uppercase",
          }}
        >
          Loading
        </span>
      </div>

      <style>{`
        @keyframes ldpulse {
          0%, 100% { opacity: 0.25; transform: scale(0.75); }
          50%       { opacity: 1;   transform: scale(1);    }
        }
      `}</style>

      {/* Reči */}
      {phase === "words" && (
        <span
          style={{
            position: "relative",
            zIndex: 10,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 300,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
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
          style={{
            position: "absolute",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.55em",
              color: "#C4A053",
              textTransform: "uppercase",
              marginBottom: "8px",
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
              transition: "width 600ms ease 150ms",
            }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 300,
              fontStyle: "italic",
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