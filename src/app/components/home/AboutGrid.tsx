import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const AboutGrid = () => {
  return (
    <div className={"grid md:grid-cols-2 grid-cols-1 gap-5"}>
      <AboutCard
        title={"Comprehensive Data Analysis"}
        description={
          "Our team conducts thorough data analysis to support strategic planning and decision-making. We turn raw data into actionable insights that drive the college’s goals and initiatives."
        }
        icon={
          <Image
            src={"/home/data-analytics.svg"}
            alt={"Comprehensive Data Analysis"}
            width={20}
            height={20}
          />
        }
      />
      <AboutCard
        title={"Research & Evaluation"}
        description={
          "We lead research projects that assess program effectiveness, student outcomes, and institutional performance. Our findings contribute to continuous improvement and academic excellence."
        }
        icon={
          <Image
            src={"/home/microscope.svg"}
            alt={"Comprehensive Data Analysis"}
            width={20}
            height={20}
          />
        }
      />
      <AboutCard
        title={"Detailed Reporting"}
        description={
          "We provide detailed reports on key metrics, trends, and findings. Our reports are designed to inform stakeholders and guide policy development within the college."
        }
        icon={
          <Image
            src={"/home/report--data.svg"}
            alt={"Comprehensive Data Analysis"}
            width={20}
            height={20}
          />
        }
      />
      <AboutCard
        title={"Institutional Planning Support"}
        description={
          "We assist in institutional planning by providing data-driven insights and strategic recommendations. Our support helps align initiatives with the college’s mission and vision."
        }
        icon={
          <Image
            src={"/home/chart-custom.svg"}
            alt={"Comprehensive Data Analysis"}
            width={20}
            height={20}
          />
        }
      />
    </div>
  );
};

export default AboutGrid;

function AboutCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string | React.ReactNode;
}) {
  return (
    <Card className={"p-8 !rounded-none border-[#D1D1FA]"}>
      <div className={" p-4 w-fit"}>{icon}</div>
      <h3
        className={
          "text-primary text-xl font-semibold mt-7 pl-2 border-l-2 border-[#FFD700]"
        }
      >
        {title}
      </h3>
      <br />
      <p className={"text-cusGray max-w-prose"}>{description}</p>
    </Card>
  );
}
