import { Footer } from "@/src/4-features/footer";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}