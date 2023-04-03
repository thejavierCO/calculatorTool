import { Store } from "./tools"
import { writable, get, derived } from "svelte/store";

export let store = new Store("store");

export let Types = writable([
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
]);

export let Cards = writable([], (set) => {
  if (store.data == null) store.data = "[]";
  else set(JSON.parse(store.data))
});

Cards.subscribe((a) => { store.data = JSON.stringify(a) })