"use client";
import { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Header from "../global/Header";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="overflow-y-hidden  h-auto">
      <Header full />
      <div className="flex  relative bg-white overflow-hidden w-auto h-[90vh]">
        <Button variant={"ghost"} onClick={toggleMobileNav}>
          {mobileNav ? (
            <ChevronRight size={20} className="text-primary" />
          ) : (
            <ChevronLeft size={20} className="text-primary" />
          )}
        </Button>
        <Sidebar hidden={mobileNav} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
