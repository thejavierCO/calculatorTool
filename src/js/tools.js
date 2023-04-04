import { writable, get, derived } from "svelte/store";

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
    this._data = writable([], (set) => {
      const data = JSON.parse(localStorage.getItem(this.id));
      if (data == null) localStorage.setItem(this.id, "[]")
      set(data)
    });
    this._data.subscribe((a) => localStorage.setItem(this.id, JSON.stringify(a)))
  }
  add(data) {
    this.base.update((a) => {
      a.push(data);
      return a;
    })
    this.emit("add", data)
  }
  del(id) {
    this.base.update((a) => a.filter(e => e.id != id))
    this.emit("del", { id })
  }
  edit(id, fns) {
    this.base.update((a) => a.map(e => e.id == id ? fns(e) : e))
    this.emit("edit", { id })
  }
  get(id) {
    return this.data.filter(e => e.id == id);
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
  constructor(time = 0) {
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