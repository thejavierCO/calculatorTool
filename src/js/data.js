import { writable, get, derived, readable } from "svelte/store";

export let storeBase = (data) => {
  let store = writable(data)
  return ({store,useLocalStorage:(id)=>{
    if(localStorage.getItem(id)==null)localStorage.setItem(id,"[]")
    else store.update(_=>JSON.parse(localStorage.getItem(id)))
    store.subscribe((data) => localStorage.setItem(id, JSON.stringify(data)))
    return store;
  }});
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