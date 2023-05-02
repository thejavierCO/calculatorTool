export type ITime = {
  start: number;
  end: number;
  count: number;
};

export type IActions = {
  play: () => void,
  pause: () => void,
  stop: () => void,
}

export type IStatus = "Play" | "Pause" | "Stop";