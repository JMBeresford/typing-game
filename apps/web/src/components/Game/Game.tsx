"use client";

import { Canvas } from "@react-three/fiber";
import { ReactNode, StrictMode, Suspense } from "react";

import styles from "./Game.module.scss";
import { Systems, Entities } from "../../ECS";
import { Stats } from "@react-three/drei";

type Props = { children?: ReactNode };

export function Game({ children }: Props) {
  return (
    <div className={styles.game}>
      <Canvas gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <StrictMode>
            <color attach="background" args={[0.05, 0.05, 0.08]} />
            <Systems />
            <Entities />

            <Stats />
            {children}
          </StrictMode>
        </Suspense>
      </Canvas>
    </div>
  );
}
