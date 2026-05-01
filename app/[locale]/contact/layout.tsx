import { Footer } from "@/src/4-features/footer";

export default function ContactLayout({
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