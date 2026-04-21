export default async function HomePage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div>{children}</div>;
    </>
  );
}
