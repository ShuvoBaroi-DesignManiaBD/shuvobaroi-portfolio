// "use client";
import { technologies } from "@/constants";
import React from "react";
import BallCanvas from "./canvas/Ball";


const Tech = ({pageData}:any) => {
  // const {data,isFetching} = useGetAPageQuery({pageName:"home"});
  
  const techData = pageData[0]?.section[5] || {};
  return (
    <div className="pb-20 w-full space-y-20">
      <h2 className="heading">
        My <span className="text-purple">Tech Stacks</span>
      </h2>
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology?.name}>
          <BallCanvas icon={technology?.icon} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Tech;
