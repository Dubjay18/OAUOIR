import Dashlayout from "@/components/dashboard/Dashlayout";

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
