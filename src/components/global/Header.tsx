"use client";
import Link from "next/link";
import { IbmPlexSans, roboto, robotoSerif } from "@/lib/fonts";
import Image from "next/image";
import Searchbox from "./SearchBox";
import { useContext, useEffect, useState } from "react";
import { DataFolderContext } from "@/context/DataFolderContext";
import { MenuItem } from "./MenuItem";
import { Folder } from "../dashboard/Sidebar";

const Header = () => {
  //TODO: mobile menu
  const { data: folders, isLoading, isError } = useContext(DataFolderContext);
  const [active, setActive] = useState<string | null>(null);
  const navData = [
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
      url: "/articles",
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
      url: "/requst-data",
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
              OAUOIR
            </h1>
          </div>
        </Link>

        <div
          className={`flex items-center max-md:hidden reltive lg:gap-12 md:gap-8 gap-4 text-lg ${IbmPlexSans.className}`}
        >
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              href="/data"
              active={active}
              item="Data"
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                {folders?.map((folder) => (
                  <Link key={folder.id} href={`/data/${folder.name}`}>
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
          </Menu>
        </div>
        <div>
          <Searchbox className="max-w-32" />
        </div>
      </div>
    </header>
  );
};

export default Header;
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-10 px-8 py-6 "
    >
      {children}
    </nav>
  );
};
