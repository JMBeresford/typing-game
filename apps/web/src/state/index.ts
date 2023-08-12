import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WaveState, createWaveState } from "./wave";

export type GlobalState = {
  wave: WaveState;
};

export const useStore = create<GlobalState>()(
  immer((...a) => ({
    wave: { ...createWaveState(...a) },
  })),
);
