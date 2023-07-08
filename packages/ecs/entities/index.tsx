import { Player } from "./Player";
import { Camera } from "./Camera";
import { Object3D } from "three";
import { ReactNode } from "react";
import { Enemies } from "./Enemies";

export type Entity = {
  isPlayer?: boolean;
  isEnemy?: boolean;
  isCamera?: boolean;

  shields?: {
    max: number;
    current: number;
  };

  targetWord?: string;
  typedCharacters?: string;

  transform?: Object3D;

  render?: ReactNode;
};

export function Entities() {
  return (
    <>
      <Player />
      <Camera />
      <Enemies />
    </>
  );
}
