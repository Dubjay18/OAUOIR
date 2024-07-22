import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { roboto, robotoSerif } from "@/lib/fonts";
import Image from "next/image";

const Header = () => {
  return (
    <header className={" pt-5"}>
      <div className={" container py-2 flex items-center justify-between"}>
        <div className={" flex items-center gap-3"}>
          <Image
            src={"/oau_logo.svg"}
            alt={"OAU Logo"}
            width={40}
            height={40}
          />
          <h1
            className={`${robotoSerif.className} text-primary font-semibold text-xl`}
          >
            OAUIR
          </h1>
        </div>
        <div
          className={`flex items-center max-md:hidden lg:gap-8 gap-4 ${roboto.className}`}
        >
          <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
            Home
          </Link>
          <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
            Data
          </Link>
          <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
            Request Data
          </Link>
        </div>
        <div>
          <Button>
            <Search className={"text-white"} size={24} />{" "}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
