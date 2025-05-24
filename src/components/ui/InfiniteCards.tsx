"use client";

import { cn } from "@/lib/utils";
import { genrateMainURL } from "@/utils/shared";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    testimony: string;
    client_photo: { url: string };
    client_name: string;
    role?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        // Responsive: grid for mobile, flex for larger screens
        "w-full h-full scroller relative z-20 overflow-x-auto overflow-y-visible",
        className
      )}
    >
      {/* Mobile: 2-column grid, Desktop: horizontal scroll */}
      <ul
        ref={scrollerRef}
        className={cn(
          // Use grid for mobile, flex for md+
          "grid grid-cols-2 gap-4 sm:flex sm:flex-nowrap sm:min-w-full sm:shrink-0 sm:gap-10 py-4",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={`relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-3 sm:p-5 md:p-8 w-full sm:w-[60vw] md:w-[33vw] max-w-full sm:max-w-[40vw] bg-gradient-to-b from-[#04071d] to-[#0c0e23]`}
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
            key={idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              {/* Responsive text size */}
              <span className="relative z-20 text-sm sm:text-base md:text-lg line-clamp-6 text-white font-normal">
                {item.testimony}
              </span>
              <div className="relative z-20 mt-4 sm:mt-6 flex flex-row items-center">
                {/* Profile img */}
                <div className="me-3">
                  <Image
                    width={40}
                    height={40}
                    src={
                      item?.client_photo?.url
                        ? genrateMainURL(item?.client_photo?.url)
                        : genrateMainURL(item?.client_photo?.url) ||
                          "/src/assets/tech/reactjs.png"
                    }
                    alt={item.client_name}
                    className="rounded-full w-8 h-8 sm:w-12 sm:h-12 object-cover"
                  />
                </div>
                <span className="flex flex-col gap-1">
                  {/* Responsive name size */}
                  <span className="text-base sm:text-xl font-bold leading-[1.6] text-white">
                    {item.client_name}
                  </span>
                  <span className="text-xs sm:text-sm leading-[1.6] text-white-200 font-normal">
                    {item.role || "Business Owner"}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
