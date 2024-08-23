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
      <div className="flex h-[90vh]  bg-white overflow-y-hidden">
        <Sidebar hidden={mobileNav} />

        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
