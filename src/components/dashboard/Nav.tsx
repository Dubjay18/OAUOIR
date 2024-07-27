import { robotoSerif } from "@/lib/fonts";
import Image from "next/image";
import { Button } from "../ui/button";
import Searchbox from "../global/SearchBox";
import { Menu } from "lucide-react";

export default function Nav({
  toggleMobileNav,
}: {
  toggleMobileNav?: () => void;
}) {
  return (
    <div className="">
      <div className="flex items-center justify-between shadow py-4 px-5">
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

          <Searchbox className="max-w-32 max-md:hidden" />
        </div>
      </div>
    </div>
  );
}
