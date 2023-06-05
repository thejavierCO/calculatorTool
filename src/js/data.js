import { writable, get, derived, readable } from "svelte/store";

export let Types = [
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
];

export let storeBase = (id, data, useLocalStorage = false) => {
  let store = writable(data, (set) => {
    if (useLocalStorage) {
      const data = JSON.parse(localStorage.getItem(id));
      if (data == null) localStorage.setItem(id, JSON.stringify(data))
      else set(data)
    }
  })
  if (useLocalStorage) store.subscribe((data) => localStorage.setItem(id, JSON.stringify(data)))
  return store;
};

export class ConutTime {
  constructor(ms = 1000) {
    this.store = readable(0, (set) => {
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          set(new Date().getTime())
        }, ms)
      }
      return () => console.warn("unsus", this.intervalId);
    })
  }
  getTime() {
    return this.store
  }
}