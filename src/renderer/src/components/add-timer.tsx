import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSWRConfig } from "swr";

type Update =
  | { tag: "title"; value: string }
  | { tag: "description"; value: string }
  | { tag: "durations"; value: number };

export function AddTimer() {
  const { mutate } = useSWRConfig();
  const [details, setDetails] = useState({
    title: "",
    description: "",
    durations: 25 * 60,
  });

  const updateDetails = (update: Update) => {
    if (update.tag === "title") {
      setDetails((prev) => ({ ...prev, title: update.value }));
    }

    if (update.tag === "description") {
      setDetails((prev) => ({ ...prev, description: update.value }));
    }

    if (update.tag === "durations") {
      const newTime = update.value * 60;
      setDetails((prev) => ({ ...prev, durations: newTime }));
    }
  };

  const add = async () => {
    await window.api.db.addTimer({
      title: details.title,
      description: details.description,
      durations: details.durations,
    });

    await mutate("db:timer:get");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full cursor-pointer"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add Timer</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Timer</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter title"
              onChange={(e) =>
                updateDetails({ tag: "title", value: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="Enter description"
              onChange={(e) =>
                updateDetails({ tag: "description", value: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>
                Duration: {Math.round(details.durations / 60)} minutes
              </Label>
              <span>60 min</span>
            </div>
            <Slider
              defaultValue={[Math.round(details.durations / 60)]}
              min={1}
              max={60}
              step={1}
              onValueChange={(value) => {
                updateDetails({ tag: "durations", value: value[0] });
              }}
            />
          </div>
          <Button variant="secondary" className="w-full" onClick={add}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
