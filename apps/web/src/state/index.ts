import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WaveState, createWaveState } from "./wave";
import { ClockState, createClockState } from "./clock";
import { GameStatsState, createGameStatsState } from "./gameStats";

export type GlobalState = {
  wave: WaveState;
  clock: ClockState;
  gameStats: GameStatsState;
};

export const useStore = create<GlobalState>()(
  immer((...a) => ({
    wave: { ...createWaveState(...a) },
    clock: { ...createClockState(...a) },
    gameStats: { ...createGameStatsState(...a) },
  })),
);
