"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import {
//   // VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { textVariant } from "../utils/motion";
import { styles } from "@/lib/styles";
import { experiences } from "@/constants";
import Image from "next/image";
import SectionWrapper from "@/hoc/SectionWrapper";
import dynamic from "next/dynamic";
import { useGetAPageQuery } from "@/redux/features/pages/pageApi";
import envConfig from "@/config";
import Link from "next/link";
import { generateUUID } from "three/src/math/MathUtils.js";

const VerticalTimeline = dynamic(() => import("react-vertical-timeline-component").then((m) => m.VerticalTimeline), {
  ssr: true,
});

const VerticalTimelineElement = dynamic(() => import("react-vertical-timeline-component").then((m) => m.VerticalTimelineElement), {
  ssr: true,
})

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Add the ordinal suffix to the day
  const ordinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th"; // 11th to 20th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
}

function generateHTML(description) {
  return description.map((item) => {
    if (item.type === "paragraph") {
      const paragraphContent = item.children.map((child, index) => {
        if (child.type === "text") {
          return <span key={index}>{child.text}</span>;
        } else if (child.type === "link") {
          const linkText = child.children.map((linkChild, linkIndex) => {
            if (linkChild.bold && linkChild.underline) {
              return (
                <strong key={linkIndex}>
                  <u>{linkChild.text}</u>
                </strong>
              );
            } else if (linkChild.bold) {
              return <strong key={linkIndex}>{linkChild.text}</strong>;
            } else if (linkChild.underline) {
              return <u key={linkIndex}>{linkChild.text}</u>;
            }
            return linkChild.text;
          });

          return (
            <Link key={index} href={child.url} target="_blank" rel="noopener noreferrer" className="text-purple">
              {linkText}
            </Link>
          );
        }
        return null;
      });

      return (
        <p key={item.id}>
          {paragraphContent}
          <br />
        </p>
      );
    }
    return null;
  });
}


const Experience = ({ experience }: any) => {
  const paragraphs = generateHTML(experience.description);
  console.log(experience, paragraphs);
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={`${experience?.from_date ? formatDate(experience?.from_date)+" - " : ""} ${experience?.to_date ? formatDate(experience?.to_date) : "Present"}`}
      iconStyle={{ backgroundColor: "#0f1633" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Image
            width={50}
            height={50}
            src={`${envConfig.baseApi?.split("/api")[0]}${experience.logo.url}` || "/src/assets/tech/reactjs.png"}
            alt={experience.company}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.role}</h3>
        <p
          className="text-[#a0b3ff] text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company}
        </p>
      </div>
      {/* <p>{experience?.description[0].children.reduce((acc: any, curr: any) => curr.type === "text" ? acc + curr.text : `${acc} ${<a href={curr.url} target="_blank">{curr.children[0].text}</a>}`, "")}</p> */}
      <div>{paragraphs}</div>
      {/* <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul> */}
    </VerticalTimelineElement>
  );
};

const MyJourney = () => {
  const {data,isFetching} = useGetAPageQuery({pageName:"home"});
  const journeyData = data?.data[0]?.section[2];
  return (<div className="py-32">
      <motion.div variants={textVariant({ delay: 0.5 })}>
        <p className={`${styles.sectionSubText} text-center`}>
          {journeyData?.sub_heading || "What I have done so far"}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {journeyData?.heading || "Work Experience."}
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {journeyData?.experience?.experience_item?.map((experience, index) => (
            <Experience key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default MyJourney;
