export interface DbData {
  timers: TimerData[]
}

export interface TimerData {
  id: string;
  title: string;
  description: string;
  durations: number;
}
