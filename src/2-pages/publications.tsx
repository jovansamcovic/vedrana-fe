import Publications, { Publication } from "../4-features/publications";


const publications: Publication[] = [
  {
    id: 1,
    year: "2025",
    magazine: "Buro 247",
    title: "Stan u Kragujevcu izgleda kao sanjivi pariski salon",
    excerpt:
      "Dizajnerka enterijera Vedrana Marković je prostrani stan u Kragujevcu pretvorila u prostor koji nas je odmah transportovao u Pariz — zbog pametnih, maštovitih, nežnih a smelih dizajnerskih rešenja.",
    href: "https://buro247.rs/life/stan-vedrana-markovic-kragujevac/",
    coverImage: "https://buro247.rs/wp-content/uploads/2025/03/511A0190.jpg",
  },
  {
    id: 2,
    year: "2024",
    magazine: "Journal.rs",
    title: "Hair Salon Binjović spaja minimalizam i urbani stil dizajna enterijera",
    excerpt:
      "Razgovarali smo sa dizajnerkom Vedranom Marković o kultnom frizerskom salonu u Kragujevcu — spoju tradicije, inovativnosti i luksuznog enterijera koji postavlja nove standarde.",
    href: "https://www.journal.rs/lifestyle/enterijeri/frizerski-salon-binjovic-kragujevac-vedrana-markovic-enterijer-hair-salon/",
    coverImage:
      "https://www.journal.rs/wp-content/uploads/2024/04/Vedrana-Enterijer-Hair-Salon-Binjovic3-scaled.jpg",
  },
  {
    id: 3,
    year: "2023",
    magazine: "Journal.rs",
    title: "Otvaramo vrata chic penthausa u Kragujevcu koji će vam se dopasti na prvu",
    excerpt:
      "Ekskluzivna enterijer priča o penthousu u centru Kragujevca — prirodni materijali, domaći proizvođači nameštaja i atmosfera koja podseća na sedamdesete.",
    href: "https://www.journal.rs/kultura/umetnost-i-dizajn/enterijer-prica-penthaus-kragujevac/",
    coverImage:
      "https://www.journal.rs/wp-content/uploads/2023/11/Vedrana-Markovic-Jovana-Rakezic-Photography-0023-scaled.jpg",
  },
  {
    id: 4,
    year: "2023",
    magazine: "SuperProstor",
    title: "Vedrana Marković Atelier — Dizajn enterijera, Kragujevac",
    excerpt:
      "Nakon studija arhitekture u Milanu i rada u poznatom internacionalnom birou, Vedrana je profesionalni angažman nastavila u rodnom gradu, inkorporirajući italijanske principe dizajna u domaće okvire.",
    href: "https://www.superprostor.com/profesionalci/vedrana-markovic-atelier",
    coverImage:
      "https://img.superprostor.com/profesionalci/113/naslovna/velika/vedrana_markovic_atelier_s2r4nxbc67f0da66d6.jpeg",
  },
  {
    id: 5,
    year: "2025",
    magazine: "Lepota i zdravlje",
    title: "Jubilarni broj magazina Lepota i zdravlje",
    excerpt:
      "Vedranin rad predstavljen u jubilarnom izdanju jednog od vodećih srpskih lifestyle magazina, u sklopu izbora najinspirativnijih enterijer dizajnera domaće scene.",
    href: "https://lepotaizdravlje.rs/lifestyle/prelistavanje-novi-broj-magazina-lepota-i-zdravlje-jubilej/",
    coverImage: "",
  },
];

export default async function PublicationsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <main>
      <Publications publications={publications} locale={locale} />
    </main>
  );
}