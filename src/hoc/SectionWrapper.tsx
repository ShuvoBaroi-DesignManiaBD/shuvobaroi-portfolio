"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { styles } from "@/lib/styles";
import React, { ReactNode } from "react";
import { staggerContainer } from "@/utils/motion";

interface SectionWrapperProps {
  children: any;
  idName: string;
}

const SectionWrapper = ({ children, idName }: SectionWrapperProps) => {
  return (
    <>
      <motion.section
        variants={staggerContainer()} // Ensure this function returns a valid object
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`mx-auto relative z-0 px-3 sm:px-5 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 w-full`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {children}
      </motion.section>
    </>
  );
};

export default SectionWrapper;
