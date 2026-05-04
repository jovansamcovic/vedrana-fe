"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type Props = {
  content: any;
};

export const ProjectDescription = ({ content }: Props) => (
  <div
    className="border-l border-[#C4A053]/40 pl-6 md:pl-10"
    style={{ fontFamily: "var(--font-cormorant)" }}
  >
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className="text-[#2C2C2A]/75 text-xl md:text-2xl leading-[1.85] tracking-wide last:mb-0">
            {children}
          </p>
        ),
      }}
      modifiers={{
        bold: ({ children }) => (
          <span className="text-[#C4A053] text-[10px] tracking-[0.4em] uppercase font-normal align-middle mr-1">
            {children}
          </span>
        ),
      }}
    />
  </div>
);