// import EarthCanvas from "./Earth";
// import BallCanvas from "./Ball";
// import ComputersCanvas from "./Computers";
// import StarsCanvas from "./Stars";
import dynamic from "next/dynamic";

const EarthCanvas = dynamic(() => import("./Earth").then((m) => m.default), { ssr: false });
const ComputersCanvas = dynamic(() => import("./Computers").then((m) => m.default), { ssr: false });
const StarsCanvas = dynamic(() => import("./Stars").then((m) => m.default), { ssr: false });
const BallCanvas = dynamic(() => import("./Ball").then((m) => m.default), { ssr: false });

export { EarthCanvas, BallCanvas, ComputersCanvas, StarsCanvas };
