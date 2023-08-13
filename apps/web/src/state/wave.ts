import { StateCreator } from "zustand";
import { GlobalState } from ".";
import { getLogger } from "logging";
import { ECS } from "@/ECS";
import { Clock } from "three";

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
  clock?: Clock;
  finishedWaves: FinishedWave[];
};

type WaveActions = {
  startWave: () => void;
  finishWave: () => void;
  getNumEnemies: () => number;
  gameOver: () => void;
  getCurrentWave: () => Wave;
  getElapsedTime: () => number;
  reset: () => Wave & InternalWaveState;
};

export type WaveState = Wave & InternalWaveState & WaveActions;

export const createWaveState: StateCreator<
  GlobalState,
  [["zustand/immer", unknown]],
  [],
  WaveState
> = (_set, _get) => ({
  startTime: 0,
  endTime: 0,
  waveNumber: 0,
  numEnemies: 0,
  phase: "preparing",
  timeBetweenWaves: 5,
  finishedWaves: [],
  startWave: () => {
    const { wave } = _get();
    const nextWave = wave.waveNumber + 1;
    const newEnemyCount = Math.max(Math.floor(nextWave / 2) + 1, 1);
    log.info(`Spawning ${newEnemyCount} enemies for wave ${nextWave}`);

    _set(state => {
      state.wave.waveNumber = nextWave;
      state.wave.numEnemies = newEnemyCount;
      state.wave.startTime = wave.getElapsedTime();
      state.wave.endTime = undefined;
      state.wave.phase = "wave";
    });
  },
  finishWave: () => {
    const { wave } = _get();
    log.info(`Wave ${wave.waveNumber} complete`);
    const endTime = wave.getElapsedTime();

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
      state.wave.endTime = _get().wave.getElapsedTime();
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
  getElapsedTime: () => {
    const wave = _get().wave;
    return wave.clock?.getElapsedTime() ?? 0;
  },
  reset: () => {
    ECS.world.clear();

    // add player
    ECS.world.add({
      shields: { max: 3, current: 3 },
      typedCharacters: "",
      targetedEnemy: null,
    });

    const t = _get().wave.getElapsedTime();
    const initialState: Wave & InternalWaveState = {
      startTime: t,
      endTime: t,
      waveNumber: 0,
      numEnemies: 0,
      phase: "preparing",
      timeBetweenWaves: 5,
      finishedWaves: [],
    };

    _set(state => {
      Object.assign(state.wave, initialState);
    });

    return initialState;
  },
});
