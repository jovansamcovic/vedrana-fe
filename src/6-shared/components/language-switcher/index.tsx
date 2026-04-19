"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className={`flex items-center gap-3 ${size}`}>
      <button
        onClick={() => switchLocale("en")}
        className={`transition-all duration-200 cursor-pointer border-none bg-transparent p-0
          ${currentLocale === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
      >
        <Image
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          width={32}
          height={20}
          className="rounded-sm"
        />
      </button>
      <span className={`${color} opacity-30 font-extralight`}>·</span>
      <button
        onClick={() => switchLocale("sr")}
        className={`transition-all duration-200 cursor-pointer border-none bg-transparent p-0
          ${currentLocale === "sr" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
      >
        <Image
          src="https://flagcdn.com/w40/rs.png"
          alt="Srpski"
          width={32}
          height={20}
          className="rounded-sm"
        />
      </button>
    </div>
  );
};