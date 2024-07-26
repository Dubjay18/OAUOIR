"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/lib/fonts";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar() {
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
      url: "/about",
      subpaths: [
        {
          title: "Data 1",
          url: "/data/1",
        },
        {
          title: "Data 2",
          url: "/data/2",
          subpaths: [
            {
              title: "Data 2.1",
              url: "/data/2/1",
            },
            {
              title: "Data 2.2",
              url: "/data/2/2",
            },
          ],
        },
      ],
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
    <aside className="w-64 shadow p-4">
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
      {subpaths ? (
        <Collapsible>
          <CollapsibleTrigger
            onClick={toggleOpen}
            className="rounded-md w-full p-2 my-2 hover:bg-[#63ABFD4D]"
          >
            <span
              className={`flex items-center ${!icon && "px-4"} gap-5 ${poppins.className}`}
            >
              {icon && icon}
              {title}
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
            <CollapsibleContent>
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
