"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/lib/fonts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchFolders } from "@/lib/supabase";
import { DataFolderContext } from "@/context/DataFolderContext";
import { Skeleton } from "../ui/skeleton";

interface NavItemProps {
  title: string;
  url: string;
  subpaths?: NavItemProps[];
  icon?: React.ReactNode;
}
interface INavItemProps {
  route: string;
  url: string;
  subroutes?: INavItemProps[];
  icon?: React.ReactNode;
}
export interface Folder {
  id: string;
  name: string;
  parent_id: string | null;
  is_folder: boolean;
  content: string | null;
}
export default function Sidebar({ hidden }: { hidden?: boolean }) {
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const [folderTree, setFolderTree] = useState<INavItemProps[] | null>(null);
  useEffect(() => {
    const formatRoutes = (
      routes: Folder[],
      parentId = null,
      accumulatedPath = "/dashboard/data"
    ) => {
      const routeMap: Record<string, any> = {};

      // Create a map of routes by their IDs
      routes.forEach((route) => {
        const currentPath = `${accumulatedPath}/${route.name}`;
        routeMap[route.id] = {
          route: route.name,
          content: route.content,
          url: currentPath, // Add the accumulated path to the route
          subroutes: [],
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
      route.subroutes = route.subroutes.map((subroute: any) => {
        const updatedPath = `${accumulatedPath}/${subroute.route}`;
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

  if (!folders) {
    return (
      <aside
        className={`w-64 bg-white shadow sticky left-0 p-4 duration-300 transition-all ${
          hidden && "-translate-x-[300px] w-0 h-0 hidden"
        }`}
      >
        <div className="space-y-6 my-10 cursor-wait">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </aside>
    );
  }

  const navData = [
    {
      icon: (
        <Image
          src="/dashboard/icons/data.svg"
          width={24}
          height={24}
          alt="dashboard_data"
        />
      ),
      title: "Data Browser",
      url: "/dashboard/data",
      subpaths: folderTree || [],
    },
  ];
  return (
    <aside
      className={`w-64 bg-white shadow sticky left-0 p-4 duration-300 transition-all ${
        hidden && "-translate-x-[300px] w-0 h-0 hidden"
      }`}
    >
      <nav>
        <ul className="space-y-4">
          {navData.map((navItem, index) => (
            <NavItem
              key={index}
              title={navItem.title}
              url={navItem.url}
              subpaths={navItem.subpaths}
              icon={navItem.icon}
              loading={isLoading}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

const NavItem = ({
  title,
  url,
  subpaths,
  icon,
  loading,
}: {
  title: string;
  url: string;
  subpaths?: INavItemProps[];
  icon?: any;
  loading?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {subpaths && !!subpaths.length ? (
        <div>
          <div className="rounded-md w-full p-2 my-2 hover:bg-[#63ABFD4D]">
            <span
              className={`flex items-center ${!icon && "px-4"} gap-5 ${
                poppins.className
              }`}
            >
              {icon && icon}
              <Link href={url}> {title}</Link>
              <div onClick={toggleOpen} className="ml-auto">
                {isOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4 ml-auto mr-3 cursor-pointer" />
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 ml-auto mr-3 cursor-pointer" />
                  </>
                )}
              </div>
            </span>
          </div>
          {isOpen && (
            <>
              {loading ? (
                <div className="rounded-md w-full p-2 my-5  bg-[#63ABFD4D]">
                  <Skeleton className="h-4 w-[150px] cursor-wait" />
                </div>
              ) : (
                <div className="ml-4">
                  <ul>
                    {subpaths.map((subpath, index) => (
                      <NavItem
                        key={index}
                        title={subpath.route}
                        url={subpath.url}
                        subpaths={subpath.subroutes}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="">
          {loading ? (
            <div className="rounded-md w-full p-2 my-5  hover:bg-[#63ABFD4D]">
              <Skeleton className="h-4 w-[150px] cursor-wait" />
            </div>
          ) : (
            <div className="rounded-md w-full p-2 my-5  hover:bg-[#63ABFD4D]">
              <Link
                href={url}
                className={`flex items-center ${!icon && "px-4"} gap-5 ${
                  poppins.className
                }`}
              >
                {icon}
                {title}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};
