import React from 'react';
import Image from "next/image";
import {Roboto, Roboto_Serif} from "next/font/google";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

const robotoSerif = Roboto_Serif({
        weight: ["400"],
        subsets: ["latin"]
    }
);
const roboto = Roboto({
    weight: ["400"],
    subsets: ["latin"]

})

const Header = () => {
    return (
        <header className={" "}>
            <div className={"bg-[#1e1e1e] w-full py-2 "}>

                <div className={"text-white flex items-center justify-between container "}>
                    <div className={" flex items-center gap-3"}>
                        <Image src={"/oau_logo.svg"} alt={"OAU Logo"} width={20} height={20}/>
                        <h1 className={robotoSerif.className}>OBAFEMI AWOLOWO UNIVERSITY</h1>
                    </div>
                    <Link href={"/"} className={`text-white underline ${roboto.className}`}>
                        OAUIFE.EDU.NG
                    </Link>
                </div>
            </div>
            <div className={" container py-2 flex items-center justify-between"}>
                <h1 className={"text-primary md:text-3xl text-xl font-medium"}>Office of Institutional <br/> Research &
                    Analytics
                </h1>
                <div className={"flex items-center lg:gap-8 gap-4"}>
                    <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
                        Home
                    </Link>
                    <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
                        Articles
                    </Link>
                    <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
                        Data
                    </Link> <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
                    References
                </Link>
                    <Link href={"/"} className={"text-[#1e1e1e] font-normal"}>
                        FAQs
                    </Link>

                </div>
                <div>
                    <Button><Search className={"text-white"} size={24}/> </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;