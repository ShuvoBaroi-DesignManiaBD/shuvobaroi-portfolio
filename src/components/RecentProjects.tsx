"use client";

import { FaLocationArrow } from "react-icons/fa6";

// import { projects } from "@/data";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/Animated-Modal";
import { useGetProjectsQuery } from "@/redux/features/projects/projectApi";
import { useGetAPageQuery } from "@/redux/features/pages/pageApi";
import { generateHTML, genrateMainURL } from "@/utils/shared";
import Link from "next/link";

const RecentProjects = ({ pageData: content }: { pageData: any }) => {
  const pageData =
    content[0]?.section.find(
      (item: any) => item.section_name?.includes("Projects") && item
    ) || {};
  const { data, isFetching: projectFetching } = useGetProjectsQuery({
    page: "1",
    pageSize: "3",
  });
  const projects = data?.data || [];
  const projectHeading = pageData?.heading;
  const projectColoredHeading = pageData?.heading_secondaryColor;
  console.log(projects);

  return (
    <div className="py-10 sm:py-20 max-w-screen-xl mx-auto w-full">
      <h2 className="heading">
        {projectHeading}
        <span className="text-purple"> {projectColoredHeading}</span>
      </h2>

      {/* Responsive project cards */}
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center justify-center p-2 sm:p-4 gap-6 md:gap-5 mt-8 md:mt-10 w-full">
        {projects.map((item) => (
          <Modal key={uuidv4()}>
            <div className="flex flex-col w-full md:w-[340px] lg:w-1/3 relative bg-black-200 rounded-3xl min-w-[260px] max-w-full">
              <ModalTrigger className="absolute size-full z-50 cursor-pointer">
                {" "}
              </ModalTrigger>
              <div className="h-[180px] sm:h-[220px] md:h-[28vh] flex items-start justify-center overflow-hidden mb-6">
                <Image
                  width={500}
                  height={500}
                  src={
                    genrateMainURL(item?.cover?.url) ||
                    "/src/assets/tech/reactjs.png"
                  }
                  alt="cover"
                  className="z-10 bottom-0 w-full h-full object-cover rounded-t-2xl lg:rounded-t-2xl"
                />
              </div>
              <div
                className="flex items-start justify-center gap-2 flex-col p-4 sm:p-6 pt-2 rounded-lg"
                key={item.id}
              >
                <h1 className="font-bold text-base md:text-xl line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="text-sm md:text-base font-light md:font-normal line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {generateHTML(item?.description)}
                </p>

                <div className="w-full flex flex-wrap items-center justify-between mt-5 md:mt-7 mb-2 md:mb-3 gap-2">
                  <div className="flex items-center">
                    {item?.technologies?.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black w-8 h-8 md:w-10 md:h-10 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <Image
                          width={300}
                          height={300}
                          src={
                            `${genrateMainURL(icon?.logo?.url)}` ||
                            "/src/assets/tech/reactjs.png"
                          }
                          alt="icon5"
                          className="p-2"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="flex text-sm md:text-xs lg:text-xl text-purple">
                      See Details
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </div>
            </div>
            {/* Modal content responsive */}
            <ModalBody className="w-full max-w-[98vw] md:max-w-[70vw] max-h-[85vh] overflow-y-auto h-full flex items-center content-center p-2 sm:p-4">
              <ModalContent className="max-h-content !overflow-y-auto">
                <div
                  className="flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between rounded-lg w-full"
                  key={item.id}
                >
                  <div className="relative w-full md:w-1/2 h-full flex items-start justify-center mb-6 md:mb-10 overflow-y-scroll self-stretch">
                    <Image
                      width={500}
                      height={500}
                      src={
                        item?.images
                          ? genrateMainURL(item?.images[0]?.url)
                          : genrateMainURL(item?.cover?.url) ||
                            "/src/assets/tech/reactjs.png"
                      }
                      alt="cover"
                      className="z-10 w-full object-cover"
                    />
                  </div>

                  <div className="w-full md:w-1/2 space-y-4 md:space-y-5 pr-0 md:pr-5 flex flex-col items-start justify-start self-start">
                    <h2 className="font-bold text-base md:text-xl lg:text-2xl">
                      {item?.title}
                    </h2>

                    <div className="flex items-center pb-2 flex-wrap gap-2">
                      {item?.technologies?.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black w-8 h-8 md:w-10 md:h-10 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          <Image
                            width={300}
                            height={300}
                            src={
                              `${genrateMainURL(icon?.logo?.url)}` ||
                              "/src/assets/tech/reactjs.png"
                            }
                            alt="icon5"
                            className="p-2"
                          />
                        </div>
                      ))}
                    </div>
                    <p
                      className="text-base md:text-base lg:font-normal font-light pb-2"
                      style={{
                        color: "#BEC1DD",
                        margin: "1vh 0",
                      }}
                    >
                      {generateHTML(item?.description)}
                    </p>
                    <Link
                      className="flex justify-start items-center"
                      href={item?.live_link?.link}
                      target="_blank"
                    >
                      <p className="flex text-sm md:text-xs lg:text-xl text-purple brightness-150">
                        Check Live Site
                      </p>
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </Link>
                  </div>
                </div>
              </ModalContent>
            </ModalBody>
          </Modal>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
