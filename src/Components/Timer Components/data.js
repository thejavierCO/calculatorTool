import { writable, readable } from "svelte/store";

export class ConutTime extends EventTarget {
  constructor(callbackUnSuscribe = () => this.emit("UnSuscribe", this)) {
    super();
    this._posicion = readable(0, (set) => {
      function updateClock(_) {
        set(new Date().getTime())
        window.requestAnimationFrame(updateClock);
      }
      window.requestAnimationFrame(updateClock);
      return _ => callbackUnSuscribe()
    })
  }
  get Time() {
    return this._posicion
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data }))
    else return this.dispatchEvent(new Event(name))
  }
  on(name, callback) {
    this.addEventListener(name, callback)
  }
}

export class TimeView {
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
    return Math.trunc(this.current())
  }
  getCurrentTimeBase(max) {
    return Number(
      parseFloat(
        ((this.current() * 1) / (max * 1000)).toString()
      ).toFixed(3)
    )
  }
}

export class Temporizador extends ConutTime {
  constructor(TimeMillis, time, status) {
    super();
    this.status = status || "Stop";
    this.time = time || { start: 0, pause: 0, end: 0 };
    this.timeTotal = TimeMillis;
    this._current_time = 0;
    this.Destroy = this.Time.subscribe((data) => {
      if (this.status == "Play") this.play(data);
      else if (this.status == "Pause") this.pause(data);
      else if (this.status == "Stop") this.stop(true);
    })
  }
  get current_time() {
    return this._current_time
  }
  set current_time(data) {
    this._current_time = data;
  }
  play(data) {
    this.status = "Play";
    if (data) {
      if (this.time.start == 0) this.time.start = data;
      if (this.time.end == 0) this.time.end = this.time.start + this.timeTotal;
      if (this.time.pause != 0) {
        let posPause = Math.round(this.time.pause - this.time.start),
          timePause = this.time.end - this.time.start,
          timeOff = timePause - posPause;
        this.time.start = data;
        this.time.end = this.time.start + timeOff;
        this.time.pause = 0;
      }
      this.current_time = ((a) => (a < 0 ? 0 : a))(this.time.end - data);
      if (this.time.end - this.time.start < 0 || data > this.time.end || this.current_time == 0)
        this.stop();
      this.emit("current_status_timer", { status: this.status, time: this.time });
    }
  }
  pause(data) {
    this.status = "Pause";
    if (data && this.time.pause == 0) {
      this.time.pause = data;
      this.emit("current_status_timer", { status: this.status, time: this.time });
    }
  }
  stop(forceUpdate) {
    if (this.status != "Stop" || forceUpdate)
      this.emit("current_status_timer", { status: this.status, time: this.time });
    this.status = "Stop";
    this.time.start = 0;
    this.time.pause = 0;
    this.time.end = 0;
    this.current_time = 0;
  }
  get formatTime() {
    return new TimeView(this.current_time)
  }
}

