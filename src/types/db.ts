export interface DbData {
  timers: TimerData[];
  counter: number;
}

export interface TimerData {
  id: string;
  title: string;
  description: string;
  durations: number;
}
