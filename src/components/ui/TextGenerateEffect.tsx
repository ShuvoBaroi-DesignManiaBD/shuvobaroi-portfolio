"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// export const TextGenerateEffect = ({
//   words,
//   className,
// }: {
//   words: string;
//   className?: string;
// }) => {
//   const [scope, animate] = useAnimate();
//   const wordsArray = words.split(" ");
//   useEffect(() => {
//     console.log(wordsArray);
//     animate(
//       "span",
//       {
//         opacity: 1,
//       },
//       {
//         duration: 2,
//         delay: stagger(0.2),
//       }
//     );
//   }, [scope.current]);

//   const renderWords = () => {
//     return (
//       <motion.div ref={scope}>
//         {wordsArray.map((word, idx) => {
//           return (
//             <motion.span
//               key={word + idx}
//               className={` ${idx >= 2 && idx <=5 ? "text-purple" : "dark:text-white text-black"
//                 } opacity-0`}
//             >
//               {word}{" "}
//             </motion.span>
//           );
//         })}
//       </motion.div>
//     );
//   };

//   return (
//     <div className={cn("font-bold", className)}>
//       {/* mt-4 to my-4 */}
//       <div className="my-4">
//         {/* remove  text-2xl from the original */}
//         <div className=" dark:text-white text-black leading-snug tracking-wide">
//           {renderWords()}
//         </div>
//       </div>
//     </div>
//   );
// };

export const TextGenerateEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: string;
  className?: string;
  cursorClassName?: string;
}) => {
  const arrayOfWords = words.split(" ");
  // split text inside of words into array of characters
  const newArrayOfWords = arrayOfWords.map((word, idx) => {
    return {
      className: idx >= 2 && idx <= 5 ? "text-purple" : "dark:text-white text-black",
      text: word,
    };
  });

  const arrayOfChars = newArrayOfWords.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [animate, isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {arrayOfChars.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: string;
  className?: string;
  cursorClassName?: string;
}) => {
  const arrayOfWords = words.split(" ");
  // split text inside of words into array of characters
  const newArrayOfWords = arrayOfWords.map((word, idx) => {
    return {
      className: idx >= 2 && idx <= 5 ? "text-purple" : "dark:text-white text-black",
      text: word,
    };
  });

  const arrayOfChars = newArrayOfWords.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {arrayOfChars.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,

          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
