"use client";

import Link from "next/link";

const cormorant = { fontFamily: "var(--font-cormorant)" };

type Phase = {
  num: string;
  tag: string;
  title: string;
  description: string;
  items: string[];
  deliverable: string;
};

type ServicesFlowProps = {
  phases: Phase[];
  pageTitle: string;
  pageIntro: string;
  eyebrow: string;
  closing: string;
  closingCta: string;
  contactHref: string;
};

export function ServicesFlow({
  phases,
  pageTitle,
  pageIntro,
  eyebrow,
  closing,
  closingCta,
  contactHref,
}: ServicesFlowProps) {
  return (
    <div className="bg-[#F5F3EF] min-h-screen">

      {/* ── GLOBAL ACCORDION ANIMATIONS ── */}
      <style>{`
        @keyframes arrowNudge {
          0%,  60%, 100% { transform: translateY(0);   opacity: 0.5; }
          30%             { transform: translateY(7px); opacity: 1;   }
          45%             { transform: translateY(3px); opacity: 0.7; }
        }

        /* When open — freeze arrow rotated */
        details[open] .accordion-arrow {
          transform: rotate(180deg) !important;
          animation: none !important;
          opacity: 1 !important;
        }
        /* On hover — pause nudge, go full opacity */
        details:not([open]) summary:hover .accordion-arrow {
          animation-play-state: paused;
          opacity: 1;
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="text-center px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <span
          className="text-[10px] tracking-[0.4em] uppercase text-[#C4A053] block mb-8"
          style={cormorant}
        >
          {eyebrow}
        </span>

        <h1
          className="font-light text-[#3a3530] mb-10"
          style={{
            ...cormorant,
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          }}
        >
          {pageTitle}
        </h1>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-px bg-[#C4A053] opacity-40" />
          <div className="w-1.5 h-1.5 bg-[#C4A053] rotate-45" />
          <div className="w-16 h-px bg-[#C4A053] opacity-40" />
        </div>

        <p
          className="italic text-[#a09080] max-w-md mx-auto leading-[2]"
          style={{
            ...cormorant,
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
          }}
        >
          {pageIntro}
        </p>
      </div>

      {/* ── PHASES ── */}
      <div className="max-w-[780px] mx-auto px-6 md:px-12">
        {phases.map((phase, index) => (
          <div key={phase.num}>
            {/* Phase block */}
            <div className="relative py-16 md:py-24">
              {/* Ghost number */}
              <span
                className="absolute right-0 top-8 select-none pointer-events-none leading-none text-[#C4A053]"
                style={{
                  ...cormorant,
                  fontSize: "clamp(6rem, 14vw, 10rem)",
                  opacity: 0.06,
                  lineHeight: 1,
                }}
              >
                {phase.num}
              </span>

              {/* Tag */}
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-[#C4A053] mb-5"
                style={cormorant}
              >
                {phase.tag}
              </p>

              {/* Title */}
              <h2
                className="font-light text-[#3a3530] mb-8"
                style={{
                  ...cormorant,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                }}
              >
                {phase.title}
              </h2>

              {/* Description */}
              <p
                className="italic text-[#8a7e72] leading-[2] mb-10 max-w-[560px]"
                style={{
                  ...cormorant,
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                }}
              >
                {phase.description}
              </p>

              {/* ── ACCORDION ── */}
              <details className="group mb-8">
                <summary className="cursor-pointer list-none flex flex-col items-center gap-0 w-fit mx-auto mb-6">

                  {/* Label */}
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] group-hover:text-[#C4A053] transition-colors duration-300 mb-3"
                    style={cormorant}
                  >
                    {phase.deliverable}
                  </span>

                  {/* Arrow row */}
                  <span className="flex items-center gap-3 text-[#C4A053] group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-8 h-px bg-current opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="accordion-arrow"
                      style={{
                        opacity: 0.5,
                        transition: "transform 0.5s ease, opacity 0.3s ease",
                        animation: "arrowNudge 2.6s ease-in-out 1.2s infinite",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>

                    <span className="w-8 h-px bg-current opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>

                </summary>

                {/* Items list */}
                <ul className="mt-2 space-y-2 pl-7 border-l border-[#C4A053] border-opacity-20">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-stone-400 leading-[1.8]"
                      style={{
                        ...cormorant,
                        fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Divider between phases */}
            {index < phases.length - 1 && (
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#C4A053] opacity-15" />
                <div className="w-1 h-1 bg-[#C4A053] rotate-45 opacity-40" />
                <div className="flex-1 h-px bg-[#C4A053] opacity-15" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── CLOSING CTA ── */}
      <div className="text-center px-6 py-24 md:py-32">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-px bg-[#C4A053] opacity-40" />
          <div className="w-1.5 h-1.5 bg-[#C4A053] rotate-45" />
          <div className="w-16 h-px bg-[#C4A053] opacity-40" />
        </div>

        <p
          className="italic text-[#8a7e72] max-w-sm mx-auto leading-[2] mb-8"
          style={{
            ...cormorant,
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
          }}
        >
          {closing}
        </p>

        <Link
          href={contactHref}
          className="group inline-flex items-center gap-3 text-stone-400 hover:text-[#C4A053] transition-colors duration-300"
          style={{
            ...cormorant,
            fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
            letterSpacing: "0.03em",
          }}
        >
          <span className="italic">{closingCta}</span>
          <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
        </Link>
      </div>
    </div>
  );
}

export default ServicesFlow;