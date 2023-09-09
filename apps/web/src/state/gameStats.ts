import { StateCreator } from "zustand";
import { GlobalState } from ".";
import { getLogger } from "logging";
import { FinishedWave } from "./wave";
import { TableColumns } from "@/lib/tables.types";

const log = getLogger(__filename);

export type RecordedStats = Omit<
  TableColumns<"games_played">,
  "created_at" | "id" | "times_hit" | "user_id"
>;

type GameStats = {
  enemiesKilled: number;
  charactersTyped: number;
  charactersMissed: number;
  score: number;
  recordedStats?: RecordedStats;
  finishedWaves: FinishedWave[];
};

type GameStatsActions = {
  enemyKilled: () => void;
  characterWasTyped: () => void;
  characterWasMissed: () => void;
  addScore: (score: number) => void;
  getStats: () => RecordedStats;
  reset: () => void;
};

export type GameStatsState = GameStats & GameStatsActions;

const initialState: GameStats = {
  enemiesKilled: 0,
  charactersTyped: 0,
  charactersMissed: 0,
  score: 0,
  finishedWaves: [],
};

export const createGameStatsState: StateCreator<
  GlobalState,
  [["zustand/immer", unknown]],
  [],
  GameStatsState
> = (_set, _get) => ({
  ...initialState,
  enemyKilled: () => {
    if (_get().wave.phase !== "wave") return;

    _set(state => {
      state.gameStats.enemiesKilled += 1;
    });
  },
  characterWasTyped: () => {
    if (_get().wave.phase !== "wave") return;

    _set(state => {
      state.gameStats.charactersTyped += 1;
    });
  },
  characterWasMissed: () => {
    if (_get().wave.phase !== "wave") return;

    _set(state => {
      state.gameStats.charactersMissed += 1;
    });
  },
  addScore: (score: number) => {
    if (_get().wave.phase !== "wave") return;

    _set(state => {
      state.gameStats.score += score;
    });
  },
  getStats: () => {
    const { gameStats, wave, clock } = _get();

    const unfinishedWave = wave.getCurrentWave();
    const timeElapsed =
      gameStats.finishedWaves.reduce((acc, wave) => acc + (wave.endTime - wave.startTime), 0) +
      ((unfinishedWave.endTime ?? clock.getElapsedTime()) - unfinishedWave.startTime);

    const stats: RecordedStats = {
      enemies_killed: gameStats.enemiesKilled,
      accuracy:
        gameStats.charactersTyped / (gameStats.charactersTyped + gameStats.charactersMissed),
      score: gameStats.score,
      waves_completed: gameStats.finishedWaves.length,
      time_elapsed_ms: Math.floor(timeElapsed * 1000),
      words_per_minute: gameStats.charactersTyped / (timeElapsed / 60),
    };

    if (isNaN(stats.accuracy)) stats.accuracy = 0;

    _set(state => {
      state.gameStats.recordedStats = stats;
    });

    return stats;
  },
  reset: () => {
    log.debug("Resetting game stats state");
    _set(state => {
      Object.assign(state.gameStats, initialState);
    });
  },
});
