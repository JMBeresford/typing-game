import { StateCreator } from "zustand";
import { GlobalState } from ".";
import { getLogger } from "logging";
import { ECS } from "@/ECS";
import { API_PATH } from "app/api/urls";

const log = getLogger(__filename);

type Wave = {
  startTime: number;
  endTime?: number;
  waveNumber: number;
  numEnemies: number;
};

export type FinishedWave = Required<Wave>;

type InternalWaveState = {
  phase: "preparing" | "wave" | "game over";

  // Time between waves in *milliseconds*
  timeBetweenWaves: number;
};

type WaveActions = {
  startWave: () => void;
  finishWave: () => void;
  getNumEnemies: () => number;
  gameOver: () => void;
  getCurrentWave: () => Wave;
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
    const { wave, clock } = _get();
    const nextWave = wave.waveNumber + 1;
    const newEnemyCount = Math.max(Math.floor(nextWave / 2) + 1, 1);
    log.info(`Spawning ${newEnemyCount} enemies for wave ${nextWave}`);

    _set(state => {
      state.wave.waveNumber = nextWave;
      state.wave.numEnemies = newEnemyCount;
      state.wave.startTime = clock.getElapsedTime();
      state.wave.endTime = undefined;
      state.wave.phase = "wave";
    });
  },
  finishWave: () => {
    const { wave, clock } = _get();
    log.info(`Wave ${wave.waveNumber} complete`);
    const endTime = clock.getElapsedTime();

    _set(state => {
      state.wave.endTime = endTime;
      state.wave.phase = "preparing";

      state.gameStats.finishedWaves.push({
        startTime: state.wave.startTime,
        endTime: endTime,
        waveNumber: state.wave.waveNumber,
        numEnemies: state.wave.numEnemies,
      });
    });
  },
  getNumEnemies: () => _get().wave.numEnemies,
  gameOver: () => {
    const stats = _get().gameStats.getStats();

    fetch(`${API_PATH}/game/record-stats`, {
      method: "POST",
      body: JSON.stringify(stats),
    });

    _set(state => {
      state.wave.endTime = _get().clock.getElapsedTime();
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

    const t = _get().clock.getElapsedTime();
    const initialState: Wave & InternalWaveState = {
      startTime: t,
      endTime: t,
      waveNumber: 0,
      numEnemies: 0,
      phase: "preparing",
      timeBetweenWaves: 5,
    };

    _set(state => {
      Object.assign(state.wave, initialState);
    });

    _get().clock.start();

    return initialState;
  },
});
