import Dashlayout from "@/components/dashboard/Dashlayout";
import { PageContentProvider } from "@/context/PageContentContext";
import { DataFolderProvider } from "@/providers/Datafolderprovider";

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
