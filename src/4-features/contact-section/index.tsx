"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const cormorant = { fontFamily: "var(--font-cormorant)" };

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const ContactSection = () => {
  const t = useTranslations("ContactPage");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email" && emailError) {
      setEmailError(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    if (!isValidEmail(form.email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full bg-[#F5F3EF] px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center gap-6 mb-20">
          <div className="h-px flex-1 bg-stone-300" />
          <span
            className="text-[#C4A053] tracking-[0.5em] uppercase"
            style={{ ...cormorant, fontSize: "0.7rem" }}
          >
            {t("sectionLabel")}
          </span>
          <div className="h-px flex-1 bg-stone-300" />
        </div>

        {/* ── Intro ── */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="h-px bg-[#C4A053] w-6 mx-auto mb-6" />
          <h1
            className="text-stone-700 font-light tracking-[0.2em] uppercase mb-6"
            style={{ ...cormorant, fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            {t("heading")}
          </h1>
          <p
            className="text-stone-500 font-light leading-relaxed tracking-wide"
            style={{ ...cormorant, fontSize: "1rem" }}
          >
            {t("subheading")}
          </p>
        </div>

        {/* ── Forma + Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 mb-20">
          {/* FORMA */}
          <div className="lg:pr-16 xl:pr-24 pb-16 lg:pb-0">
            <span
              className="text-[#C4A053] tracking-[0.4em] uppercase block mb-10"
              style={{ ...cormorant, fontSize: "0.65rem" }}
            >
              / 01 — {t("formTitle")}
            </span>

            {status === "success" ? (
              <div className="py-8">
                <div className="h-px bg-[#C4A053] w-6 mb-6" />
                <p
                  className="text-stone-700 tracking-[0.15em] uppercase mb-3"
                  style={{ ...cormorant, fontSize: "1.2rem" }}
                >
                  {t("successTitle")}
                </p>
                <p
                  className="text-stone-500 font-light tracking-wide leading-relaxed"
                  style={{ ...cormorant, fontSize: "0.95rem" }}
                >
                  {t("successText")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-9">
                <div>
                  <label
                    className="block text-stone-500 tracking-[0.35em] uppercase mb-3"
                    style={{ ...cormorant, fontSize: "0.65rem" }}
                  >
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 focus:border-[#C4A053] outline-none pb-3 text-stone-700 font-light tracking-wide transition-colors duration-300"
                    style={{ ...cormorant, fontSize: "0.95rem" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-stone-500 tracking-[0.35em] uppercase mb-3"
                    style={{ ...cormorant, fontSize: "0.65rem" }}
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b outline-none pb-3 text-stone-700 font-light tracking-wide transition-colors duration-300 ${
                      emailError
                        ? "border-red-400 focus:border-red-400"
                        : "border-stone-300 focus:border-[#C4A053]"
                    }`}
                    style={{ ...cormorant, fontSize: "0.95rem" }}
                  />
                  {emailError && (
                    <p
                      className="text-red-400 font-light tracking-wide mt-2"
                      style={{ ...cormorant, fontSize: "0.8rem" }}
                    >
                      {t("errorEmail")}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-stone-500 tracking-[0.35em] uppercase mb-3"
                    style={{ ...cormorant, fontSize: "0.65rem" }}
                  >
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t("messagePlaceholder")}
                    className="w-full bg-transparent border-b border-stone-300 focus:border-[#C4A053] outline-none pb-3 text-stone-700 font-light tracking-wide transition-colors duration-300 resize-none placeholder:text-stone-400"
                    style={{ ...cormorant, fontSize: "0.95rem" }}
                  />
                </div>

                {status === "error" && (
                  <p
                    className="text-red-400 font-light tracking-wide"
                    style={{ ...cormorant, fontSize: "0.88rem" }}
                  >
                    {t("errorText")}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={
                      status === "sending" ||
                      !form.name ||
                      !form.email ||
                      !form.message
                    }
                   className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#3a3530] border border-[#C4A053] px-6 py-3 flex-shrink-0"
                    style={cormorant}
                  >
                    <span className="w-4 h-px bg-[#C4A053] inline-block" />
                    {status === "sending" ? t("sending") : t("send")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Vertikalna linija */}
          <div className="hidden lg:block w-px bg-stone-200" />

          {/* INFO */}
          <div className="lg:pl-16 xl:pl-24 pt-16 lg:pt-0 border-t border-stone-200 lg:border-t-0">
            <span
              className="text-[#C4A053] tracking-[0.4em] uppercase block mb-10"
              style={{ ...cormorant, fontSize: "0.65rem" }}
            >
              / 02 — {t("infoTitle")}
            </span>

            <div className="flex flex-col gap-10">
              <div>
                <div className="h-px bg-[#C4A053] w-6 mb-3" />
                <p
                  className="text-stone-500 tracking-[0.35em] uppercase mb-2"
                  style={{ ...cormorant, fontSize: "0.65rem" }}
                >
                  {t("location")}
                </p>
                <p
                  className="text-stone-700 font-light tracking-[0.1em]"
                  style={{ ...cormorant, fontSize: "0.95rem" }}
                >
                  {t("locationValue")}
                </p>
              </div>

              <div>
                <div className="h-px bg-[#C4A053] w-6 mb-3" />
                <p
                  className="text-stone-500 tracking-[0.35em] uppercase mb-2"
                  style={{ ...cormorant, fontSize: "0.65rem" }}
                >
                  {t("emailLabel")}
                </p>
                <a
                  href="mailto:office@vedrana-atelier.com"
                  className="text-stone-700 font-light tracking-[0.1em] hover:text-[#C4A053] transition-colors duration-300 no-underline"
                  style={{ ...cormorant, fontSize: "0.95rem" }}
                >
                  office@vedrana-atelier.com
                </a>
              </div>

              <div>
                <div className="h-px bg-[#C4A053] w-6 mb-3" />
                <p
                  className="text-stone-500 tracking-[0.35em] uppercase mb-2"
                  style={{ ...cormorant, fontSize: "0.65rem" }}
                >
                  {t("phoneLabel")}
                </p>
                <a
                  href="tel:+381XXXXXXXXX"
                  className="text-stone-700 font-light tracking-[0.1em] hover:text-[#C4A053] transition-colors duration-300 no-underline"
                  style={{ ...cormorant, fontSize: "0.95rem" }}
                >
                  +381 69 111 111
                </a>
              </div>

              <div>
                <div className="h-px bg-[#C4A053] w-6 mb-3" />
                <p
                  className="text-stone-500 tracking-[0.35em] uppercase mb-4"
                  style={{ ...cormorant, fontSize: "0.65rem" }}
                >
                  {t("followLabel")}
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.instagram.com/vedranamarkovic_atelier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-stone-600 hover:text-[#C4A053] tracking-[0.25em] uppercase transition-colors duration-300 no-underline"
                    style={{ ...cormorant, fontSize: "0.85rem" }}
                  >
                    <span className="h-px bg-current w-4 transition-all duration-500 group-hover:w-7" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mapa ── */}
        <div className="border-t border-stone-200 pt-16">
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px flex-1 bg-stone-200" />
            <span
              className="text-[#C4A053] tracking-[0.4em] uppercase"
              style={{ ...cormorant, fontSize: "0.65rem" }}
            >
              / 03 — {t("findUs")}
            </span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          <div className="relative">
            <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#C4A053] z-10 pointer-events-none" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#C4A053] z-10 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#C4A053] z-10 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#C4A053] z-10 pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.274984787959!2d20.914599976545695!3d44.015711728908755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47572126593889c7%3A0x32c7f71ec1dfc35d!2zMlc4OCs3Uiwg0IjQsNC90LrQsCDQktC10YHQtdC70LjQvdC-0LLQuNGb0LAgNiwg0JrRgNCw0LPRg9GY0LXQstCw0YYgMzQwMDA!5e0!3m2!1ssr!2srs!4v1776722941870!5m2!1ssr!2srs"
              width="100%"
              height="380"
              style={{
                border: 0,
                display: "block",
                filter:
                  "sepia(25%) contrast(0.93) brightness(1.03) saturate(0.85)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex items-center justify-between mt-6 px-1">
            <p
              className="text-stone-500 font-light tracking-[0.12em]"
              style={{ ...cormorant, fontSize: "0.88rem" }}
            >
              {t("addressLine")}
            </p>
            <a
              href="https://maps.google.com/?q=Janka+Veselinovića+6,+Kragujevac"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[#C4A053] tracking-[0.3em] uppercase transition-opacity duration-300 hover:opacity-60 no-underline"
              style={{ ...cormorant, fontSize: "0.7rem" }}
            >
              {t("openInMaps")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
