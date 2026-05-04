"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/6-shared/components/language-switcher";

export const Header = ({ locale }: { locale: string }) => {
  const t = useTranslations("Header");

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const pathname = usePathname();

  const isHome = new RegExp(`^/${locale}/?$`).test(pathname);
  const isProjectDetails = new RegExp(`^/${locale}/projects/[^/]+/?$`).test(pathname);
  const isLight = (isHome || (isProjectDetails && !scrolled)) && !menuOpen;

  const isActive = (link: string) => {
    if (link === "") return new RegExp(`^/${locale}/?$`).test(pathname);
    return pathname.startsWith(`/${locale}/${link}`);
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

  useEffect(() => {
    if (!isHome) return;

    const start = setTimeout(() => setIsPulsing(true), 3800);
    const stop = setTimeout(() => setIsPulsing(false), 7200);

    return () => {
      clearTimeout(start);
      clearTimeout(stop);
    };
  }, [isHome]);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
    setIsPulsing(false);
  };

  const navItems = [
    { key: "home", link: "" },
    { key: "projects", link: "projects" },
    { key: "about", link: "about" },
    { key: "services", link: "services" },
    { key: "publications", link: "publications" },
    { key: "faq", link: "faq" },
    { key: "contact", link: "contact" },
  ];

  const headerBg = () => {
    if (scrolled && !menuOpen && !isHome) return "bg-[#eeece8] shadow-sm";
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
          <ul className="hidden md:grid grid-cols-3 justify-items-center items-center gap-y-2 gap-x-6 max-w-[520px] lg:flex lg:flex-nowrap lg:gap-8 lg:max-w-none list-none m-0 p-0 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => {
              const active = isActive(item.link);
              return (
                <li key={item.key} className="relative">
                  <Link
                    href={`/${locale}${item.link ? `/${item.link}` : ""}`}
                    className={`no-underline whitespace-nowrap tracking-[0.25em] text-sm lg:text-md font-medium uppercase transition-opacity ${textColor} ${
                      active ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#C4A053]" />
                  )}
                </li>
              );
            })}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher color={textColor} />
            </div>

            {/* BURGER */}
            <button
              className="md:hidden w-8 h-8 relative z-[60]"
              onClick={handleMenuToggle}
              aria-label={t("toggleMenu")}
            >
              {isPulsing && !menuOpen && (
                <span className="absolute inset-0 -m-2 rounded-full bg-[#C4A053] opacity-30 animate-ping pointer-events-none" />
              )}

              {/* Linija 1 — pomera se na centar i rotira 45° */}
              <span
                className={`absolute left-1 w-6 h-0.5 origin-center ${menuOpen ? "bg-white" : lineColor}`}
                style={{
                  top: "50%",
                  transform: menuOpen
                    ? "translateY(-50%) rotate(45deg)"
                    : "translateY(calc(-50% - 5px)) rotate(0deg)",
                  transition: "transform 300ms ease, background-color 300ms ease",
                }}
              />

              {/* Linija 2 — nestaje */}
              <span
                className={`absolute left-1 w-6 h-0.5 origin-center ${menuOpen ? "bg-white" : lineColor}`}
                style={{
                  top: "50%",
                  transform: "translateY(-50%) rotate(0deg)",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 300ms ease, background-color 300ms ease",
                }}
              />

              {/* Linija 3 — pomera se na centar i rotira -45° */}
              <span
                className={`absolute left-1 w-6 h-0.5 origin-center ${menuOpen ? "bg-white" : lineColor}`}
                style={{
                  top: "50%",
                  transform: menuOpen
                    ? "translateY(-50%) rotate(-45deg)"
                    : "translateY(calc(-50% + 5px)) rotate(0deg)",
                  transition: "transform 300ms ease, background-color 300ms ease",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden backdrop-blur-xs ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 list-none m-0 p-0">
          {navItems.map((item, i) => {
            const active = isActive(item.link);
            return (
              <li
                key={item.key}
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "ease",
                  transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <Link
                  href={`/${locale}${item.link ? `/${item.link}` : ""}`}
                  onClick={() => setMenuOpen(false)}
                  className="no-underline uppercase tracking-[0.5em] font-light hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(0.95rem, 4vw, 1.15rem)",
                    color: active ? "#C4A053" : "#fff",
                  }}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="flex flex-col items-center"
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "500ms",
            transitionTimingFunction: "ease",
            transitionDelay: menuOpen ? `${navItems.length * 80 + 60}ms` : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            marginTop: "2.5rem",
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