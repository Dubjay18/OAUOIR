"use client";
import React, { useEffect, useState } from "react";
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

interface NavItemProps {
  title: string;
  url: string;
  subpaths?: NavItemProps[];
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
  const [folders, setFolders] = useState<any[]>([]);

  useEffect(() => {
    const getFolders = async () => {
      const data = await fetchFolders();
      setFolders(data as any[]);
      console.log("data", data);
    };

    getFolders();
  }, []);

  const buildFolderTree = (
    parentId: string | null = null,
    accumulatedPath: string = "/dashboard/data",
  ): NavItemProps[] => {
    return folders
      .filter((folder) => folder.parent_id === parentId)
      .map((folder) => {
        const currentPath = `${accumulatedPath}/${folder.name}`;
        return {
          title: folder.name,
          url: currentPath,
          subpaths: buildFolderTree(folder.id, currentPath),
        };
      });
  };
  const folderTree = buildFolderTree();

  const navData = [
    {
      icon: (
        <Image
          src="/dashboard/icons/home.svg"
          width={24}
          height={24}
          alt="dashboard_home"
        />
      ),
      title: "Home",
      url: "/",
    },
    {
      icon: (
        <Image
          src="/dashboard/icons/data.svg"
          width={24}
          height={24}
          alt="dashboard_data"
        />
      ),
      title: "Data",
      url: "/dashboard/data",
      subpaths: folderTree,
    },
    {
      icon: (
        <Image
          src="/dashboard/icons/facts.svg"
          width={24}
          height={24}
          alt="dashboard_facts"
        />
      ),
      title: "Facts",
      url: "/contact",
    },
    {
      icon: (
        <Image
          src="/dashboard/icons/document.svg"
          width={24}
          height={24}
          alt="dashboard_services"
        />
      ),
      title: "References",
      url: "/services",
    },
    {
      icon: (
        <Image
          src="/dashboard/icons/blog.svg"
          width={24}
          height={24}
          alt="blog"
        />
      ),
      title: "Articles",
      url: "/services",
    },
    {
      icon: (
        <Image
          src="/dashboard/icons/question.svg"
          width={24}
          height={24}
          alt="request_data"
        />
      ),
      title: "Request Data",
      url: "/services",
    },
  ];
  return (
    <aside
      className={`w-64 bg-white shadow p-4 duration-300 transition-all ${hidden && "-translate-x-[300px] w-0 h-0 hidden"}`}
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
}: {
  title: string;
  url: string;
  subpaths?: { title: string; url: string; subpaths?: any }[];
  icon?: any;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      {subpaths && subpaths.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger
            onClick={toggleOpen}
            className="rounded-md w-full p-2 my-2 hover:bg-[#63ABFD4D]"
          >
            <span
              className={`flex items-center ${!icon && "px-4"} gap-5 ${poppins.className}`}
            >
              {icon && icon}
              <Link href={url}> {title}</Link>
              {isOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 ml-auto mr-3" />
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 ml-auto mr-3" />
                </>
              )}
            </span>
          </CollapsibleTrigger>
          {isOpen && (
            <CollapsibleContent className="ml-4">
              <ul>
                {subpaths.map((subpath, index) => (
                  <NavItem
                    key={index}
                    title={subpath.title}
                    url={subpath.url}
                    subpaths={subpath.subpaths}
                  />
                ))}
              </ul>
            </CollapsibleContent>
          )}
        </Collapsible>
      ) : (
        <div className="">
          <div className="rounded-md w-full p-2 my-5  hover:bg-[#63ABFD4D]">
            <Link
              href={url}
              className={`flex items-center ${!icon && "px-4"} gap-5 ${poppins.className}`}
            >
              {icon}
              {title}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
