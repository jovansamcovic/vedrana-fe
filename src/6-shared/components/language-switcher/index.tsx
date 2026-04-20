"use client";
import { usePathname, useRouter } from "next/navigation";

export const LanguageSwitcher = ({
  color,
  size = "text-md",
}: {
  color: string;
  size?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith("/sr") ? "sr" : "en";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|sr)/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div
      className={`flex items-center gap-3 ${size}`}
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      <button
        onClick={() => switchLocale("en")}
        className={`tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer border-none bg-transparent p-0 text-sm ${
          currentLocale === "en"
            ? `${color} opacity-100`
            : `${color} opacity-30 hover:opacity-60`
        }`}
      >
        EN
      </button>
      <span className={`${color} opacity-20`} style={{ fontSize: "0.6rem" }}>|</span>
      <button
        onClick={() => switchLocale("sr")}
        className={`tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer border-none bg-transparent p-0 text-sm ${
          currentLocale === "sr"
            ? `${color} opacity-100`
            : `${color} opacity-30 hover:opacity-60`
        }`}
      >
        SR
      </button>
    </div>
  );
};