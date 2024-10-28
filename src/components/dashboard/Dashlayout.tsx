"use client";
import { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Header from "../global/Header";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarProvider, SidebarTrigger, useSidebar } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function Dashlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNav, setMobileNav] = useState(false);
  const toggleMobileNav = () => {
    setMobileNav((prev) => !prev);
  };
  return (
    <div className="overflow-y-hidden h-auto">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full relative">
          <TriggerHeader />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

function TriggerHeader() {
  const { open } = useSidebar();

  return (
    <>
      {" "}
      <SidebarTrigger className="absolute z-10 md:top-20 top-10" />
      <Header dashboard isSidebar={open} full />
    </>
  );
}
