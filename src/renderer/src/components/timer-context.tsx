import { createContext, useContext } from "react";

type Action = {
  type: "set-active";
  value: { activeCounter: string; duration: number };
};
type Dispatch = (action: Action) => void;
type State = { activeCounter: string; duration: number };

export const TimerContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export function timerReducer(state: State, action: Action) {
  switch (action.type) {
    case "set-active": {
      localStorage.setItem("activeTimer", action.value.activeCounter);

      return {
        activeCounter: action.value.activeCounter,
        duration: action.value.duration,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
