import { Store } from "./tools.js"
import { writable, get, derived } from "svelte/store";

export let store = new Store("store");
export let Cards = store.base;

export let Types = writable([
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
]);
