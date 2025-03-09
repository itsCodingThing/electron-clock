import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddTimer } from "./add-timer";

interface TimerProps {
  duration: number;
}

export function Timer(props: TimerProps): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(props.duration); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours > 0 ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
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
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full cursor-pointer"
            onClick={handleReset}
          >
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset</span>
          </Button>

          <Button
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
