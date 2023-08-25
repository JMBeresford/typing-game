import { BufferGeometry, Material, Mesh } from "three";

export type Time = { mins: number; secs: number };
export type MeshType<T extends Material> = Mesh<BufferGeometry, T>;

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
