"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/src/6-shared/components/language-switcher";

export const Header = ({ locale }: { locale: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = new RegExp(`^/${locale}/?$`).test(pathname);
  const isLight = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Home", labelSr: "Početna", link: "" },
    { label: "Projects", labelSr: "Projekti", link: "projects" },
    { label: "Services", labelSr: "Usluge", link: "services" },
    { label: "Publications", labelSr: "Publikacije", link: "publications" },
    { label: "FAQ", labelSr: "Česta pitanja", link: "faq" },
    { label: "Contact", labelSr: "Kontakt", link: "contact" },
  ];

  const headerBg = () => {
    if (scrolled && !menuOpen) return "bg-[#eeece8] shadow-sm";
    if (isHome) return "bg-gradient-to-b from-black/30 to-transparent";
    return "bg-transparent";
  };

  const textColor = isLight ? "text-white" : "text-black";
  const lineColor = isLight ? "bg-white" : "bg-black";

  return (
    <>
      <header
        className={`w-full px-4 py-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "fixed" : "absolute"
        } ${headerBg()}`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href={`/${locale}`} className="no-underline">
            <div className="flex flex-col items-center">
              <div className={`w-full h-px ${lineColor}`} />
              <div className="relative px-4 pt-1 pb-4">
                <span
                  className="tracking-[0.5em] text-md font-normal uppercase block leading-none"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "#C4A053",
                  }}
                >
                  ATELIER
                </span>
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-md font-medium ${textColor}`}
                  style={{ fontFamily: "var(--font-dancing)", top: "28%" }}
                >
                  vedrana marković
                </span>
              </div>
              <div className={`w-full h-px ${lineColor}`} />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <ul
            className="
              hidden md:grid 
              grid-cols-3 
              justify-items-center items-center
              gap-y-2 gap-x-6
              max-w-[520px]
              lg:flex lg:flex-nowrap lg:gap-8 lg:max-w-none
              list-none m-0 p-0 
              absolute left-1/2 -translate-x-1/2
            "
          >
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={`/${locale}${item.link ? `/${item.link}` : ""}`}
                  className={`no-underline whitespace-nowrap tracking-[0.25em] text-sm lg:text-md font-medium uppercase hover:opacity-60 transition-opacity ${textColor}`}
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {locale === "sr" ? item.labelSr : item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher color={textColor} />
            </div>

            {/* BURGER */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[60] relative"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px] bg-white" : lineColor
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : lineColor
                }`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                  menuOpen
                    ? "-rotate-45 -translate-y-[7px] bg-white"
                    : lineColor
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden backdrop-blur-xs ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <ul className="flex flex-col items-center gap-10 list-none m-0 p-0">
          {navItems.map((item, i) => (
            <li
              key={item.label}
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 500ms, transform 500ms",
              }}
            >
              <Link
                href={`/${locale}${item.link ? `/${item.link}` : ""}`}
                onClick={() => setMenuOpen(false)}
                className="no-underline tracking-[0.4em] text-2xl font-normal uppercase hover:scale-110 transition-transform"
                style={{ fontFamily: "var(--font-cormorant)", color: "#fff" }}
              >
                {locale === "sr" ? item.labelSr : item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="flex flex-col items-center"
          style={{
            transitionDelay: menuOpen
              ? `${navItems.length * 80 + 60}ms`
              : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 500ms, transform 500ms",
            marginTop: "3rem",
          }}
        >
          <div className="flex items-center gap-3 mb-5 justify-center">
            <div className="w-8 h-px bg-[#C4A053] opacity-50" />
            <div className="w-1 h-1 rounded-full bg-[#C4A053] opacity-50" />
            <div className="w-8 h-px bg-[#C4A053] opacity-50" />
          </div>

          <LanguageSwitcher color="text-white" size="text-sm" />
        </div>
      </div>
    </>
  );
};
