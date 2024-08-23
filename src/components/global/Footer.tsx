import Image from "next/image";
import Link from "next/link";
import { robotoSerif } from "@/lib/fonts";

type Tfootlinks = {
  title: string;
  links: {
    title?: string;
    href: string;
    icon?: string;
  }[];
};
const Footer = () => {
  const footerLinks: Tfootlinks[] = [
    {
      title: "Contact Us",
      links: [
        {
          title: "help@oauir.edu.ng",
          href: "mailto:help@oauir.edu.ng",
        },
        {
          title: "+ 123 456 7890",
          href: "tel:+1234567890",
        },
      ],
    },

    {
      title: "Social Media",
      links: [
        {
          icon: "/socials/facebook.svg",
          href: "/",
        },
        {
          icon: "/socials/instagram.svg",
          href: "/",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#1E1E1E] mt-40 py-10">
      <footer className={" container"}>
        <div
          className={
            "flex max-md:flex-col max-w-md:gap-10 justify-between lg:gap-32"
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
                className={`text-xl font-medium text-[#FECD3F] ${robotoSerif.className}`}
              >
                OAUOIR
              </h4>
            </div>
            <p className={"text-[#F5F5F5] font-normal max-w-md mt-5"}>
              Advancing Knowledge Through Research
            </p>
          </div>
          <div className={"flex justify-between md:w-1/2"}>
            {footerLinks.map((footerLink, index) => (
              <div key={index}>
                <p className={"font-semibold text-[#FECD3F] md:text-lg mb-4"}>
                  {footerLink.title}
                </p>
                {footerLink.title == "Social Media" ? (
                  <>
                    <div className={"flex gap-4 items-center"}>
                      {footerLink.links.map((link, index) => (
                        <>
                          {link.icon && (
                            <div className="flex  items-center justify-center p-2 rounded-full bg-[#FFF7CC]">
                              <Image
                                key={index}
                                src={link?.icon}
                                alt={"facebook"}
                                className={"cursor-pointer max-w-4 max-h-4"}
                                width={30}
                                height={30}
                              />
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={"flex flex-col"}>
                    {footerLink.links.map((link, index) => (
                      <Link
                        href={link.href}
                        key={index}
                        className={"text-[#F5F5F5] font-normal mb-4"}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className={"flex  max-sm:flex-col  items-center justify-between py-7"}
        >
          <p className={"text-white"}>Copyright © 2024 OAUIR</p>

          <p className={"text-white"}>Terms & Privacy Policy</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
