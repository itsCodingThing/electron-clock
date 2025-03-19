import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddTimer } from "./add-timer";
import { useTimer } from "./timer-context";
import { formatTime } from "@/lib/utils";
import { createNotify } from "@/lib/notification";

interface TimerProps {
  duration: number;
}

function TimerCard(props: TimerProps): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(props.duration); // minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(props.duration);
  }, [props.duration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            createNotify();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(props.duration);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center mb-8">
          <span className="text-6xl font-bold tracking-tighter">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex justify-center items-center gap-4 mb-6">
          <Button
            disabled={props.duration === 0 ? true : false}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={handleReset}
          >
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset</span>
          </Button>
          <Button
            disabled={props.duration === 0 ? true : false}
            size="icon"
            className="h-16 w-16 rounded-full cursor-pointer"
            onClick={handleStartPause}
          >
            {isRunning ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
            <span className="sr-only">{isRunning ? "Pause" : "Start"}</span>
          </Button>
          <AddTimer />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Timer() {
  const { state } = useTimer();
  return <TimerCard duration={state.duration} />;
}
