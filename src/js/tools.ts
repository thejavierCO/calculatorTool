import { writable, get, derived, Writable } from "svelte/store";

class Events extends EventTarget {
  emit(type, data?) {
    this.dispatchEvent(!data ? new Event(type) : new CustomEvent(type, { detail: data }))
  }
  on(type, fns) {
    this.addEventListener(type, fns)
  }
}

export class Store extends Events {
  id: string
  _data: Writable<[{
    id: string,
    status: boolean,
    progress: number,
    time: number,
  }] | []>
  constructor(id) {
    super();
    if (!id) throw "Require id";
    this.id = id;
    this._data = writable([], (set) => {
      const data = JSON.parse(localStorage.getItem(this.id));
      if (data == null) localStorage.setItem(this.id, "[]")
      set(data)
    });
  }
  add(data) {
    this.base.update((a) => {
      a.push(data);
      return a;
    })
    this.emit("add", data)
  }
  del(id) {
    // this.emit("del", { id })
    console.log(id);
  }
  edit(id, fns) {
    // this.emit("edit", { id })
    console.log(id);
  }
  get base() {
    return this._data;
  }
  get data() {
    return get(this._data)
  }
  set data(value) {
    this._data.set(value)
  }
}

export class Temporisador extends Events {
  _timeCounter: number
  _time: number
  _interval: number
  _Temp: any
  constructor(time: number = 0) {
    super();
    this._timeCounter = time;
    this._time = 0;
    this._interval = 1000 / 10;
    this._Temp = undefined;
  }

  start(progress) {
    if (progress) this._time = progress * this._timeCounter / 1;
    this._Temp = setInterval(() => {
      if (this._time < this._timeCounter) {
        this._time = this._time + this._timeCounter / this._interval;
        this.emit("start", { time: this.time, total: this._timeCounter });
        this.on("pause", () => clearInterval(this._Temp))
      } else if (this._time > this._timeCounter) {
        this.emit("stop");
      }
    }, this._interval)
    this.on("stop", () => {
      this._time = 0;
      clearInterval(this._Temp);
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