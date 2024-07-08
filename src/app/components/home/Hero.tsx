import React from 'react';
import Image from "next/image";

const Hero = () => {
    return (
        <div className={"container flex max-md:flex-col items-center justify-between mt-20"}>
            <div className={"max-w-lg"}>
                <h3 className={"text-primary md:text-4xl text-2xl"}>
                    Advancing Knowledge Through Research
                </h3>
                <p className={"text-cusGray mt-2 font-medium text-lg max-md:mb-10"}>
                    Explore a world of research data at OAU&apos;s Institute of Research & Data Analytics. We transform
                    complex datasets into user-friendly resources, fueling innovation and public understanding.
                </p>
            </div>
            <div>
                <Image src={"/home/landscape.png"} alt={"OAU_landscape"} className={"max-md:max-w-md"} height={600}
                       width={600}/>
            </div>
        </div>
    );
};

export default Hero;