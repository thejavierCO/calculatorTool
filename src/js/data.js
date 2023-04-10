import { writable, get, derived } from "svelte/store";

export let Types = [
  "Bote Negro",
  "Bote dorado",
  "Bote de aluminio"
];

export let storeBase = (id, data, useLocalStorage = false) => {
  let store = writable(data, (set) => {
    if (useLocalStorage) {
      const data = JSON.parse(localStorage.getItem(id));
      if (data == null) localStorage.setItem(id, JSON.stringify(data))
      else set(data)
    }
  })
  if (useLocalStorage) store.subscribe((data) => localStorage.setItem(id, JSON.stringify(data)))
  return store;
};