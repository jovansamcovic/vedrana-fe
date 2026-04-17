import { ProjectsGrid } from "../4-features/projects-grid";
import { getAllProjects } from "../6-shared/api/all-projects";

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const projects = await getAllProjects();

  return (
    <main>
      <ProjectsGrid projects={projects} locale={locale} />
    </main>
  );
}