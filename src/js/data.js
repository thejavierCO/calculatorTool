import { writable, readable, get, derived } from "svelte/store";

export let Types = writable([
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
]);

export let Cards = writable([], (set) => {
  set(JSON.parse(localStorage.getItem("store")))
});

let DataTypes = () => new Promise((res, rej) => {
  res(get(Types))
})

export default DataTypes;
Cards.subscribe((a) => { localStorage.setItem("store", JSON.stringify(a)) })