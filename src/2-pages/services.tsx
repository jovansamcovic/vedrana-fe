import { FaqSection } from "../4-features/faq";
import { Icon1, Icon2, Icon3, Icon4, ServicesFlow } from "../4-features/services-flow";

const translations = {
  en: {
    eyebrow: "Atelier Vedrana Marković",
    pageTitle: "Our process",
    pageSubtitle:
      "Each project moves through four carefully considered phases — from the first conversation to final execution.",
    phase: "Phase",
    preparation: "Preparation",
    design: "Design",
    technical: "Technical documentation",
    execution: "Execution",
    phase1Title: "Assessment & site survey",
    phase2Title: "Concept & design proposal",
    phase3Title: "Construction documents",
    phase4Title: "On-site support",
    phase1Items: [
      "Initial consultation about the space, needs and client's vision",
      "Site survey and documentation of existing conditions",
      "Defining the project brief and timeline",
    ],
    phase2Items: [
      "Functional floor plan with furniture layout",
      "Defining aesthetic direction and design narrative",
      "Moodboards as the basis for visual development",
      "Sections and 3D renders of key rooms",
    ],
    phase3Items: [
      "Installation plans — electrical, plumbing, lighting",
      "Drywall and flooring plans",
      "Paint scheme and colour selection",
      "Bathroom project with tile and sanitary ware selection",
      "Workshop drawings for custom-made furniture",
      "Selection of lighting, rugs, curtains and statement decor",
    ],
    phase4Items: [
      "Author's supervision during construction",
      "Verification of works against the project",
      "On-site material and finish consultations",
      "Project amendments as required on site",
    ],
    phase1Deliverable: "Project brief & site survey",
    phase2Deliverable: "Moodboard, sections & renders",
    phase3Deliverable: "Complete technical documentation",
    phase4Deliverable: "Author's supervision & amendments",
    faqEyebrow: "FAQ",
    faqTitle: "Everything you need to know",
    faqSubtitle: "Answers to the most common questions before we start working together.",
    faqContactText: "Didn't find your answer? Write to us directly.",
    faqContactCta: "Contact us",
    faqItems: [
      {
        q: "What does the first consultation look like?",
        a: "We start with a conversation about the space, your needs and lifestyle. We visit the site, take measurements and listen — with no obligation. Based on that, we define the project brief and an estimate.",
      },
      {
        q: "Can I hire the atelier for just one phase?",
        a: "Yes. Each phase can stand on its own. Some clients want a complete project, others just a conceptual direction they develop further with their contractors.",
      },
      {
        q: "How long does a project take?",
        a: "A concept proposal typically takes 3–6 weeks. Full technical documentation takes another 4–8 weeks. It depends on the size and complexity of the space.",
      },
      {
        q: "Is the first consultation free?",
        a: "Yes, the initial conversation and site visit are free of charge.",
      },
      {
        q: "Does the atelier supervise construction?",
        a: "Author's supervision is an optional service within the fourth phase. It is not mandatory, but it is recommended — it ensures the project is executed exactly as envisioned.",
      },
      {
        q: "Do you have a recognisable style?",
        a: "We adapt to the client. The starting point is always the way you live and what matters to you. Our role is to give that form and cohesion, not to impose an aesthetic.",
      },
      {
        q: "Do you work outside Belgrade?",
        a: "Yes. For projects outside Belgrade we agree on the number of visits depending on the phase and scope of work.",
      },
    ],
  },
  sr: {
    eyebrow: "Atelier Vedrana Marković",
    pageTitle: "Naš proces rada",
    pageSubtitle:
      "Svaki projekat prolazi kroz četiri pažljivo osmišljene faze — od prvog razgovora do finalne realizacije.",
    phase: "Faza",
    preparation: "Priprema",
    design: "Dizajn",
    technical: "Tehnička dokumentacija",
    execution: "Realizacija",
    phase1Title: "Upoznavanje i snimak stanja",
    phase2Title: "Koncept i idejno rešenje",
    phase3Title: "Izvođački projekat",
    phase4Title: "Podrška u izvođenju",
    phase1Items: [
      "Razgovor o prostoru, potrebama i željama klijenta",
      "Uzimanje mera i izrada projekta postojećeg stanja",
      "Definisanje projektnog zadatka i vremenskih rokova",
    ],
    phase2Items: [
      "Funkcionalna šema prostora sa dispozicijom nameštaja",
      "Definisanje estetskog pravca i dizajn narativa",
      "Moodboard-ovi kao osnov za vizuelnu razradu",
      "Prostorni preseci i 3D renderi ključnih prostorija",
    ],
    phase3Items: [
      "Šeme instalacija — struja, voda, rasveta",
      "Šema gipskartonskih radova i podova",
      "Šema molerskih radova i odabir boja",
      "Projekat kupatila sa odabirom keramike i sanitarija",
      "Radionički crteži za nameštaj po meri",
      "Odabir rasvete, tepiha, zavesa i krupne dekoracije",
    ],
    phase4Items: [
      "Autorski nadzor tokom izvođenja radova",
      "Provera usklađenosti radova sa projektom",
      "Konsultacije pri izboru materijala na licu mesta",
      "Izrada izmena projekta prema potrebama gradilišta",
    ],
    phase1Deliverable: "Projektni zadatak & snimak stanja",
    phase2Deliverable: "Moodboard, preseci & renderi",
    phase3Deliverable: "Kompletna tehnička dokumentacija",
    phase4Deliverable: "Autorski nadzor & izmene projekta",
    faqEyebrow: "Česta pitanja",
    faqTitle: "Sve što želite da znate",
    faqSubtitle: "Odgovori na pitanja koja se najčešće postavljaju pre nego što krenemo da radimo zajedno.",
    faqContactText: "Niste pronašli odgovor? Pišite nam direktno.",
    faqContactCta: "Kontaktirajte nas",
    faqItems: [
      {
        q: "Kako izgleda prva konsultacija?",
        a: "Počinjemo razgovorom o prostoru, vašim potrebama i načinu života. Dolazimo na lice mesta, uzimamo mere i slušamo — bez obaveza. Na osnovu toga definišemo projektni zadatak i procenu.",
      },
      {
        q: "Mogu li angažovati atelier samo za jednu fazu?",
        a: "Da. Svaka faza može da stoji samostalno. Neki klijenti žele kompletan projekat, drugi samo konceptualni pravac koji sami dalje razvijaju sa izvođačima.",
      },
      {
        q: "Koliko traje projekat?",
        a: "Idejno rešenje obično traje 3–6 nedelja. Kompletna tehnička dokumentacija još 4–8 nedelja. Zavisi od veličine i složenosti prostora.",
      },
      {
        q: "Da li je prva konsultacija besplatna?",
        a: "Da, uvodni razgovor i poseta prostoru su bez naknade.",
      },
      {
        q: "Da li atelier nadzire i gradnju?",
        a: "Autorski nadzor je posebna usluga u okviru četvrte faze. Nije obavezna, ali je preporučena — osigurava da se projekat izvodi onako kako je zamišljeno.",
      },
      {
        q: "Da li imate prepoznatljiv stil?",
        a: "Prilagođavamo se klijentu. Polazišna tačka uvek je način na koji živite i šta vam je važno. Naša uloga je da tome damo formu i koheziju, ne da nametnemo estetiku.",
      },
      {
        q: "Radite li van Beograda?",
        a: "Da, za projekte van Beograda dogovaramo broj poseta u zavisnosti od faze i obima radova.",
      },
    ],
  },
};

export default async function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] ?? translations.sr;

  const phases = [
    { num: "01", tag: t.preparation, title: t.phase1Title, items: t.phase1Items, deliverable: t.phase1Deliverable, icon: <Icon1 /> },
    { num: "02", tag: t.design,      title: t.phase2Title, items: t.phase2Items, deliverable: t.phase2Deliverable, icon: <Icon2 /> },
    { num: "03", tag: t.technical,   title: t.phase3Title, items: t.phase3Items, deliverable: t.phase3Deliverable, icon: <Icon3 /> },
    { num: "04", tag: t.execution,   title: t.phase4Title, items: t.phase4Items, deliverable: t.phase4Deliverable, icon: <Icon4 /> },
  ];

  return (
    <main className="bg-[#F5F3EF] min-h-screen">
      <ServicesFlow
        phases={phases}
        pageTitle={t.pageTitle}
        pageSubtitle={t.pageSubtitle}
        eyebrow={t.eyebrow}
      />
    </main>
  );
}