import { StateCreator } from "zustand";
import { GlobalState } from ".";
import { getLogger } from "logging";
import { ECS } from "@/ECS";

const log = getLogger(__filename);

type Wave = {
  startTime: number;
  endTime?: number;
  waveNumber: number;
  numEnemies: number;
};

type FinishedWave = Required<Wave>;

type InternalWaveState = {
  phase: "preparing" | "wave" | "game over";

  // Time between waves in *milliseconds*
  timeBetweenWaves: number;
  finishedWaves: FinishedWave[];
};

type WaveActions = {
  startWave: () => void;
  finishWave: () => void;
  getNumEnemies: () => number;
  gameOver: () => void;
  getCurrentWave: () => Wave;
  reset: () => void;
};

export type WaveState = Wave & InternalWaveState & WaveActions;

const getInitialState: () => Wave & InternalWaveState = () => {
  const t = performance.now();
  return {
    startTime: t,
    endTime: t,
    waveNumber: 0,
    numEnemies: 0,
    phase: "preparing",
    timeBetweenWaves: 5000,
    finishedWaves: [],
  };
};

export const createWaveState: StateCreator<
  GlobalState,
  [["zustand/immer", unknown]],
  [],
  WaveState
> = (_set, _get) => ({
  ...getInitialState(),
  startWave: () => {
    const { wave } = _get();
    const nextWave = wave.waveNumber + 1;
    const newEnemyCount = Math.max(Math.floor(nextWave / 2) + 1, 1);
    log.info(`Spawning ${newEnemyCount} enemies for wave ${nextWave}`);

    _set(state => {
      state.wave.waveNumber = nextWave;
      state.wave.numEnemies = newEnemyCount;
      state.wave.startTime = performance.now();
      state.wave.endTime = undefined;
      state.wave.phase = "wave";
    });
  },
  finishWave: () => {
    log.info(`Wave ${_get().wave.waveNumber} complete`);
    const endTime = performance.now();

    _set(state => {
      state.wave.endTime = endTime;
      state.wave.phase = "preparing";

      state.wave.finishedWaves.push({
        startTime: state.wave.startTime,
        endTime: endTime,
        waveNumber: state.wave.waveNumber,
        numEnemies: state.wave.numEnemies,
      });
    });
  },
  getNumEnemies: () => _get().wave.numEnemies,
  gameOver: () => {
    _set(state => {
      state.wave.endTime = performance.now();
      state.wave.phase = "game over";
    });
  },
  getCurrentWave: () => {
    const wave = _get().wave;
    return {
      startTime: wave.startTime,
      endTime: wave.endTime,
      waveNumber: wave.waveNumber,
      numEnemies: wave.numEnemies,
    };
  },
  reset: () => {
    ECS.world.clear();

    // add player
    ECS.world.add({
      shields: { max: 3, current: 3 },
      typedCharacters: "",
      targetedEnemy: null,
    });

    _set(state => {
      Object.assign(state.wave, getInitialState());
    });
  },
});

performance.clearResourceTimings;
