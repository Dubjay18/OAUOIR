"use client";
import Link from "next/link";
import { IbmPlexSans, roboto, robotoSerif } from "@/lib/fonts";
import Image from "next/image";
import Searchbox from "./SearchBox";
import { useContext, useEffect, useState } from "react";
import { DataFolderContext } from "@/context/DataFolderContext";
import { MenuItem } from "./MenuItem";
import { Folder } from "../dashboard/Sidebar";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const Header = () => {
  //TODO: mobile menu
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const [active, setActive] = useState<string | null>(null);
  const navData = [
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
    <header
      className={` py-5 ${IbmPlexSans.className} border-b border-[#ECECEC]`}
    >
      <div className={" container py-2 flex items-center justify-between"}>
        <Link href={"/"}>
          <div className={" flex items-center gap-3"}>
            <Image
              src={"/oau_logo.svg"}
              alt={"OAU Logo"}
              width={40}
              height={40}
            />
            <h1
              className={`${IbmPlexSans.className} text-primary font-semibold text-xl`}
            >
              OAUIR
            </h1>
          </div>
        </Link>

        <div
          className={`flex items-center max-md:hidden lg:gap-12 md:gap-8 gap-4 text-lg ${roboto.className}`}
          onMouseLeave={() => setActive(null)}
        >
          <MenuItem setActive={setActive} active={active} item="Data">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {folders?.map((folder) => (
                <Link key={folder.id} href={`/dashboard/data/${folder.name}`}>
                  {folder.name}
                </Link>
              ))}
            </div>
          </MenuItem>
          {navData.map((navItem, index) => (
            <Link key={index} href={navItem.url}>
              {navItem.title}
            </Link>
          ))}
        </div>
        <div>
          <Searchbox className="max-w-32" />
        </div>
      </div>
    </header>
  );
};

export default Header;
