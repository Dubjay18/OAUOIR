"use client";
import { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Header from "../global/Header";

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
      <div className="flex   bg-white overflow-hidden w-auto h-[90vh]">
        <Sidebar hidden={mobileNav} />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
