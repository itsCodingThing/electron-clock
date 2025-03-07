import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
        <div className="relative mb-8">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

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

          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={handleReset}>
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

