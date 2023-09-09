import { StateCreator } from "zustand";
import { GlobalState } from ".";
import { getLogger } from "logging";

const log = getLogger(__filename);

type InternalProperties = {
  debug: boolean;
};

type InternalActions = {
  toggleDebug: () => void;
};

export type InternalState = InternalProperties & InternalActions;

export const createInternalState: StateCreator<
  GlobalState,
  [["zustand/immer", unknown]],
  [],
  InternalState
> = (_set, _get) => ({
  debug: false,
  toggleDebug: () => {
    _set(state => {
      const debug = !state.internal.debug;
      state.internal.debug = debug;
      log.debug(`Debug mode is now ${debug ? "on" : "off"}`);
    });
  },
});
