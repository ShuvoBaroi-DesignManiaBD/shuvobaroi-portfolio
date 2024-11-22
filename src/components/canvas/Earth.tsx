"use client";
import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
// import CanvasLoader from "../Loader";
import dynamic from "next/dynamic";
const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const CanvasLoader = dynamic(() => import("../Loader").then((m) => m.default), { ssr: false });
const OrbitControls = dynamic(() => import("@react-three/drei").then((m) => m.OrbitControls), { ssr: false });
const Preload = dynamic(() => import("@react-three/drei").then((m) => m.Preload), { ssr: false });
// const useGLTF = dynamic(() => import("@react-three/drei").then((m) => m.useGLTF), { ssr: false });
const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
