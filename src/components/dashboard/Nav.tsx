import { IbmPlexSans, robotoSerif } from "@/lib/fonts";
import Image from "next/image";
import { Button } from "../ui/button";
import Searchbox from "../global/SearchBox";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Nav({
  toggleMobileNav,
}: {
  toggleMobileNav?: () => void;
}) {
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
      url: "/facts",
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
      url: "/dashboard/requst-data",
    },
  ];

  return (
    <div className="sticky top-0 w-full bg-white border-b border-[#ECECEC] z-20">
      <div className="flex items-center justify-between shadow py-4 px-5">
        <Link href={"/"} className={" flex items-center gap-3"}>
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
        </Link>
        <div
          className={`flex items-center max-md:hidden lg:gap-12 md:gap-8 gap-4 text-lg ${IbmPlexSans.className}`}
        >
          {navData.map((navItem, index) => (
            <Link key={index} href={navItem.url}>
              {navItem.title}
            </Link>
          ))}
        </div>
        <div>
          {toggleMobileNav && (
            <Button
              variant={"ghost"}
              className="md:hidden"
              onClick={toggleMobileNav}
            >
              <Menu size={24} />
            </Button>
          )}

          <Searchbox className=" max-md:hidden" />
        </div>
      </div>
    </div>
  );
}
