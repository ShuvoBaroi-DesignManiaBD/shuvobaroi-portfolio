/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
// import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "./Typewriter";
// import { useGetAPageQuery } from "@/redux/features/pages/pageApi";
import { HeroSkeleton } from "./skeletons/HeroSkeleton";
// import { useEffect } from "react";

function Hero({ pageData }: any) {
  // const {data,isFetching} = useGetAPageQuery({pageName:"home"});
  const heroData = pageData[0]?.section.find(
    (item: any) => item.section_name?.includes("Hero") && item
  ) || {};
  console.log("data", heroData);
  // useEffect(() => {

  // },[data])
  return (
    <div className="pb-20 pt-36 relative w-full">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-[60vh] md:h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[40vh] md:h-[80vh] w-[80vw] md:w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight
          className="left-10 md:left-80 top-28 h-[40vh] md:h-[80vh] w-[80vw] md:w-[50vw]"
          fill="blue"
        />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-[60vh] md:h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {!pageData ? (
        <HeroSkeleton></HeroSkeleton>
      ) : (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center relative my-10 md:my-20 z-10 w-full gap-8 md:gap-0">
          <div className="w-full md:max-w-[60%] flex flex-col items-start justify-center text-start space-y-6 px-2 md:px-0">
            <p className="uppercase tracking-widest text-xs text-start text-blue-100 max-w-80">
              {heroData?.sub_heading || "Full Stack Web Developer"}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              {heroData?.heading || "Hi! I'm Shuvo Baroi."}{" "}
              {
                <Typewriter
                  baseText={"I am specialized in"}
                  dynamicWords={[
                    "MERN Stack.",
                    "Frontend Development.",
                    "Backend Development.",
                    "React.",
                    "SQL & NoSQL Databases.",
                    "Web Design.",
                    "Wordpress.",
                  ]}
                  dynamicWordColor="#5577ff"
                  speed={100}
                  wordChangeDelay={1000}
                />
              }{" "}
            </h1>

            {/* <p>A Next.js Developer based in Bangladesh.</p> */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href={
                  heroData?.buttons?.[0]?.link
                    ? `https://www.freelancer.com/u/shuvobaroi30`
                    // ? `/${heroData?.buttons[0]?.link}`
                    : `https://www.freelancer.com/u/shuvobaroi30`
                }
                target={"_blank"}
                className="w-full sm:w-auto"
              >
                <MagicButton
                  title={heroData?.buttons?.[0]?.text || "View experience"}
                  icon={<FaLocationArrow />}
                  position="right"
                  otherClasses="bg-transparent !text-base w-full"
                />
              </Link>
              <Link
                href={
                  heroData?.buttons?.[1]?.link
                    ? `tel:${heroData.buttons[1].link}`
                    : "tel:+8801612242295"
                }
                className="w-full sm:w-auto"
              >
                <MagicButton
                  title={heroData?.buttons?.[1]?.text || "Contact on WhatsApp"}
                  icon={<FaLocationArrow />}
                  position="right"
                  otherClasses="w-full"
                />
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center md:justify-end mb-8 md:mb-0">
            <Image
              src="/shuvo_baroi.png"
              alt="hero"
              width={320}
              height={320}
              className="w-40 h-40 sm:w-60 sm:h-60 md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
