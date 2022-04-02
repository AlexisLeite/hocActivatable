import { useState } from 'react';

type StateUpdater<State> = (prevState: State) => Partial<State>;

const useMergedState = <State extends Record<string, unknown>>(
  initialState: State,
  debug = false,
): [
  State,
  (mergeState: Partial<State> | StateUpdater<State>) => void,
  (state: State) => void,
] => {
  const [state, setState] = useState<State>(initialState);

  function mergeState(newState: StateUpdater<State> | Partial<State>) {
    if (debug) console.log(newState);
    let innerNewState = newState;

    setState((prevState) => {
      if (typeof newState === 'function') {
        innerNewState = newState(prevState);
      }
      return { ...prevState, ...innerNewState };
    });
  }

  return [state, mergeState, setState];
};

export default useMergedState;
