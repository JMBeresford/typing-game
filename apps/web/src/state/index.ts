import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WaveState, createWaveState } from "./wave";
import { ClockState, createClockState } from "./clock";

export type GlobalState = {
  wave: WaveState;
  clock: ClockState;
};

export const useStore = create<GlobalState>()(
  immer((...a) => ({
    wave: { ...createWaveState(...a) },
    clock: { ...createClockState(...a) },
  })),
);
