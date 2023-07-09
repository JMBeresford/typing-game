"use client";

import { Canvas } from "@lib/r3f";
import { ReactNode, Suspense } from "react";

import styles from "./Game.module.scss";
import { Systems } from "@ecs/systems";
import { Entities } from "@ecs/entities";

type Props = { children?: ReactNode };

export function Game({ children }: Props) {
  return (
    <div className={styles.game}>
      <Canvas>
        <color attach="background" args={[0.05, 0.05, 0.08]} />

        <Suspense fallback={null}>
          <Entities />
          <Systems />
        </Suspense>
        {children}
      </Canvas>
    </div>
  );
}
