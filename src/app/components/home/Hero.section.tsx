import Image from "next/image";
import { robotoSlab } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className={"container flex max-md:flex-col  justify-between mt-20"}>
      <div>
        <Image
          src={"/home/landscape.png"}
          alt={"OAU_landscape"}
          className={"max-md:max-w-md max-md:mx-auto max-sm:max-w-sm"}
          height={600}
          width={600}
        />
      </div>
      <div className={"max-w-xl max-md:mt-5"}>
        <p className="text-lg text-semibold max-md:text-center">Introduction</p>
        <h3
          className={`text-primary md:text-4xl text-2xl max-md:text-center ${robotoSlab.className}`}
        >
          Advancing Knowledge Through Research
        </h3>
        <p
          className={
            "text-cusGray mt-3 font-medium max-md:text-center text-lg max-md:mb-10"
          }
        >
          Explore a world of research data at OAU&apos;s Institute of Research &
          Data Analytics. We transform complex datasets into user-friendly
          resources, fueling innovation and public understanding.
        </p>
        <br />
        <div className="flex items-center gap-6 max-md:justify-evenly ">
          <Button variant={"outline"} size={"lg"}>
            Go to Dashboard
          </Button>
          <Button variant={"outline"} size={"lg"}>
            Quick Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
