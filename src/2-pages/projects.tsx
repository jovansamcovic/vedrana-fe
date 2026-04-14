import { ProjectsGrid } from "../4-features/projects-grid";
import { getAllProjects } from "../6-shared/api/all-projects";

const ProjectsPage: React.FC = async () => {
  const projects = await getAllProjects();

  return (
    <main>
      <ProjectsGrid projects={projects} />
    </main>
  );
};

export default ProjectsPage;
