import useSWR from "swr";
import Timer from "./components/timer";
import TimerList from "./components/timer-list";
import { TimerProvider } from "./components/timer-provider";

export default function App() {
  const { data } = useSWR("db:timer:get", () => window.api.db.getAllTimers());

  return (
    <TimerProvider>
      <main className="h-svh flex flex-col p-5 bg-red-50">
        <Timer />
        <div className="mt-2 flex flex-col grow space-y-1 overflow-y-auto">
          {data ? (
            <TimerList timers={data.timers} />
          ) : (
            <p>no timer is available</p>
          )}
        </div>
      </main>
    </TimerProvider>
  );
}
