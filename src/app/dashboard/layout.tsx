import Nav from "@/components/dashboard/Nav";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="flex h-screen overflow-y-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 bg-[#F1F1F1]">{children}</main>
        </div>
      </div>
    </>
  );
}
