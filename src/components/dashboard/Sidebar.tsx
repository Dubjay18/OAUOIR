"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { poppins } from "@/lib/fonts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import { fetchData } from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";

interface NavItemProps {
  title: string;
  url: string;
  subpaths?: NavItemProps[];
  icon?: React.ReactNode;
}
export interface INavItemProps {
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
  const mainUrlPath = "/sanity";
  const {
    data: sanityFolders,
    isLoading: sanityIsLoading,
    isError: sanityIsError,
    refetch: sanityRefetch,
  } = useQuery({ queryKey: ["sanity"], queryFn: fetchData });

  const [sanityFolderTree, setSanityFolderTree] = useState<
    | {
        route: string;
        url: string;
        subroutes: any[];
      }[]
    | null
  >(null);

  const pathanme = usePathname();

  useEffect(() => {
    const formatR = (
      data: { _id: string; name: string; parentId: any }[],
      parentId = null
    ) => {
      const routeMap: Record<string, any> = {};

      data.forEach((route) => {
        routeMap[route._id] = {
          route: route.name,
          url: `${mainUrlPath}/${route._id}`,
          subroutes: [],
          parentId: route.parentId,
        };
      });

      // Populate the subroutes
      data.forEach((route) => {
        if (route.parentId) {
          routeMap[route.parentId._id].subroutes.push(routeMap[route._id]);
        }
      });

      // Return the top-level routes (those without a parent)
      return data
        .filter((route) => route.parentId === parentId)
        .map((route) => formatRoutesHelper(routeMap[route._id], routeMap));
    };
    const formatRoutesHelper = (route: any, routeMap: Record<string, any>) => {
      route.subroutes = route.subroutes.map((subroute: any) => {
        return formatRoutesHelper({ ...subroute }, routeMap);
      });

      return route;
    };
    if (sanityFolders) {
      const tree = formatR(sanityFolders);
      setSanityFolderTree(tree);
    }
  }, [sanityFolders]);

  if (sanityIsLoading) {
    return (
      <aside
        className={`w-64 bg-white shadow left-0 p-4 duration-300 transition-all ${
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

  const sanityNavData = sanityFolderTree || [];

  return (
    <aside
      className={`w-64 ${hidden && "md:!w-fit !w-0 p-0"}  max-h-[90vh] overflow-y-scroll sidebar-scroll  max-md:w-full bg-white shadow sticky left-0 p-4 duration-300 transition-all `}
    >
      <nav
        className={`md:hidden  ${
          hidden && "-translate-x-[300px] w-0 h-0 hidden"
        }`}
      >
        <ul className="space-y-3">
          {sanityNavData?.map((navItem, index) => (
            <SanityNavItem
              key={index}
              title={navItem.route}
              url={navItem.url}
              subpaths={navItem.subroutes}
              loading={sanityIsLoading}
              currentPath={pathanme}
            />
          ))}
        </ul>
      </nav>
      <nav
        className={`max-md:hidden  ${
          hidden && "-translate-x-[300px] w-0 h-0 hidden"
        }
        `}
      >
        <ul className="space-y-3">
          {sanityNavData?.map((navItem, index) => (
            <SanityNavItem
              key={index}
              title={navItem.route}
              url={navItem.url}
              subpaths={navItem.subroutes}
              loading={sanityIsLoading}
              currentPath={pathanme}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export const SanityNavItem = ({
  title,
  url,
  subpaths,
  loading,
  currentPath,
}: {
  title: string;
  url: string;
  subpaths?: INavItemProps[];
  loading?: boolean;
  currentPath?: string;
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
          <div
            className={`rounded-md w-full p-2 my-2 hover:bg-[#63ABFD4D] ${
              currentPath == url && "bg-[#63ABFD4D]"
            }`}
          >
            <span className={`flex items-center gap-5 ${poppins.className}`}>
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
                <div className="rounded-md w-full p-2 my-2  bg-[#63ABFD4D]">
                  <Skeleton className="h-4 w-[150px] cursor-wait" />
                </div>
              ) : (
                <div className="ml-4">
                  <ul>
                    {subpaths.map((subpath, index) => (
                      <SanityNavItem
                        key={index}
                        title={subpath.route}
                        url={subpath.url}
                        subpaths={subpath.subroutes}
                        currentPath={currentPath}
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
            <div className="rounded-md w-full p-2 my-3  hover:bg-[#63ABFD4D]">
              <Skeleton className="h-4 w-[150px] cursor-wait" />
            </div>
          ) : (
            <div
              className={`rounded-md w-full p-
              2 my-3  hover:bg-[#63ABFD4D] ${
                currentPath == url && "bg-[#63ABFD4D]"
              }`}
            >
              <Link
                href={url}
                className={`flex items-center gap-5 ${poppins.className}`}
              >
                {title}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const NavItem = ({
  title,
  url,
  subpaths,
  icon,
  loading,
  currentPath,
}: {
  title: string;
  url: string;
  subpaths?: INavItemProps[];
  icon?: any;
  loading?: boolean;
  currentPath?: string;
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
          <div
            className={`rounded-md w-full p-2 my-2 hover:bg-[#63ABFD4D] ${
              currentPath == url && "bg-[#63ABFD4D]"
            }`}
          >
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
                <div className="rounded-md w-full p-2 my-2  bg-[#63ABFD4D]">
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
                        currentPath={currentPath}
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
            <div className="rounded-md w-full p-2 my-3  hover:bg-[#63ABFD4D]">
              <Skeleton className="h-4 w-[150px] cursor-wait" />
            </div>
          ) : (
            <div
              className={`rounded-md w-full p-2 my-3  hover:bg-[#63ABFD4D] ${
                currentPath == url && "bg-[#63ABFD4D]"
              }`}
            >
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
