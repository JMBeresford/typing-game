import { With, Without } from "miniplex";
import { BufferGeometry, Material, Mesh } from "three";
import { Entity } from "./ECS/entities";
import { ECS } from "./ECS";

export type Time = { mins: number; secs: number };
export type MeshType<T extends Material> = Mesh<BufferGeometry, T>;
export type TargetableEnemy = Without<With<Entity, "shields" | "targetWord">, "destroy">;

const withTargetWords = ECS.world.with("targetWord");
export function generateWord(
  options: { length: number; letters: string } = {
    length: 5,
    letters: "abcdefghijklmnopqrstuvwxyz",
  },
) {
  const { length, letters } = options;
  const usedChars: string[] = [];
  for (const entity of withTargetWords) {
    usedChars.push(entity.targetWord[0]);
  }

  const chars = letters.split("").filter(c => !usedChars.includes(c));
  let word = "";

  for (let i = 0; i < length; i++) {
    if (i === 0) {
      word += chars[Math.floor(Math.random() * chars.length)];
    } else {
      word += letters[Math.floor(Math.random() * letters.length)];
    }
  }

  return word;
}

export function msElapsedToTime(ms: number): Time {
  const secs = parseFloat(Math.floor(ms / 1000).toFixed(2));
  const mins = Math.floor(secs / 60);
  return { mins, secs: secs % 60 };
}

export function secElapsedToTime(_secs: number): Time {
  const secs = parseFloat(_secs.toFixed(2));
  const mins = Math.floor(secs / 60);
  return { mins, secs: secs % 60 };
}
