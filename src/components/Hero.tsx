import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "./Typewriter";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-between relative my-20 z-10">
        <div className="md:max-w-[60%] flex flex-col items-start justify-center text-start space-y-6">
          <p className="uppercase tracking-widest text-xs text-start text-blue-100 max-w-80">
            Full stack Developer
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          {/* <TextGenerateEffect
            words="Transforming Concepts into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          /> */}

          {/* <TextGenerateEffect
            words="Hi! I'm Shuvo Baroi."
            // className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl"
            className="text-start text-[40px] md:text-5xl lg:text-6xl"
          /> */}
          <h1 className="text-6xl font-bold">Hi! I am Shuvo Baroi. {<Typewriter
            baseText="I am specialized in"
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
          />} </h1>
          
          {/* <p>A Next.js Developer based in Bangladesh.</p> */}
          <div className="flex gap-3">
            <Link href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
                otherClasses="bg-transparent !text-base"
              />
            </Link>
            <Link href="#projects">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </Link>
          </div>
        </div>
        <Image
          src="/shuvo_baroi.png"
          alt="hero"
          width={450}
          height={450}
          className=""
        />
      </div>
    </div>
  );
};

export default Hero;
