/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { companies } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { useGetTestimonialsQuery } from "@/redux/features/testimonials/testimonialApi";
import { useGetAPageQuery } from "@/redux/features/pages/pageApi";

const Clients = ({ pageData }: any) => {
  const { data, isFetching: testimonialFetching } = useGetTestimonialsQuery({
    page: "1",
    pageSize: "6",
  });
  const testimonials = data?.data || [];

  // const {data:pageData,isFetching} = useGetAPageQuery({pageName:"home"});
  const sectionInfo = pageData[0]?.section.find(
    (item: any) => item.section_name?.includes("Testimonials") && item
  ) || {};;
  return (
    <section id="testimonials" className="py-20">
      <h2 className="heading">
        {sectionInfo?.heading}
        <span className="text-purple">
          {" "}
          {sectionInfo?.heading_secondaryColor}
        </span>
      </h2>

      <div className="flex flex-col items-center mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        {/* <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img
                  src={company.img}
                  alt={company.name}
                  className="md:w-10 w-5"
                />
                <img
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Clients;
