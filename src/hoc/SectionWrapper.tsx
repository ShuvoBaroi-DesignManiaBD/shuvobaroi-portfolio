import { motion } from "framer-motion";

import { styles } from "@/lib/styles";
import React from "react";
import { staggerContainer } from "@/utils/motion";


const StarWrapper = ({Component, idName}:{Component: React.FC, idName: string}) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.padding} mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
