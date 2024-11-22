"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
// import Contact from "@/components/Contact";
import dynamic from "next/dynamic";
import MyJourney from "@/components/MyJourney";
import { StarsCanvas } from "@/components/canvas";
import About from "@/components/About";

const Contact = dynamic(
  () => import("@/components/Contact").then((m) => m.default),
  { ssr: false }
);
const Page = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-screen-xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <About />
        <Grid />
        <MyJourney />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
      </div>
      <div className="w-full">
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Page;
