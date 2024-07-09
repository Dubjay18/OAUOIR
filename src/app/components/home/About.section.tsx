import React from 'react';
import {robotoSlab} from "@/lib/fonts";
import AboutGrid from "@/app/components/home/AboutGrid";

const AboutSection = () => {
    return (
        <div className={"container mt-20"}>
            <h3 className={`text-primary md:text-4xl text-2xl ${robotoSlab.className}`}>
                What We Do
            </h3>
            <p className={" max-w-prose text-cusGray text-lg mt-5"}>
                We support the college&apos;s mission through data analysis, impactful research, detailed reporting, and
                strategic planning
            </p>
            <br/>
            <AboutGrid/>
        </div>
    );
};

export default AboutSection;