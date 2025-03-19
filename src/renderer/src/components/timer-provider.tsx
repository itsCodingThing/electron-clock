import { timerReducer, TimerContext } from "./timer-context";
import { useReducer, useMemo } from "react";

type TimerProviderProps = { children: React.ReactNode };

function TimerProvider(props: TimerProviderProps) {
  const [state, dispatch] = useReducer(timerReducer, {
    activeCounter: "",
    duration: 0,
  });
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TimerContext.Provider value={value}>
      {props.children}
    </TimerContext.Provider>
  );
}

export { TimerProvider };
