import { robotoSerif } from "@/lib/fonts";
import Image from "next/image";
import Searchbox from "../global/SearchBox";

export default function Nav() {
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
          <Searchbox className="max-w-32" />
        </div>
      </div>
    </div>
  );
}
