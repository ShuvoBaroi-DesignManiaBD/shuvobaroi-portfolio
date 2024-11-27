// "use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import MyJourney from "@/components/MyJourney";
import Contact from "@/components/Contact";
import About from "@/components/About";
import SectionWrapper from "@/hoc/SectionWrapper";

// const Contact = dynamic(
//   () => import("@/components/Contact").then((m) => m.default),
//   { ssr: false }
// );
const Page = () => {

  // const collectSectionData = async (sectionName: string) => await (data as any).data[0].section.find((section: { section_name: string; }) => section.section_name === sectionName);
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-screen-xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <SectionWrapper idName="about"><About /></SectionWrapper>
        {/* <Grid /> */}
        <SectionWrapper idName="my-journey"><MyJourney /></SectionWrapper>
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
      </div>
      <div className="w-full">
        <SectionWrapper idName="contact"><Contact /></SectionWrapper>
        <Footer />
      </div>
    </main>
  );
};

export default Page;
