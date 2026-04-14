import ProjectsPage from "@/src/2-pages/projects";

const locales = ["en", "sr"];

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default function Page() {
  return <ProjectsPage />;
}