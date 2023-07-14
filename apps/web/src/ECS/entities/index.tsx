import { Player } from "./Player";
import { Object3D } from "three";
import { ReactNode } from "react";
import { Enemies } from "./Enemies";
import { WaveIndicator } from "./WaveIndicator";

export type Entity = {
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
      <Enemies />
      <WaveIndicator />
    </>
  );
}
