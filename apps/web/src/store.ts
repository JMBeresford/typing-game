import { create } from "zustand";

type GlobalState = {
  wave: {
    startTime: number;
    endTime?: number;
    waveNumber: number;
    numEnemies: number;
  };
  phase: "pre" | "wave" | "post" | (string & {});
};

const initialState: GlobalState = {
  wave: {
    startTime: 0,
    endTime: undefined,
    waveNumber: 0,
    numEnemies: 0,
  },
  phase: "pre",
} as const;

export const useStore = create<GlobalState>(() => initialState);
