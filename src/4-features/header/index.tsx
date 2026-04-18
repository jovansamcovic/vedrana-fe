"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith("/sr") ? "sr" : "en";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|sr)/, `/${locale}`);
    router.push(newPath);
  };

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
    { label: "Home", labelSr: "Početna", link: "en" },
    { label: "Projects", labelSr: "Projekti", link: "en/projects" },
  ];

 const headerBg = () => {
  if (scrolled && !menuOpen) return "bg-[#eeece8] shadow-sm";
  return "bg-transparent";
};

  const linkClass = (extra = "") =>
    `no-underline tracking-widest text-md font-bold uppercase hover:opacity-60 transition-opacity ${extra}`;

  const LanguageSwitcher = ({
    color,
    size = "text-md",
  }: {
    color: string;
    size?: string;
  }) => (
    <div
      className={`flex items-center gap-2 ${size}`}
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      <button
        onClick={() => switchLocale("en")}
        className={`tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer border-none bg-transparent p-0
          ${
            currentLocale === "en"
              ? `${color} opacity-100 border-b border-current`
              : `${color} opacity-40 hover:opacity-70`
          }`}
      >
        EN
      </button>
      <span
        className={`${color} opacity-30 font-extralight`}
        style={{ letterSpacing: "0.05em" }}
      >
        ·
      </span>
      <button
        onClick={() => switchLocale("sr")}
        className={`tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer border-none bg-transparent p-0
          ${
            currentLocale === "sr"
              ? `${color} opacity-100 border-b border-current`
              : `${color} opacity-40 hover:opacity-70`
          }`}
      >
        SR
      </button>
    </div>
  );

  return (
    <>
      <header
        className={`w-full px-4 py-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "fixed" : "absolute"
        } ${headerBg()}`}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/en" className="no-underline">
            <div className="flex flex-col items-center">
              <div
                className={`w-full h-px ${
                  scrolled && !menuOpen ? "bg-black" : "bg-white"
                }`}
              />
              <div className="relative px-4 pt-1 pb-4">
                <span
                  className="tracking-[0.5em] text-md font-normal uppercase block leading-none"
                  style={{ fontFamily: "var(--font-cormorant)", color: "#C4A053" }}
                >
                  ATELIER
                </span>
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-md font-medium ${
                    scrolled && !menuOpen ? "text-black" : "text-white"
                  }`}
                  style={{ fontFamily: "var(--font-dancing)", top: "28%" }}
                >
                  vedrana marković
                </span>
              </div>
              <div
                className={`w-full h-px ${
                  scrolled && !menuOpen ? "bg-black" : "bg-white"
                }`}
              />
            </div>
          </Link>

          {/* Desktop nav + language switcher */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={`/${item.link}`}
                    className={linkClass(scrolled ? "text-black" : "text-white")}
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {currentLocale === "sr" ? item.labelSr : item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className={`h-4 w-px opacity-30 ${
                scrolled && !menuOpen ? "bg-black" : "bg-white"
              }`}
            />

            <LanguageSwitcher
              color={scrolled && !menuOpen ? "text-black" : "text-white"}
            />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[60] relative"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                menuOpen
                  ? "rotate-45 translate-y-[7px] bg-white"
                  : scrolled
                  ? "bg-black"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? "opacity-0" : scrolled ? "bg-black" : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                menuOpen
                  ? "-rotate-45 -translate-y-[7px] bg-white"
                  : scrolled
                  ? "bg-black"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
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
                href={`/${item.link}`}
                onClick={() => setMenuOpen(false)}
                className="no-underline tracking-[0.4em] text-2xl font-normal uppercase hover:scale-110 transition-transform"
                style={{ fontFamily: "var(--font-cormorant)", color: "#fff" }}
              >
                {currentLocale === "sr" ? item.labelSr : item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language switcher in mobile overlay */}
        <div
          className="flex flex-col items-center"
          style={{
            transitionDelay: menuOpen ? `${navItems.length * 80 + 60}ms` : "0ms",
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