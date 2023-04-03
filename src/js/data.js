import { writable, readable, get, derived } from "svelte/store";

export let Types = writable([
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
]);

export let Cards = writable([], (set) => {
  let data = JSON.parse(localStorage.getItem("store"))
  if (data == null) localStorage.setItem("store", "[]");
  else set(data)
});

let DataTypes = () => new Promise((res, rej) => {
  res(get(Types))
})

Cards.subscribe((a) => { localStorage.setItem("store", JSON.stringify(a)) })
export default DataTypes;