"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import dynamic from "next/dynamic";

// const CanvasLoader = dynamic(() => import("../Loader").then((m) => m.default), { ssr: false });

// const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const Ball = (props: any) => {
  // Ensure `props.imgUrl` is a valid string and not an object
  const imageUrl = typeof props.imgUrl === 'string' ? props.imgUrl : '';
  const [decal] = useTexture([imageUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};


const BallCanvas = ({ icon }: { icon: any }) => {
  console.log(icon);
  
  // Validate `icon` to ensure it is a string
  // const validIcon = typeof icon === 'string' && icon.trim() !== '' ? icon : '/app.svg'; // Replace with your default icon path

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon?.src} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};


export default BallCanvas;
