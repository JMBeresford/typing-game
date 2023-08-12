"use client";

import { ReactNode, useLayoutEffect } from "react";

import styles from "./Game.module.scss";
import { Systems } from "@/ECS/systems";
import { Entities } from "@/ECS/entities";
import { Stats } from "@react-three/drei";
import { Renderables } from "../../src/components/Renderables";
import { GameOverScreen } from "./GameOverScreen";
import { ScenePortal } from "@/components/ScenePortal";
import { useStore } from "@/state";
import { getLogger } from "logging";

const log = getLogger(__filename);

type Props = { children?: ReactNode };

export function Game({ children }: Props) {
  useLayoutEffect(() => {
    log.debug("Starting game");
    useStore.getState().wave.reset();

    return () => {
      log.debug("Stopping game");
      useStore.getState().wave.reset();
    };
  }, []);

  return (
    <div className={styles.game}>
      <GameOverScreen />
      <ScenePortal>
        <Systems />
        <Entities />
        <Renderables />

        <Stats />
        {children}
      </ScenePortal>
    </div>
  );
}
