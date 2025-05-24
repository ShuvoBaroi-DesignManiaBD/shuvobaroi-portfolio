"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "./shared/Logo";
import envConfig from "@/config";
import { HiMenu, HiX } from "react-icons/hi";

export const FloatingNav = ({
  className,
  siteInfo,
}: {
  // navItems: {
  //   name: string;
  //   link: string;
  //   icon?: JSX.Element;
  // }[];
  className?: string;
  siteInfo: any;
}) => {
  const globalData = siteInfo;
  const headerData = globalData?.data?.global_sections[0];

  const { scrollYProgress } = useScroll();

  console.log("Global Data", globalData, headerData);

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change  pr-2 pl-8 py-2 to px-10 py-5
          "flex md:min-w-[70vw] md:h-20 lg:min-w-fit fixed z-[5000] top-0 inset-x-0 mx-auto px-3 sm:px-10 py-4 sm:py-5 items-center justify-between space-x-4 w-full",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          // borderRadius: "12px",
          // border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
          <Link href={"/"}>
            <Logo
              src={
                envConfig.baseApi?.split("/api")[0] +
                  (headerData ? headerData?.logo?.url : "") ||
                "/shuvo-baroi-logo.webp"
              }
            />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5">
            {headerData?.menu?.page?.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={`/${navItem?.slug}` || "#"}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 !cursor-pointer text-base"
                )}
              >
                {/* <span className="block sm:hidden">{navItem.icon}</span> */}
                {/* add !cursor-pointer */}
                {/* remove hidden sm:block for the mobile responsive */}
                <span>{navItem.title}</span>
              </Link>
            ))}
          </div>
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu className="w-7 h-7 text-white" />
          </button>
        </div>
        {/* Sidebar Overlay & Drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[6000]"
                onClick={() => setSidebarOpen(false)}
              />
              {/* Sidebar Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-[100vh] w-4/5 max-w-xs bg-gray-900 !z-[7000] shadow-lg flex flex-col p-6"
              >
                <div className="flex justify-end mb-0">
                  <button
                    className="p-2 rounded focus:outline-none"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close menu"
                  >
                    <HiX className="w-7 h-7 text-white" />
                  </button>
                </div>
                <nav className="flex flex-col space-y-6">
                <Link href={"/"}>
            <Logo
              src={
                envConfig.baseApi?.split("/api")[0] +
                  (headerData ? headerData?.logo?.url : "") ||
                "/shuvo-baroi-logo.webp"
              }
              className="mb-5"
            />
          </Link>
                  {headerData?.menu?.page?.map((navItem: any, idx: number) => (
                    <Link
                      key={`sidebar-link=${idx}`}
                      href={`/${navItem?.slug}` || "#"}
                      className="text-white text-lg font-medium hover:text-purple-400 transition"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {navItem.title}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
