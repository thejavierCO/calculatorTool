import { readable, get } from "svelte/store";

export class Clock {
  constructor(fns) {
    this._posicion = readable(0, (set) => {
      const updateClock = _ => {
        set(new Date().getTime())
        window.requestAnimationFrame(updateClock);
        if (fns) fns(this);
      }
      let clock = window.requestAnimationFrame(updateClock);
      return _ => window.cancelAnimationFrame(clock);
    })
  }
  get subscribe() {
    return this._posicion.subscribe
  }
  get currentTime() {
    return get(this._posicion)
  }
}

export class timeFormat {
  constructor(TimeMillis) {
    this._current_time = TimeMillis;
  }
  current() {
    return this._current_time
  }
  get Hours() {
    return new String(Math.trunc(this.current() / 1000 / 60 / 60) % 60).padStart(2, "0")
  }
  get Minutes() {
    return new String(Math.trunc(this.current() / 1000 / 60) % 60).padStart(2, "0")
  }
  get Seconds() {
    return new String(Math.trunc(this.current() / 1000) % 60).padStart(2, "0")
  }
  get Miliseconds() {
    return new String(Math.trunc(this.current())).padEnd(4, "0")
  }
  useRange(max) {
    return Number(parseFloat(((this.current() * 1) / (max * 1000)).toString()).toFixed(3))
  }
}

export default class Timer extends EventTarget {
  constructor(Miliseconds, status, time) {
    super();
    this.status = status || "Stop";
    this.Miliseconds = Miliseconds;
    this.current = 0;
    this.time = time || { start: 0, end: 0, pause: 0 };
    this.clock = new Clock();
    this.Destroy = this.clock.subscribe(t => {
      this.current = t
      if (this.status == "Play" && this.current >= this.time.end) this.Stop();
      this.emit("clock", this.status == "Play" ? this.time.end - t : this.status == "Pause" ? this.time.end - this.time.pause : 0);
    });
  }
  updateTime(data) {
    this.time = data;
  }
  updateStatus(data) {
    this.status = data;
  }
  updateMiliseconds(data) {
    this.Miliseconds = data;
  }
  formatTime(data) {
    return new timeFormat(data);
  }
  Play() {
    if (this.current == 0) throw "currentTime is 0"
    if (this.time.pause != 0) {
      let posPause = Math.round(this.time.pause - this.time.start),
        timePause = this.time.end - this.time.start,
        timeOff = timePause - posPause;
      this.time.start = this.current;
      this.time.end = this.time.start + timeOff;
      this.time.pause = 0;
    } else if (this.time.start == 0 && this.time.end == 0) {
      this.time.start = this.current;
      this.time.end = this.time.start + this.Miliseconds;
    } else {
      throw new Error("Timer already running");
    }
    this.status = "Play";
    this.emit("Play");
    this.emit("Status");
  }
  Pause() {
    if (this.time.pause == 0) this.time.pause = this.current;
    else throw new Error("Timer already paused");
    this.status = "Pause";
    this.emit("Pause");
    this.emit("Status");
  }
  Stop() {
    if (this.time.pause != 0) throw new Error("Timer already paused")
    if (this.time.start != 0 && this.time.end != 0) {
      this.time.start = 0;
      this.time.end = 0;
      this.time.pause = 0;
    } else throw new Error("Timer already stopped")
    this.status = "Stop";
    this.time = { start: 0, end: 0, pause: 0 };
    this.emit("Stop");
    this.emit("Status");
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