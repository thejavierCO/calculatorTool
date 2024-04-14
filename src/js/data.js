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

export class TimeView {
  constructor(current_time) {
    this.current_time = current_time;
  }
  get current() {
    return this.current_time
  }
  get Hours() {
    return (e => e < 10 ? "0".concat(e.toString()) : e)(Math.trunc(this.current / 1000 / 60 / 60) % 60)
  }
  get Minutes() {
    return (e => e < 10 ? "0".concat(e.toString()) : e)(Math.trunc(this.current / 1000 / 60) % 60)
  }
  get Seconds() {
    return (e => e < 10 ? "0".concat(e.toString()) : e)(Math.trunc(this.current / 1000) % 60)
  }
  get Miliseconds() {
    return Math.trunc(this.current)
  }
  getCurrentTimeBase(max) {
    return Number(
      parseFloat(
        ((this.current * 1) / (max * 1000)).toString()
      ).toFixed(3)
    )
  }
}