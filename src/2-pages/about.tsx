import Image from "next/image";
import Link from "next/link";
import { getAbouts } from "../6-shared/api/get-about";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const abouts = await getAbouts(locale);

  const t = await getTranslations("Common");
  const contactHref = `/${locale}/contact`;
  const contactLabel = t("contactCta");

  return (
    <main>
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-32">
        <div className="flex flex-col xl:flex-row md:items-center gap-10 md:gap-20 lg:gap-28">

          {/* Tekst */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-px bg-[#C4A053] w-16 mb-10" />

            <h3
              className="font-light tracking-[0.2em] uppercase mb-10"
              style={{
                color: "#C4A053",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontFamily: "var(--font-cormorant)",
              }}
            >
              {abouts[0]?.title}
            </h3>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-px bg-stone-400" />
              <div className="w-1 h-1 rounded-full bg-stone-400" />
            </div>

            <div
              className="text-base md:text-lg leading-[2] text-stone-500 max-w-lg"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {abouts[0]?.description && (
                <BlocksRenderer content={abouts[0].description} />
              )}
            </div>

            {/* CTA */}
            <Link
              href={contactHref}
              className="group inline-flex items-center gap-3 mt-10 text-stone-400 hover:text-[#C4A053] transition-colors duration-500 w-fit"
            >
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                  letterSpacing: "0.02em",
                }}
              >
                {contactLabel}
              </span>
              <span className="h-px w-5 bg-current transition-all duration-500 group-hover:w-9" />
            </Link>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-[#C4A053] opacity-60" />
              <span
                className="text-sm tracking-[0.3em] text-[#C4A053] uppercase font-light"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Vedrana Marković
              </span>
            </div>
          </div>

          {/* Slika */}
          <div className="relative shrink-0 w-full md:w-[450px] lg:w-[500px]">
            <div className="absolute -top-4 -right-4 w-full h-full border border-[#C4A053] opacity-20 hidden md:block" />
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/Vedrana.webp"
                alt="Vedrana Marković"
                fill
                className="object-cover grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-[#F5F3EF] opacity-5" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}