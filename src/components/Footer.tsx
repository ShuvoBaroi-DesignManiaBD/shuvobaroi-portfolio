/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import Image from "next/image";
import envConfig from "@/config";
import Link from "next/link";
import { Key } from "react";

const Footer = ({siteInfo}:{siteInfo:any}) => {
  const footerData = siteInfo?.data?.global_sections[1];
  console.log(footerData?.heading?.split("your").reduce((curr: string,acc: any[]) => curr === "your" ? acc.join("<span className='text-purple'>your</span>") : acc + curr, ""));
  
  return (
    <footer className="max-w-screen-xl mx-auto pt-20 pb-10 z-0 overflow-hidden relative" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 bottom-0 h-full  z-0">
        <Image
          width={600}
          height={600}
          src="/footer-grid.svg"
          alt="grid"
          className="w-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h2 className="heading lg:max-w-[45vw]">
          {/* {footerData?.heading?.split(" ").reduce((curr: string,acc: string) => curr === "your" ? acc.join(<span className='text-purple'>your</span>) : acc + ` ${curr}`, "")} */}
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h2>
        <p className="text-white-200 md:mt-10 my-5 text-center">
        {footerData?.description || "Contact me today to learn more about my services and how I can help you take your digital presence to the next level."}
        </p>
        <a href={footerData?.btn_link || "mailto:contact.shuvobaroi@gmail.com"}>
          <MagicButton
            title={footerData?.btn_text || "Let's get in touch"}
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Shuvo Baroi
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {footerData.social_media.map((info: { name: Key | null | undefined; link: any; logo: { url: string | number; }; }) => (
            <div
              key={info.name}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Link href={info?.link || "#"}>
              <Image src={envConfig?.baseApi?.split('/api')[0] + info.logo?.url} alt="icons" width={20} height={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
