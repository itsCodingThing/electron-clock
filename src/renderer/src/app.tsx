import { Timer } from "./components/timer";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "./components/ui/card";

export default function App() {
  return (
    <main className="h-svh p-5 bg-red-500">
      <Timer duration={25 * 60} />

      <Card className="mt-2">
        <CardContent>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Pomodoro: 25 minutes</Label>
              <Button variant="secondary" className="w-full" onClick={() => { }}>
                Set
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Short Break: 5 minutes</Label>
              <Button variant="secondary" className="w-full" onClick={() => { }}>
                Set
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Long Break: 15 minutes</Label>
              <Button variant="secondary" className="w-full" onClick={() => { }}>
                Set
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

