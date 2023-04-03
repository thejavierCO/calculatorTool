class Events extends EventTarget {
  emit(type, data) {
    this.dispatchEvent(!data ? new Event(type) : new CustomEvent(type, { detail: data }))
  }
  on(type, fns) {
    this.addEventListener(type, fns)
  }
}

export class Store extends Events {
  constructor(id) {
    super();
    if (!id) throw "Require id";
    this.id = id;
  }
  get data() {
    return localStorage.getItem(this.id)
  }
  set data(value) {
    if (typeof value === "string") localStorage.setItem(this.id, value)
    else throw "require string data"
  }
}

export class Temporisador extends Events {
  constructor(time = 0) {
    super();
    this._timeCounter = time;
    this._time = 0;
    this._interval = 1000 / 10;
    this.Temp = undefined;
  }

  start(progress) {
    if (progress) this._time = progress * this._timeCounter / 1;
    this.Temp = setInterval(() => {
      if (this._time < this._timeCounter) {
        this._time = this._time + this._timeCounter / this._interval;
        this.emit("start", { time: this.time, total: this._timeCounter });
        this.on("pause", () => clearInterval(this.Temp))
      } else if (this._time > this._timeCounter) {
        this.emit("stop");
      }
    }, this._interval)
    this.on("stop", () => {
      this._time = 0;
      clearInterval(this.Temp);
    })
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