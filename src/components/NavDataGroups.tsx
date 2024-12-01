"use client";
import { DataFolderContext } from "@/context/DataFolderContext";
import { useContext, useEffect, useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./ui/sidebar";
import { Folder, INavItemProps, NavItem } from "./dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function NavDataGroups() {
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const [folderTree, setFolderTree] = useState<INavItemProps[] | null>(null);
  const pathanme = usePathname();
  useEffect(() => {
    const formatRoutes = (
      routes: Folder[],
      parentId = null,
      accumulatedPath = "/data"
    ) => {
      const routeMap: Record<string, any> = {};

      routes.forEach((route) => {
        const currentPath = `${accumulatedPath}/${route.name}`;
        routeMap[route.id] = {
          route: route.name,
          content: route.content,
          url: currentPath, // Add the accumulated path to the route
          subroutes: [],
          parentId: route.parent_id,
        };
      });

      // Populate the subroutes
      routes.forEach((route) => {
        if (route.parent_id) {
          routeMap[route.parent_id].subroutes.push(routeMap[route.id]);
        }
      });

      // Return the top-level routes (those without a parent)
      return routes
        .filter((route) => route.parent_id === parentId)
        .map((route) =>
          formatRoutesHelper(routeMap[route.id], routeMap, accumulatedPath)
        );
    };

    // Helper function to recursively build the folder tree with accumulated paths
    const formatRoutesHelper = (
      route: any,
      routeMap: Record<string, any>,
      accumulatedPath: string
    ) => {
      console.log(routeMap, "routeMap");
      console.log(accumulatedPath);
      if (route.parentId === null) {
        accumulatedPath = `/data/${route.route}`;
      }
      route.subroutes = route.subroutes.map((subroute: any) => {
        const updatedPath = `${accumulatedPath}/${subroute.route}`;
        console.log(updatedPath, "updatedPath");

        return formatRoutesHelper(
          { ...subroute, url: updatedPath },
          routeMap,
          updatedPath
        );
      });

      return route;
    };
    if (folders) {
      const tree = formatRoutes(folders);
      setFolderTree(tree);
    }
  }, [folders]);
  const navData = folderTree || [];
  if (isLoading) {
    return (
      <SidebarMenu className="mt-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  if (!folders) {
    return "...";
  }

  return (
    <SidebarMenu className="mt-5">
      {navData.map((navItem, index) => (
        <NavItem
          key={index}
          title={navItem.route}
          url={navItem.url}
          subpaths={navItem.subroutes}
          icon={navItem.icon}
          loading={isLoading}
          currentPath={pathanme}
        />
      ))}
    </SidebarMenu>
  );
}
