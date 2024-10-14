"use client";
import Link from "next/link";
import { IbmPlexSans, roboto, robotoSerif } from "@/lib/fonts";
import Image from "next/image";
import Searchbox from "./SearchBox";
import { useContext, useEffect, useState } from "react";
import { DataFolderContext } from "@/context/DataFolderContext";
import { MenuItem } from "./MenuItem";
import { Folder, INavItemProps, NavItem } from "../dashboard/Sidebar";
import { MenuIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/sanity/lib/client";

const Header = ({ full }: { full?: boolean }) => {
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const [active, setActive] = useState<string | null>(null);
  const [folderTree, setFolderTree] = useState<INavItemProps[] | null>(null);
  const [sanityFolderTree, setSanityFolderTree] = useState<
    | {
        route: string;
        url: string;
        subroutes: any[];
      }[]
    | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainUrlPath = "/sanity";
  const {
    data: sanityFolders,
    isLoading: sanityIsLoading,
    isError: sanityIsError,
    refetch: sanityRefetch,
  } = useQuery({ queryKey: ["sanity"], queryFn: fetchData });

  const navData = [
    {
      route: "Data",
      url: "/data",
      subroutes: folderTree || [],
    },
    {
      route: "Blog",
      url: "/blog",
    },
    {
      route: "Request Data",
      url: "/request-data",
    },
  ];
  const midNavData = [
    {
      route: "Blog",
      url: "/blog",
    },
    {
      route: "Request Data",
      url: "/request-data",
    },
  ];
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
          url: currentPath,
          subroutes: [],
          parentId: route.parent_id,
        };
      });

      routes.forEach((route) => {
        if (route.parent_id) {
          routeMap[route.parent_id].subroutes.push(routeMap[route.id]);
        }
      });

      return routes
        .filter((route) => route.parent_id === parentId)
        .map((route) =>
          formatRoutesHelper(routeMap[route.id], routeMap, accumulatedPath)
        );
    };

    const formatRoutesHelper = (
      route: any,
      routeMap: Record<string, any>,
      accumulatedPath: string
    ) => {
      if (route.parentId === null) {
        accumulatedPath = `/data/${route.route}`;
      }
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

  return (
    <header
      className={` ${IbmPlexSans.className} relative  border-b border-[#ECECEC]`}
    >
      <div
        className={`${
          !full ? "container" : "px-5"
        } py-2 flex items-center justify-between`}
      >
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

        <div className="flex items-center md:hidden ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary focus:outline-none"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        <div
          className={`flex items-center max-md:hidden relative lg:gap-12 md:gap-8 gap-4 text-lg ${IbmPlexSans.className}`}
        >
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              href="/data"
              active={active}
              item="Data"
            >
              <div className="grid grid-cols-2 gap-4 text-sm z-10 h-[150px] overflow-y-scroll">
                {sanityFolderTree?.map((folder, i) => (
                  <DataSubLinks key={`datasub-${i}`} folder={folder} />
                ))}
              </div>
            </MenuItem>
            {midNavData.map((navItem, index) => (
              <Link key={index} href={navItem.url}>
                {navItem.route}
              </Link>
            ))}
          </Menu>
        </div>
        <div>
          <Searchbox className="max-md:hidden" />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed h-screen w-screen z-10 bg-black/5"
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        >
          <div className="md:hidden absolute   bg-white shadow-lg p-4 z-10">
            <Menu setActive={setActive} className="flex flex-col">
              {/* <MenuItem setActive={setActive} active={active} item="Data">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {folderTree?.map((folder, i) => (
                  <DataSubLinks key={i} folder={folder} />
                ))}
              </div>
            </MenuItem> */}
              <ul className="space-y-3 h-[90vh] overflow-y-auto">
                {navData?.map((navItem, index) => (
                  <NavItem
                    key={index}
                    title={navItem.route}
                    url={navItem.url}
                    subpaths={navItem.subroutes}
                    loading={isLoading}
                    currentPath={""}
                  />
                ))}
                <div className="flex flex-col">
                  {/* {navData.map((navItem, index) => (
                  <Link
                    className="rounded-md w-full p-2 my-2 hover:bg-[#63ABFD4D]"
                    key={index}
                    href={navItem.url}
                  >
                    {navItem.title}
                  </Link>
                ))} */}
                </div>
              </ul>
            </Menu>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

function DataSubLinks({
  folder,
}: {
  folder: {
    route: string;
    url: string;
    subroutes: any[];
  };
}) {
  return (
    <div className="my-1">
      <Link href={`${folder.url}`}>{folder.route}</Link>
      {folder?.subroutes?.map((subroute, i) => (
        <DataSubLinks key={i} folder={subroute} />
      ))}
    </div>
  );
}

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={`relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-10 px-8 py-4 ${className}`}
    >
      {children}
    </nav>
  );
};
