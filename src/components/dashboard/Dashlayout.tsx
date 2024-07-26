"use client";
import { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

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
    <>
      <Nav toggleMobileNav={toggleMobileNav} />
      <div className="flex h-screen  bg-[#F1F1F1] overflow-y-hidden">
        <Sidebar hidden={mobileNav} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
