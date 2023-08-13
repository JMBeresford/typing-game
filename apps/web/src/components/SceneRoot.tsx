"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { SceneTunnel } from "./ScenePortal";
import { MutableRefObject, ReactNode, StrictMode, Suspense, useEffect, useRef } from "react";
import { useStore } from "@/state";

function Clock() {
  const { clock } = useThree();

  useEffect(() => {
    useStore.setState(s => {
      s.wave.clock = clock;
    });
  }, [clock]);

  return null;
}

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
            <Clock />
            <SceneTunnel.Out />
          </StrictMode>
        </Suspense>
      </Canvas>
    </div>
  );
}
