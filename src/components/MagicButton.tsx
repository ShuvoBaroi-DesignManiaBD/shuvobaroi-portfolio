"use client";
import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicButton = ({
  title,
  icon=null,
  position='left',
  handleClick=()=> null,
  otherClasses,
  htmlType="button",
  children=null
}: {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode | string;
  position?: string;
  handleClick?: () => void | null;
  otherClasses?: string;
  htmlType?: "button" | "submit"
}) => {
  return (
    <button
      className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[2px] focus:outline-none !cursor-pointer"
      onClick={handleClick || null}
      type={htmlType || "button"}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#5577ff_0%,#abbdff_25%,#5577ff_50%,#5577ff_100%)]" />

      {/* remove px-3 py-1, add px-5 gap-2 */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title || children}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;




// import React from "react";

// const MagicButton = ({
//   htmlType = "button", // Default to "button" unless explicitly passed
//   title,
//   onClick,
//   position,
//   otherClasses,
//   icon,
// }: {
//   htmlType?: "submit" | "button" | "reset";
//   title: string;
//   onClick?: () => void;
//   position?: string;
//   otherClasses?: string;
//   icon?: React.ReactNode;
// }) => {
//   return (
//     <button
//       type={htmlType} // Pass the type dynamically
//       onClick={onClick} // Attach the onClick handler if provided
//       className={`flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-all ${otherClasses}`}
//     >
//       {icon && <span>{icon}</span>} {title}
//     </button>
//   );
// };

// export default MagicButton;
