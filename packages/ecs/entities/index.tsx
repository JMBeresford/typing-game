import { Player } from "./Player";
import { Camera } from "./Camera";
import { Object3D } from "three";
import { ReactNode } from "react";
import { Enemies } from "./Enemies";
import { Wave } from "./Wave";

export type Entity = {
  isPlayer?: boolean;
  isEnemy?: boolean;
  isCamera?: boolean;

  shields?: {
    max: number;
    current: number;
  };

  // game-state
  targetWord?: string;
  typedCharacters?: string;
  wave?: number;

  // renderables
  transform?: Object3D;
  render?: ReactNode;

  destroy?: boolean;
};

export function Entities() {
  return (
    <>
      <Player />
      <Camera />
      <Enemies />
      <Wave />
    </>
  );
}
