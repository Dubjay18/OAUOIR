import Dashlayout from "@/components/dashboard/Dashlayout";
import { DataFolderProvider } from "@/providers/Datafolderprovider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Dashlayout>{children}</Dashlayout>
    </>
  );
}
