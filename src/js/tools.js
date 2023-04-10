class Events extends EventTarget {
  emit(type, data) {
    this.dispatchEvent(!data ? new Event(type) : new CustomEvent(type, { detail: data }))
    return this;
  }
  on(type, fns) {
    this.addEventListener(type, fns)
    return this;
  }
  once(type, fns) {
    return this.on(type, (evt) => new Promise((res, rej) => res(fns(evt))))
  }
}

export class Temporisador extends Events {
  constructor(time = 0) {
    super();
    this._time = 0;
    this._interval = 1000 / 10; /* mili */
    this._timeCounter = time * 1000;/* mili */
    this._Temp = undefined;
    this.status = "stop";
    this.on("start", () => this.status = "play")
    this.on("pause", () => this.status = "pause")
    this.on("stop", () => this.status = "stop")
  }

  start(progress) {
    if (progress) this._time = progress * this._timeCounter / 1;
    if (this.status != "play") {
      this._Temp = setInterval(() => {
        if (this._time < this._timeCounter) {
          this._time = this._time + this._interval;
          this.emit("start", { time: this.time, total: this._timeCounter });
          this.on("pause", () => clearInterval(this._Temp))
        } else if (this._time >= this._timeCounter) {
          this.emit("stop");
        }
      }, this._interval)
      this.on("stop", () => {
        clearInterval(this._Temp);
        this._time = 0;
      })
    }
    return { start: (fns) => this.on("start", fns), stop: (fns) => this.on("stop", fns) };
  }
  pause() {
    this.emit("pause")
  }
  clear() {
    this.emit("stop")
  }
  get time() {
    return this._time;
  }
}