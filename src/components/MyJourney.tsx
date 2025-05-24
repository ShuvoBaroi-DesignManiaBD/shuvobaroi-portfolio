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
import Image from "next/image";
import dynamic from "next/dynamic";
// import { useGetAPageQuery } from "@/redux/features/pages/pageApi";
// import envConfig from "@/config";
import { formatDate, generateHTML, genrateMainURL } from "@/utils/shared";

const VerticalTimeline = dynamic(
  () =>
    import("react-vertical-timeline-component").then((m) => m.VerticalTimeline),
  {
    ssr: true,
  }
);

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (m) => m.VerticalTimelineElement
    ),
  {
    ssr: true,
  }
);

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
      date={`${
        experience?.from_date ? formatDate(experience?.from_date) + " - " : ""
      } ${experience?.to_date ? formatDate(experience?.to_date) : "Present"}`}
      iconStyle={{ backgroundColor: "#0f1633" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Image
            width={50}
            height={50}
            src={
              `${genrateMainURL(experience.logo.url)}` ||
              "/src/assets/tech/reactjs.png"
            }
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

const MyJourney = ({ pageData }: any) => {
  const journeyData = pageData[0]?.section.find(
    (item: any) => item.section_name?.includes("Work") && item
  );
  console.log(
    "journeyData",
    journeyData,
    pageData[0]?.section,
    journeyData?.sub_heading,
    journeyData?.heading
  );

  return (
    <div className="py-16 sm:py-24 md:py-32 w-full">
      <motion.div variants={textVariant({ delay: 0.5 })}>
        <p className={`${styles.sectionSubText} text-center`}>
          {journeyData?.sub_heading || "What I have done so far"}
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {journeyData?.heading || "Work Experience."}
        </h2>
      </motion.div>

      {/* Responsive timeline container */}
      <div className="mt-10 sm:mt-20 flex flex-col w-full overflow-x-auto px-1 sm:px-0">
        <VerticalTimeline>
          {journeyData?.experience?.experience_item?.map(
            (experience: any, index: any) => (
              <Experience key={`experience-${index}`} experience={experience} />
            )
          )}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default MyJourney;
