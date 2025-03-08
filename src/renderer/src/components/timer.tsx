import { useState, useEffect, useRef } from "react"
import { Play, Pause, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface TimerProps {
  duration: number;
}

export function Timer(props: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(props.duration) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [totalTime, setTotalTime] = useState(props.duration) // For progress calculation
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours > 0 ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
  }

  const setCustomTime = (minutes: number) => {
    const newTime = minutes * 60
    setTotalTime(newTime)
    setTimeLeft(newTime)
    setIsRunning(false)
  }

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center mb-8">
          <span className="text-6xl font-bold tracking-tighter">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex justify-center items-center gap-4 mb-6">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={handleReset}>
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset</span>
          </Button>

          <Button size="icon" className="h-16 w-16 rounded-full" onClick={handleStartPause}>
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            <span className="sr-only">{isRunning ? "Pause" : "Start"}</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={handleReset}>
                <Plus className="h-5 w-5" />
                <span className="sr-only">Reset</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Timer</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Pomodoro: 25 minutes</Label>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Duration: {Math.round(totalTime / 60)} minutes</Label>
                    <span>{Math.round(totalTime / 60)} min</span>
                  </div>
                  <Slider
                    defaultValue={[Math.round(totalTime / 60)]}
                    min={1}
                    max={60}
                    step={1}
                    onValueChange={(value) => setCustomTime(value[0])}
                  />
                </div>

                <Button variant="secondary" className="w-full" onClick={() => setCustomTime(25)}>
                  Set
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

