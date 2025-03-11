import useSWR, { useSWRConfig } from "swr";
import { Timer } from "./components/timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { useEffect, useState } from "react";
import { Pencil, Smile, Trash } from "lucide-react";

export default function App(): JSX.Element {
  const { mutate } = useSWRConfig();
  const [timer, setTimer] = useState(0); // in minutes
  const { data, isLoading } = useSWR("db:timer:get", () =>
    window.api.db.getAllTimers(),
  );

  useEffect(() => {
    if (!isLoading && data) {
      if (data.timers.length > 0) {
        setTimer(data.timers[0].durations);
      } else {
        setTimer(0);
      }
    }
  }, [isLoading, data]);

  return (
    <main className="h-svh flex flex-col p-5 bg-red-50">
      <Timer duration={timer} />
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
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-green-500 cursor-pointer"
                    onClick={() => {
                      setTimer(item.durations);
                    }}
                  >
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Set</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full cursor-pointer"
                    onClick={() => {
                      console.log(item);
                    }}
                  >
                    <Pencil className="h-5 w-5" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-red-500 bg-red-500 cursor-pointer"
                    onClick={async () => {
                      await window.api.db.deleteTimer(item.id);
                      await mutate("db:timer:get");
                    }}
                  >
                    <Trash className="h-5 w-5" />
                    <span className="sr-only">Remove</span>
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
