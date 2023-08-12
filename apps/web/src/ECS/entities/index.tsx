import { Player } from "./Player";
import { Object3D } from "three";
import { ReactNode } from "react";
import { Enemies } from "./Enemies";
import { TargetableEnemy } from "@/utils";

export type Entity = {
  shields?: {
    max: number;
    current: number;
  };

  // game-state
  targetWord?: string;
  typedCharacters?: string;
  targetedEnemy?: TargetableEnemy | null;
  spawnedAt?: number;
  staggerBy?: number;

  // combat
  attackSpeed?: number;
  nextAttackAt?: number | null;

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
      <Enemies />
    </>
  );
}
