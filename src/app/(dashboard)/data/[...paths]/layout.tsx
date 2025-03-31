import { PageContentProvider } from "@/context/PageContentContext";
export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    paths: string[];
  };
}>) {
  return (
    <>
      <PageContentProvider path={params.paths}>{children}</PageContentProvider>
    </>
  );
}
