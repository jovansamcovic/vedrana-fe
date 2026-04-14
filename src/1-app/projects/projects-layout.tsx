import { Header } from "@/src/4-features/header";

export default async function ProjectsPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div>{children}</div>;
    </>
  );
}
