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
import Tech from "@/components/Tech";
import { getPageInfo, getSiteInfo } from "./actions/api";

// const Contact = dynamic(
//   () => import("@/components/Contact").then((m) => m.default),
//   { ssr: false }
// );
async function Page() {
  const pageData = await getPageInfo({ pageName: "Home" });
  const siteInfo = await getSiteInfo();
  console.log(pageData);
  
  // const collectSectionData = async (sectionName: string) => await (data as any).data[0].section.find((section: { section_name: string; }) => section.section_name === sectionName);
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-screen-xl w-full">
        <FloatingNav siteInfo={siteInfo}/>
        <Hero pageData={pageData}/>
        <SectionWrapper idName="about"><About pageData={pageData}/></SectionWrapper>
        {/* <Grid /> */}
        <SectionWrapper idName="my-journey"><MyJourney pageData={pageData}/></SectionWrapper>
        <RecentProjects pageData={pageData}/>
        <Clients pageData={pageData}/>
        {/* <Experience /> */}
        {/* <SectionWrapper idName="tech"><Tech></Tech></SectionWrapper> */}
        <Tech pageData={pageData}></Tech>
        <Approach pageData={pageData}/>
      </div>
      <div className="w-full">
        <SectionWrapper idName="contact"><Contact pageData={pageData}/></SectionWrapper>
        <Footer siteInfo={siteInfo}/>
      </div>
    </main>
  );
};

export default Page;
