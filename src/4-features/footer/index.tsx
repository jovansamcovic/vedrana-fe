const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#F5F3EF] border-t border-stone-200 py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-6">

        <div className="flex items-center gap-8">
          <a
            href="https://www.instagram.com/vedrana.markovic.atelier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:opacity-50 transition-opacity"
          >
            <InstagramIcon />
          </a>
     
        </div>

        <div className="h-px w-16 bg-stone-300" />

        <p className="text-[10px] tracking-widest text-stone-300 uppercase">
          made with ♥ by jovan samčović
        </p>

      </div>
    </footer>
  );
};