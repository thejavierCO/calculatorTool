import { writable, readable } from "svelte/store";

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