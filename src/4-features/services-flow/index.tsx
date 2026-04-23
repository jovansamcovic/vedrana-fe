"use client";

const cormorant = { fontFamily: "var(--font-cormorant)" };

type Phase = {
  num: string;
  tag: string;
  title: string;
  items: string[];
  deliverable: string;
  icon: React.ReactNode;
};

type ServicesFlowProps = {
  phases: Phase[];
  pageTitle: string;
  pageSubtitle: string;
  eyebrow: string;
};

export const Icon1 = () => (
  <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
    <rect x="2" y="9" width="22" height="8" rx="1.5" stroke="#C4A053" strokeWidth="1.2" />
    <line x1="6" y1="9" x2="6" y2="14" stroke="#C4A053" strokeWidth="1" />
    <line x1="10" y1="9" x2="10" y2="12" stroke="#C4A053" strokeWidth="1" />
    <line x1="14" y1="9" x2="14" y2="14" stroke="#C4A053" strokeWidth="1" />
    <line x1="18" y1="9" x2="18" y2="12" stroke="#C4A053" strokeWidth="1" />
    <line x1="17" y1="5" x2="22" y2="10" stroke="#C4A053" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M15 7 L19 3 L23 7 L19 11Z" stroke="#C4A053" strokeWidth="1" fill="none" />
    <path d="M15 7 L13 9 L15 11 L17 9Z" fill="#C4A053" opacity="0.4" />
  </svg>
);

