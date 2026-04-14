import { getProjectBySlug } from "../6-shared/api/project-details";
import Image from "next/image";

type Props = {
  slug: string;
  locale: string;
};
const ProjectDetailsPage = async ({ slug, locale }: Props) => {
  const project = await getProjectBySlug(slug);

  return (
    <main>
      <div className="p-8">
        <h3
          style={{
            color: "#C4A053",
            fontSize: "40px",
            textTransform: "uppercase",
          }}
        >
          {project?.title}
        </h3>
        <div>
          {Array.isArray(project?.description) &&
            project.description.map((block: any, i: number) =>
              block.children?.map((child: any, j: number) => (
                <p key={`${i}-${j}`} className="my-4">
                  {child.text}
                </p>
              )),
            )}
        </div>
        <div className="flex flex-col gap-6">
          {project?.gallery.map((image) => {
            return (
              <div
                key={image.id}
                className="relative w-full overflow-hidden aspect-[4/5]"
              >
                <Image src={image.url} alt="" fill className="object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailsPage;
