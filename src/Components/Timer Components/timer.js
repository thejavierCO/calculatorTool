export class Clock extends EventTarget {
  constructor() {
    super();
    this._currentTime = 0;
    const updateClock = () => {
      this._currentTime = new Date().getTime();
      this.emit("clock", this._currentTime)
      window.requestAnimationFrame(updateClock);
    };
    updateClock();
  }
  subscribe(fns) {
    return this.on("clock", ({ detail }) => fns(detail));
  }
  get currentTime() {
    return this._currentTime
  }
  on(event, callback) {
    this.addEventListener(event, callback);
    return () => {
      this.removeEventListener(event, callback);
    }
  }
  emit(event, data) {
    return this.dispatchEvent(new CustomEvent(event, { detail: data }));
  }
}

export class timeFormat {
  constructor(TimeMillis) {
    this._current_time = TimeMillis;
  }
  get current() {
    return this._current_time
  }
  get Hours() {
    return new String(Math.trunc(this.current / 1000 / 60 / 60) % 60).padStart(2, "0")
  }
  get Minutes() {
    return new String(Math.trunc(this.current / 1000 / 60) % 60).padStart(2, "0")
  }
  get Seconds() {
    return new String(Math.trunc(this.current / 1000) % 60).padStart(2, "0")
  }
  get Miliseconds() {
    return new String(Math.trunc(this.current)).padEnd(4, "0")
  }
  useRange(max) {
    return Number(parseFloat(((this.current * 1) / (max * 1000)).toString()).toFixed(3))
  }
}

export default class Timer extends Clock {
  constructor(milliseconds, start = 0, pause = 0, end = 0) {
    super();
    this._start = start;
    this._pause = pause;
    this._end = end;
    this._posicion = 0;
    this._status = "Stop";
    this._milliseconds = milliseconds;
  }
  get formatTime() {
    return new timeFormat(this._posicion);
  }
  get time() {
    return ({ start: this._start, pause: this._pause, end: this._end })
  }
  set time(time) {
    let { start, pause, end } = time;
    this._start = start;
    this._pause = pause;
    this._end = end;
  }
  get status() {
    return this._status
  }
  set status(data) {
    if (data == "Play") {
      this.Play()
    } else if (data == "Pause") {
      this.Pause()
    } else if (data == "Stop") {
      this.Stop()
    }
    this._status = data;
  }
  Play() {
    const currentTime = new Date().getTime();
    if (this._pause != 0) {
      let posPause = Math.round(this._pause - this._start),
        timePause = this._end - this._start,
        timeOff = timePause - posPause;
      this._start = currentTime;
      this._end = this._start + timeOff;
      this._pause = 0;
    } else if (this._pause == 0 || (this._start == 0 && this._end == 0)) {
      this._start = currentTime;
      this._end = this._start + this._milliseconds;
    }
    if (this._start != 0 && this._end != 0) console.warn("currentPlay", this.time);
    this._position = this._end - this._start;
    this.emit("Play");
    this.emit("Status");
  }
  Stop() {
    if (this._start == 0 && this._end == 0) console.warn("currentStop");
    this.time = { start: 0, pause: 0, end: 0 };
    this._position = 0;
    this.emit("Stop");
    this.emit("Status");
  }
  Pause() {
    const currentTime = new Date().getTime();
    if (this._pause == 0) this._pause = currentTime;
    else console.warn("currentPause");
    this._position = this._end - this._pause;
    this.emit("Pause");
    this.emit("Status");
  }
}