export const Icon2 = () => (
  <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
    <rect x="3" y="4" width="16" height="18" rx="1.5" stroke="#C4A053" strokeWidth="1.2" />
    <rect x="6" y="7" width="4" height="4" rx="0.5" fill="#C4A053" opacity="0.5" />
    <rect x="12" y="7" width="4" height="4" rx="0.5" stroke="#C4A053" strokeWidth="0.8" />
    <rect x="6" y="13" width="4" height="4" rx="0.5" stroke="#C4A053" strokeWidth="0.8" />
    <rect x="12" y="13" width="4" height="4" rx="0.5" fill="#C4A053" opacity="0.25" />
    <line x1="21" y1="5" x2="21" y2="9" stroke="#C4A053" strokeWidth="1" strokeLinecap="round" />
    <line x1="19" y1="7" x2="23" y2="7" stroke="#C4A053" strokeWidth="1" strokeLinecap="round" />
    <line x1="19.5" y1="5.5" x2="22.5" y2="8.5" stroke="#C4A053" strokeWidth="0.8" strokeLinecap="round" />
    <line x1="22.5" y1="5.5" x2="19.5" y2="8.5" stroke="#C4A053" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

export const Icon3 = () => (
  <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
    <rect x="3" y="2" width="16" height="20" rx="1.5" stroke="#C4A053" strokeWidth="1.2" />
    <polyline points="7,8 7,18 17,18" stroke="#C4A053" strokeWidth="1" strokeLinecap="round" />
    <line x1="7" y1="13" x2="13" y2="13" stroke="#C4A053" strokeWidth="1" strokeLinecap="round" />
    <line x1="13" y1="8" x2="13" y2="13" stroke="#C4A053" strokeWidth="1" strokeLinecap="round" />
    <path d="M13 8 Q16 8 16 11" stroke="#C4A053" strokeWidth="0.8" strokeDasharray="2,1.5" />
    <line x1="21" y1="6" x2="21" y2="20" stroke="#C4A053" strokeWidth="0.8" />
    <line x1="20" y1="6" x2="22" y2="6" stroke="#C4A053" strokeWidth="0.8" />
    <line x1="20" y1="20" x2="22" y2="20" stroke="#C4A053" strokeWidth="0.8" />
  </svg>
);

export const Icon4 = () => (
  <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
    <path d="M5 16 Q5 10 13 9 Q21 10 21 16Z" stroke="#C4A053" strokeWidth="1.2" fill="none" />
    <line x1="3" y1="16" x2="23" y2="16" stroke="#C4A053" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="6" y1="18" x2="20" y2="18" stroke="#C4A053" strokeWidth="1" strokeLinecap="round" />
    <path d="M3 16 Q4 19 6 19" stroke="#C4A053" strokeWidth="0.8" fill="none" />
    <path d="M23 16 Q22 19 20 19" stroke="#C4A053" strokeWidth="0.8" fill="none" />
    <polyline
      points="10,12 12,14 16,10"
      stroke="#C4A053"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ServicesFlow({ phases, pageTitle, pageSubtitle, eyebrow }: ServicesFlowProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16 lg:py-24">

      {/* ── PAGE HEADER ── */}
      <div className="text-center mb-20 md:mb-28">
        <span
          className="text-[10px] tracking-[0.4em] uppercase text-[#C4A053] block mb-5"
          style={cormorant}
        >
          {eyebrow}
        </span>

        <h1
          className="font-light text-[#3a3530] mb-7"
          style={{
            ...cormorant,
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
          }}
        >
          {pageTitle}
        </h1>

        {/* ornament */}
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="w-14 h-px bg-[#C4A053] opacity-50" />
          <div className="w-1.5 h-1.5 bg-[#C4A053] rotate-45" />
          <div className="w-14 h-px bg-[#C4A053] opacity-50" />
        </div>

        <p
          className="italic text-[#a09080] max-w-sm mx-auto leading-[1.9]"
          style={{
            ...cormorant,
            fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
          }}
        >
          {pageSubtitle}
        </p>
      </div>

      {/* ── PHASES ── */}
      <div className="max-w-[620px] mx-auto">
        {phases.map((phase, index) => (
          <div
            key={phase.num}
            className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-x-6 md:gap-x-8"
          >
            {/* Left — icon + line */}
            <div className="flex flex-col items-center">
              <div className="w-[56px] h-[56px] md:w-[72px] md:h-[72px] border border-[#C4A053] flex items-center justify-center bg-[#F5F3EF] flex-shrink-0 relative z-10">
                {phase.icon}
              </div>
              {index < phases.length - 1 && (
                <div
                  className="w-px flex-1 min-h-[28px]"
                  style={{
                    background:
                      "linear-gradient(to bottom, #C4A053 0%, #d6cfc4 60%, transparent 100%)",
                    opacity: 0.6,
                  }}
                />
              )}
            </div>

            {/* Right — content */}
            <div className={index < phases.length - 1 ? "pb-16 md:pb-20" : "pb-0"}>

              {/* tag + ghost number on same row */}
              <div className="flex items-start justify-between mt-4 mb-2">
                <p
                  className="text-[10px] tracking-[0.4em] uppercase text-[#C4A053]"
                  style={cormorant}
                >
                  {phase.tag}
                </p>
                <span
                  className="font-light text-[#C4A053] leading-none select-none"
                  style={{
                    ...cormorant,
                    fontSize: "clamp(3rem, 6vw, 4rem)",
                    opacity: 0.07,
                    marginTop: "-0.15em",
                  }}
                >
                  {phase.num}
                </span>
              </div>

              <h2
                className="font-light text-[#3a3530] mb-6"
                style={{
                  ...cormorant,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                }}
              >
                {phase.title}
              </h2>

              <ul className="mb-7 space-y-2">
                {phase.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-stone-400 leading-[1.9] italic pl-5 relative"
                    style={{
                      ...cormorant,
                      fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                    }}
                  >
                    <span className="absolute left-0 text-[#C4A053] not-italic">—</span>
                    {item}
                  </li>
                ))}
              </ul>

              <span
                className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#a09080] border border-[#d6cfc4] px-4 py-2"
                style={cormorant}
              >
                <span className="w-4 h-px bg-[#C4A053] inline-block flex-shrink-0" />
                {phase.deliverable}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesFlow;