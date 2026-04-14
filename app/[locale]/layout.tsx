import { Header } from "@/src/4-features/header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}