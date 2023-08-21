"use client";

import { ReactNode, useLayoutEffect } from "react";
import styles from "./Game.module.scss";
import { Systems } from "@/ECS/systems";
import { Entities } from "@/ECS/entities";
import { Stats } from "@react-three/drei";
import { WaveIndicator } from "../../src/components/Renderables/WaveIndicator";
import { GameOverScreen } from "./GameOverScreen";
import { ScenePortal } from "@/components/ScenePortal";
import { useStore } from "@/state";
import { getLogger } from "logging";
import { PauseScreen } from "./PauseScreen";

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
      <PauseScreen />
      <ScenePortal>
        <Systems />
        <Entities />
        <WaveIndicator />

        <Stats />
        {children}
      </ScenePortal>
    </div>
  );
}
