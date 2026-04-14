"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const navItems = ["Home", "Projects", "Studio", "Contact"];

  const linkClass = (extra = "") =>
    `no-underline tracking-widest text-xs font-light uppercase hover:opacity-60 transition-opacity ${extra}`;

  return (
    <>
      <header
        className={`w-full px-4 py-4 top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen ? "fixed" : "absolute"
        } ${
          scrolled && !menuOpen ? "bg-[#eeece8] shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className={`w-full h-px ${scrolled && !menuOpen ? "bg-black" : "bg-white"}`} />
            <div className="relative px-4 pt-1 pb-4">
              <span
                className="tracking-[0.5em] text-md font-light uppercase block leading-none"
                style={{ fontFamily: "var(--font-cormorant)", color: "#C4A053" }}
              >
                ATELIER
              </span>
              <span
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-md ${
                  scrolled && !menuOpen ? "text-black" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-dancing)", top: "28%" }}
              >
                vedrana marković
              </span>
            </div>
            <div className={`w-full h-px ${scrolled && !menuOpen ? "bg-black" : "bg-white"}`} />
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className={linkClass(scrolled ? "text-black" : "text-white")}
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[60] relative"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 origin-center ${
                menuOpen
                  ? "rotate-45 translate-y-[6px] bg-white"
                  : scrolled
                    ? "bg-black"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                menuOpen ? "opacity-0" : scrolled ? "bg-black" : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 origin-center ${
                menuOpen
                  ? "-rotate-45 -translate-y-[6px] bg-white"
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
              key={item}
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 500ms, transform 500ms",
              }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="no-underline tracking-[0.4em] text-2xl font-light uppercase hover:scale-110 transition-transform"
                style={{ fontFamily: "var(--font-cormorant)", color: "#fff" }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};