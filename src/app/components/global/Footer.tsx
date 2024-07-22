import Image from "next/image";
import Link from "next/link";
import { robotoSerif } from "@/lib/fonts";

const Footer = () => {
  const footerLinks = [
    {
      title: "Main menu",
      links: [
        {
          title: "About",
          href: "/",
        },
        {
          title: "Menus",
          href: "/",
        },
        {
          title: "Events",
          href: "/",
        },
        {
          title: "Services",
          href: "/",
        },
      ],
    },
    {
      title: "Information",
      links: [
        {
          title: "Contact",
          href: "/",
        },
        {
          title: "FAQs",
          href: "/",
        },
        {
          title: "Self Service",
          href: "/",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          title: "Privacy Policy",
          href: "/",
        },
        {
          title: "Terms & Conditions",
          href: "/",
        },
      ],
    },
  ];

  return (
    <footer className={"mt-40 container"}>
      <div
        className={
          "flex max-md:flex-col max-w-md: gap-10 justify-between lg:gap-32"
        }
      >
        <div>
          <div className={"flex gap-4 items-center"}>
            <Image
              src={"/oau_logo.svg"}
              alt={"oau logo"}
              width={30}
              height={30}
            />
            <h4
              className={`text-xl font-medium text-primary ${robotoSerif.className}`}
            >
              OAUOIR
            </h4>
          </div>
          <p className={"text-cusGray font-semibold max-w-md mt-5"}>
            Advancing Knowledge Through Research
          </p>
        </div>
        <div className={"grid md:grid-cols-3 grid-cols-1  lg:gap-48 gap-20"}>
          {footerLinks.map((footerLink, index) => (
            <div key={index}>
              <p className={"font-semibold text-[#1e1e1e] text-lg mb-4"}>
                {footerLink.title}
              </p>
              <div className={"flex flex-col"}>
                {footerLink.links.map((link, index) => (
                  <Link
                    href={link.href}
                    key={index}
                    className={"text-cusGray font-semibold mb-4"}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={"flex  max-sm:flex-col  items-center justify-between py-7"}
      >
        <div className={"flex items-center gap-3"}>
          <div
            className={
              "bg-primary-foreground rounded-full p-3 w-fit flex items-center justify-center"
            }
          >
            <Image
              src={"/socials/facebook.svg"}
              alt={"facebook"}
              width={10}
              height={10}
            />
          </div>
          <div
            className={
              "bg-primary-foreground rounded-full p-3 w-fit flex items-center justify-center"
            }
          >
            <Image
              src={"/socials/instagram.svg"}
              alt={"facebook"}
              width={15}
              height={15}
            />
          </div>
        </div>
        <p className={"text-[#828282]"}>Copyright © 2024 OAUIR</p>

        <p className={"text-[#828282]"}>Terms & Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
