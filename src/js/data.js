import { writable, readable } from "svelte/store";

export class Storedb{
  constructor(db){
    this.store = writable(db);
  }
  useLocalStore(id){
    if(!id)throw Error("not exist id")
    if(localStorage.getItem(id)==null)localStorage.setItem(id,"[]")
    else this.store.update(_=>JSON.parse(localStorage.getItem(id)))
    this.store.subscribe((data) => localStorage.setItem(id, JSON.stringify(data)))
    return this
  }
  suscribe(){
    return this.store.subscribe
  }
  get db(){
    return this.store
  }
}

export class ConutTime {
  constructor(ms = 1000) {
    this.store = readable(0, (set) => {
      if (!this.intervalId) this.intervalId = setInterval(() => set(new Date().getTime()), ms)
      return _ => console.warn("unsus");
    })
  }
  get Time() {
    return this.store
  }
}