import { BufferGeometry, Material, Mesh } from "three";

export type Time = { mins: number; secs: number };
export type MeshType<T extends Material> = Mesh<BufferGeometry, T>;
export const RenderOrder = {
  background: 0,
  foreground: 1,
  overlay: 2,
} as const;

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

export function recordToIter<K extends string | number | symbol, V>(
  record: Record<K, V>,
): [K, V][] {
  return Object.entries(record) as [K, V][];
}

export function styleStringToHex(style: string): number {
  return parseInt(style.slice(1), 16);
}
