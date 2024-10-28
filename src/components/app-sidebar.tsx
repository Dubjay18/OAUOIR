import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import React from "react";
import NavDataGroups from "./NavDataGroups";
import Image from "next/image";
import Link from "next/link";
import { IbmPlexSans } from "@/lib/fonts";
function NavGroupsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
export function AppSidebar() {
  return (
    <Sidebar className="bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-5 px-5">
            <Link href={"/"}>
              <div className={"flex items-center gap-3"}>
                <Image
                  src={"/oau_logo.svg"}
                  alt={"OAU Logo"}
                  width={40}
                  height={40}
                />
                <h1
                  className={`${IbmPlexSans.className} text-primary font-semibold text-xl`}
                >
                  OAUOIR
                </h1>
              </div>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <React.Suspense fallback={<NavGroupsSkeleton />}>
              <NavDataGroups />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
