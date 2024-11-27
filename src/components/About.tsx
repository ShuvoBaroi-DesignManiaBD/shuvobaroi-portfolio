"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import {Tilt} from "react-tilt";
import { fadeIn, textVariant } from "../utils/motion";
import Image from "next/image";
import { styles } from "@/lib/styles";
import dynamic from "next/dynamic";
import { useGetAPageQuery } from "@/redux/features/pages/pageApi";
import envConfig from "@/config";
import { AboutMeSkeleton } from "./skeletons/AboutMeSkeleton";

// const Tilt = dynamic(() => import("react-tilt").then((m) => m.Tilt));
export const ServiceCard = ({ index, content = null }: any) => {
  console.log("content", content);
  
  const imageUrl =
    content?.icon_or_image?.url && typeof content.icon_or_image.url === "string"
      ? `${envConfig.baseApi?.split('/api')[0]}${content.icon_or_image.url}`
      : "/src/assets/web.png";

  return (
    <>
      {content ? (
        <Tilt className="xs:w-[250px] w-full">
          <motion.div
            variants={fadeIn({
              direction: "right",
              type: "spring",
              delay: index * 0.5,
              duration: 0.75,
            })}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            >
              <Image
                width={64}
                height={64}
                src={imageUrl}
                alt={content?.title || "web-development"}
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-white text-[20px] font-bold text-center">
                {content?.title || "Web Developer"}
              </h3>
            </div>
          </motion.div>
        </Tilt>
      ):<p>Loading...</p>}
    </>
  );
};


const About = () => {
  const {data,isFetching} = useGetAPageQuery({pageName:"home"});
  const aboutData = data?.data[0]?.section[1];
  return (
    <div>
      {!isFetching ? <>
      
      <motion.div
        variants={textVariant({ delay: 0.5 })}
        className="!text-white"
      >
        <p className={styles.sectionSubText}>{aboutData?.sub_heading || "Introduction"}</p>
        <h2 className={styles.sectionHeadText}>{aboutData?.heading || "About Me"}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn({ direction: "", type: "", delay: 0.1, duration: 1 })}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-white"
      >
        {aboutData && aboutData?.description[0].children[0].text}
      </motion.p>

      <div className="mt-20 flex gap-10">
        {aboutData && aboutData?.sub_section.map((service, index) => (
          <ServiceCard key={service.title} index={index} content={{...service}} />
        ))}
      </div>
      </>: <AboutMeSkeleton></AboutMeSkeleton>}
    </div>
  );
};

export default About;
