const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const cormorant = { fontFamily: "var(--font-cormorant)" };

export const Footer = () => {
  return (
    <footer className="bg-[#eeece8] shadow-sm py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        <a
          href="https://www.instagram.com/vedranamarkovic_atelier"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-[#C4A053] transition-colors duration-300 mb-2"
        >
          <InstagramIcon />
        </a>

        <div className="h-px w-16 bg-stone-300 my-4"></div>

        <p
          className="text-[10px] tracking-[0.25em] uppercase text-stone-500 text-center mt-2"
          style={cormorant}
        >
          © {new Date().getFullYear()} Atelier Vedrana Marković.
        </p>

        <p
          className="text-[8px] tracking-[0.25em] uppercase text-stone-500 text-center"
          style={cormorant}
        >
          All rights reserved.
        </p>

        <p
          className="text-[8px] tracking-[0.2em] uppercase text-stone-500 text-center mt-3"
          style={cormorant}
        >
          made with ♥ by{" "}
          <a
            href="https://www.linkedin.com/in/jovan-samcovic-753b1b151/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C4A053] transition-colors duration-300 border-b border-stone-200 pb-px"
          >
            Jovan Samčović
          </a>
        </p>

      </div>
    </footer>
  );
};