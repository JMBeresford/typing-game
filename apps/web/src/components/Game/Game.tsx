"use client";

import { Canvas } from "@lib/r3f";
import { ReactNode, Suspense } from "react";

import styles from "./Game.module.scss";
import dynamic from "next/dynamic";

const Systems = dynamic(() => import("@ecs/systems").then(mod => mod.Systems), { ssr: false });
const Entities = dynamic(() => import("@ecs/entities").then(mod => mod.Entities), { ssr: false });

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
