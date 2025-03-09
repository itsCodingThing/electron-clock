import useSWR from "swr";
import { Timer } from "./components/timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function App(): JSX.Element {
  const { data } = useSWR("db:timer:get", () => window.api.db.getAllTimers());

  return (
    <main className="h-svh flex flex-col p-5 bg-red-50">
      <Timer duration={25 * 60} />
      <div className="mt-2 flex flex-col grow space-y-1 overflow-y-auto">
        {data ? (
          data.timers.map((item, i) => (
            <Card className="w-full p-2" key={i}>
              <CardContent className="flex justify-between">
                <div>
                  <p>{item.title}</p>
                  <span className="">{item.description}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      console.log("");
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="secondary" onClick={() => {}}>
                    Set
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </main>
  );
}
