export type ITime = {
  start: number;
  pause: number;
  end: number;
};

export type IActions = {
  play: (data?) => void,
  pause: (data?) => void,
  stop: () => void,
}

export type IStatus = "Play" | "Pause" | "Stop";

export type IFns = (time: ITime) => void;

export type IMillis = number;