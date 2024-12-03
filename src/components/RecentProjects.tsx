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


const RecentProjects = ({ pageData:content }: { pageData: any }) => {
    const pageData = content[0]?.section[3] || {};
  const { data, isFetching: projectFetching } = useGetProjectsQuery({
    page: "1",
    pageSize: "3",
  });
  const projects = data?.data || [];
  const projectHeading = pageData?.heading;
  const projectColoredHeading = pageData?.heading_secondaryColor;
  console.log(projects);

  return (
    <div className="py-20 max-w-screen-xl mx-auto">
      <h2 className="heading">
        {projectHeading}
        <span className="text-purple">
          {" "}
          {projectColoredHeading}
        </span>
      </h2>

      <div className="flex items-center justify-center p-4 gap-5 mt-10">
        {projects.map((item) => (
          <Modal key={uuidv4()}>
            <div className="flex flex-col md:w-1/3 relative bg-black-200 rounded-3xl">
              <ModalTrigger className="absolute size-full z-50 cursor-pointer"> </ModalTrigger>
              <div className="h-[28vh] flex items-start justify-center overflow-hidden mb-6">
                {/* <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image width={300} height={300} src="/bg.png" alt="bgimg" />
                </div> */}
                <Image
                  width={500}
                  height={500}
                  src={genrateMainURL(item?.cover?.url) ||
                    "/src/assets/tech/reactjs.png"
                  }
                  alt="cover"
                  className="z-10 bottom-0 w-full h-full object-fit rounded-t-2xl lg:rounded-t-2xl"
                />
              </div>
              <div
                className="flex items-start justify-center gap-2 flex-col p-6 pt-2 rounded-lg"
                key={item.id}
              >
                <h1 className="font-bold lg:text-xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-base lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {generateHTML(item?.description)}
                </p>

                <div className="w-full flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {item?.technologies?.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
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
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      See Details
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </div>
            </div>
            {/* </ModalTrigger> */}
            <ModalBody className="md:max-w-[70vw] max-h-[85vh] h-full flex items-centercontent-center">
              <ModalContent className="max-h-content !overflow-hidden">
                <div
                  className="lg:min-h-[32.5rem] h-full flex items-center gap-10 justify-between rounded-lg "
                  key={item.id}
                >
                  <div className="relative w-1/2 h-full flex items-start justify-center mb-10 overflow-y-scroll self-stretch">
                    <Image
                      width={500}
                      height={500}
                      src={
                        item?.images ? genrateMainURL(item?.images[0]?.url) : genrateMainURL(item?.cover?.url) ||
                        "/src/assets/tech/reactjs.png"
                      }
                      alt="cover"
                      className="z-10 !w-full"
                    />
                  </div>

                  <div className="w-1/2 space-y-5 pr-5 flex flex-col items-start justify-start self-start">
                    <h2 className="font-bold lg:text-2xl md:text-xl text-base">
                      {item?.title}
                    </h2>

                    <div className="flex items-center pb-2">
                      {item?.technologies?.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
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
                      className="lg:text-base lg:font-normal font-light text-base pb-2"
                      style={{
                        color: "#BEC1DD",
                        margin: "1vh 0",
                      }}
                    >
                      {generateHTML(item?.description)}
                    </p>
                    <Link className="flex justify-start items-center" href={item?.live_link?.link} target="_blank">
                      <p className="flex lg:text-xl md:text-xs text-sm text-purple brightness-150">
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
