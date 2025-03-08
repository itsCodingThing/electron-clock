import { Timer } from "./components/timer";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "./components/ui/card";

const store = [{
  id: 0,
  title: "",
  description: "",
  duration: 0
}]

export default function App() {
  return (
    <main className="h-svh p-5 bg-red-50">
      <Timer duration={25 * 60} />

      <Card className="mt-2">
        <CardContent>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Pomodoro: 25 minutes</Label>
              <Button className="w-full" variant="secondary" onClick={async () => {
              }}>
                Edit
              </Button>
              <Button className="w-full" variant="secondary" onClick={() => { }}>
                Set
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

