import { writable, readable, get, derived } from "svelte/store";

export let Types = writable([
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
])

let DataTypes = () => new Promise((res, rej) => {
  res(get(Types))
})

export default DataTypes;