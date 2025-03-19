import { Play, Trash2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TimerData } from "@types/db";
import { useTimer } from "./timer-context";
import { useSWRConfig } from "swr";
import { formatTime } from "@/lib/utils";

interface TimerItemProps {
  timer: TimerData;
}

export default function TimerItem({ timer }: TimerItemProps) {
  const { mutate } = useSWRConfig();
  const { state, dispatch } = useTimer();

  return (
    <div className="relative border rounded-md overflow-hidden border-primary">
      <div className="relative flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-medium text-sm">{timer.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm mr-2">
            {formatTime(timer.durations)}
          </span>

          <Button
            variant="default"
            size="icon"
            className="h-7 w-7 cursor-pointer"
            title="Start Timer"
            onClick={() => {
              dispatch({
                type: "set-active",
                value: { activeCounter: timer.id, duration: timer.durations },
              });
            }}
          >
            {state.activeCounter === timer.id ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-7 w-7 bg-red-500 hover:bg-red-500 cursor-pointer"
            title="Delete Timer"
            onClick={async () => {
              await window.api.db.deleteTimer(timer.id);
              await mutate("db:timer:get");
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
