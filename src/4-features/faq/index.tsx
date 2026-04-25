"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const cormorant = { fontFamily: "var(--font-cormorant)" };

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: FaqItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  contactText: string;
  contactCta: string;
  locale: string;
};

export function FaqSection({
  items,
  eyebrow,
  title,
  subtitle,
  contactText,
  contactCta,
  locale,
}: FaqSectionProps) {
  const [active, setActive] = useState(0);
  const answerRef = useRef<HTMLDivElement>(null);

  function handleSelect(i: number) {
    setActive(i);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        answerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <span
          className="text-[10px] tracking-[0.4em] uppercase text-[#C4A053] block mb-5"
          style={cormorant}
        >
          {eyebrow}
        </span>
        <h2
          className="font-light text-[#3a3530] mb-7"
          style={{ ...cormorant, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="w-12 h-px bg-[#C4A053] opacity-50" />
          <div className="w-1.5 h-1.5 bg-[#C4A053] rotate-45" />
          <div className="w-12 h-px bg-[#C4A053] opacity-50" />
        </div>
        <p
          className="italic text-[#a09080] max-w-sm mx-auto leading-[1.9]"
          style={{ ...cormorant, fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[860px] mx-auto grid grid-cols-1 md:grid-cols-2 border-t border-[#d6cfc4]">
        {/* Leva kolona — pitanja */}
        <div className="md:border-r border-[#d6cfc4] md:pr-10">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="w-full text-left py-5 border-b border-[#e8e4de] last:border-none flex items-start gap-4 transition-all"
            >
              <span
                className="text-[10px] tracking-[0.2em] text-[#C4A053] pt-1 flex-shrink-0 transition-opacity"
                style={{ ...cormorant, opacity: active === i ? 1 : 0.35 }}
              >
                0{i + 1}
              </span>
              <span
                className="font-light leading-snug transition-colors flex-1"
                style={{
                  ...cormorant,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                  color: active === i ? "#3a3530" : "#8a8078",
                }}
              >
                {item.question}
              </span>
              <span
                className="w-4 h-px bg-[#C4A053] flex-shrink-0 mt-3 transition-opacity"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            </button>
          ))}
        </div>

        {/* Desna kolona — odgovor */}
        <div ref={answerRef} className="md:pl-12 pt-6 md:pt-6 scroll-mt-6">
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#C4A053] block mb-5"
            style={cormorant}
          >
            Odgovor
          </span>
          <p
            className="font-light text-[#3a3530] mb-4 leading-snug"
            style={{ ...cormorant, fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
          >
            {items[active]?.question}
          </p>
          <div className="w-8 h-px bg-[#C4A053] opacity-50 mb-4" />
          <p
            className="italic text-[#a09080] leading-[1.9]"
            style={{ ...cormorant, fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
          >
            {items[active]?.answer}
          </p>
        </div>
      </div>

      {/* Contact strip */}
      <div className="max-w-[860px] mx-auto border-t border-[#d6cfc4] mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p
          className="italic text-[#a09080]"
          style={{ ...cormorant, fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
        >
          {contactText}
        </p>
        <span
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#3a3530] border border-[#C4A053] px-6 py-3 flex-shrink-0"
          style={cormorant}
        >
          <span className="w-4 h-px bg-[#C4A053] inline-block" />
          <Link href={`/${locale}/contact`}>{contactCta}</Link>
        </span>
      </div>
    </div>
  );
}
