import { writable, readable } from "svelte/store";

export class Storedb {
  constructor(db) {
    this.store = writable(db);
  }
  useLocalStore(id) {
    if (!id) throw Error("not exist id")
    if (localStorage.getItem(id) == null) localStorage.setItem(id, "[]")
    else this.store.update(_ => JSON.parse(localStorage.getItem(id)))
    this.subscribe((data) => {
      let oldData = localStorage.getItem(id)
      if (JSON.stringify(data) != oldData) localStorage.setItem(id, JSON.stringify(data))
    })
    return this
  }
  get subscribe() {
    return this.store.subscribe
  }
  get db() {
    return this.store
  }
}

export class ConutTime {
  constructor() {
    this.store = readable(0, (set) => {
      function updateClock(_) {
        set(new Date().getTime())
        window.requestAnimationFrame(updateClock);
      }
      window.requestAnimationFrame(updateClock);
      return _ => console.warn("unsus");
    })
  }
  get Time() {
    return this.store
  }
}