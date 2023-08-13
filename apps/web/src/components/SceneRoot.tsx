"use client";

import { Canvas } from "@react-three/fiber";
import { SceneTunnel } from "./ScenePortal";
import { MutableRefObject, ReactNode, StrictMode, Suspense, useRef } from "react";

export function SceneRoot(props: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100dvh",
        touchAction: "auto",
      }}
    >
      {props.children}
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          touchAction: "none",
        }}
        eventSource={ref}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <StrictMode>
            <SceneTunnel.Out />
          </StrictMode>
        </Suspense>
      </Canvas>
    </div>
  );
}
