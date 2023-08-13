import { StateCreator } from "zustand";
import { GlobalState } from ".";
import { getLogger } from "logging";

const log = getLogger(__filename);

type Clock = {
  elapsedTime: number;
  running: boolean;
};

type ClockActions = {
  tick: (delta: number) => void;
  getElapsedTime: () => number;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

export type ClockState = Clock & ClockActions;

export const createClockState: StateCreator<
  GlobalState,
  [["zustand/immer", unknown]],
  [],
  ClockState
> = (_set, _get) => ({
  elapsedTime: 0,
  running: false,
  tick: (delta: number) => {
    if (!_get().clock.running) return;
    log.trace(`Clock advanced by: ${delta}`);
    _set(state => {
      state.clock.elapsedTime += delta;
    });
  },
  getElapsedTime: () => {
    return _get().clock.elapsedTime;
  },
  start: () => {
    _set(state => {
      state.clock.running = true;
    });
  },
  stop: () => {
    _set(state => {
      state.clock.running = false;
    });
  },
  reset: () => {
    _set(state => {
      state.clock.elapsedTime = 0;
    });
  },
});
