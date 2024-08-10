import { readable , get} from "svelte/store";

export class Clock{
  constructor(fns) {
    this._posicion = readable(0, (set) => {
      const updateClock = _ => {
        set(new Date().getTime())
        window.requestAnimationFrame(updateClock);
        if(fns)fns(this);
      }
      let clock =  window.requestAnimationFrame(updateClock);
      return _ =>window.cancelAnimationFrame(clock);
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
    return new String(Math.trunc(this.current())).padEnd(3, "0")
  }
  useRange(max) {
    return Number(
      parseFloat(
        ((this.current() * 1) / (max * 1000)).toString()
      ).toFixed(3)
    )
  }
}