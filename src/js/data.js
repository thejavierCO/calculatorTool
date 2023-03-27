import { readable, readonly, get } from "svelte/store";

let Types = readable([
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
])

let DataTypes = () => new Promise((res, rej) => {
  Types.subscribe((a) => {
    res(a)
  })
})

export default DataTypes;