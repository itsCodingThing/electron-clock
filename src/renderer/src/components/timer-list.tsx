import type { TimerData } from "@types/db";
import TimerItem from "./timer-item";

function TimerListCard(props: { timer: TimerData }) {
  return <TimerItem timer={props.timer} />;
}

export default function TimerList(props: { timers: TimerData[] }) {
  return props.timers.map((timer) => {
    return <TimerListCard timer={timer} key={timer.id} />;
  });
}
