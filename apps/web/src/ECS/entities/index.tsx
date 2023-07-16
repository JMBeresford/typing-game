import { Player } from "./Player";
import { Object3D } from "three";
import { ReactNode } from "react";
import { Renderables } from "./Renderables";
import { WaveIndicator } from "./WaveIndicator";
import { TargetableEnemy } from "@/utils";

export type Entity = {
  shields?: {
    max: number;
    current: number;
  };

  // game-state
  targetWord?: string;
  typedCharacters?: string;
  wave?: number;
  targetedEnemy?: TargetableEnemy | null;

  // optional initial transforms
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];

  // renderables
  transform?: Object3D;
  render?: ReactNode;

  // relations
  parent?: Entity;
  children?: Entity[];

  destroy?: boolean;
};

export function Entities() {
  return (
    <>
      <Player />
      <Renderables />
      <WaveIndicator />
    </>
  );
}
