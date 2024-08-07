import { writable } from "svelte/store"
import { v4 as uuidv4 } from "uuid";

export class dbStore extends EventTarget {
  Destroy() {
      throw new Error("Method not implemented.");
  }
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    this.emit("addItem", data);
    this.store.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) e.push(data);
      else this.emit("error", "exist element");
      return e;
    });
    return this;
  }
  del(id) {
    this.emit("delItem", { id });
    this.store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) return e.filter((e) => e.id != id);
      else this.emit("error", "not exist element");
      return e;
    });
    return this;
  }
  edit(id, data) {
    this.store.update((db) => {
      let [item] = db.filter((e) => e.id == id);
      if (typeof item != "undefined")
        return db.map((e) =>
          e.id == item.id
            ? ((e) => {
              Object.keys(data).forEach((k) => {
                if (e[k] != data[k]) {
                  this.emit("editItem", {
                    id,
                    data: {
                      newData: data,
                      oldData: e,
                    },
                  });
                  e[k] = data[k];
                } else this.emit("error", "element is update");
              });
              return e;
            })(e)
            : e
        );
      else this.emit("error", "not exist element");
      return db;
    });
    return this;
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data }))
    else return this.dispatchEvent(new Event(name))
  }
  on(name, callback) {
    this.addEventListener(name, callback)
  }
}

export class localStorageDb {
  constructor() {
    this.keys = [];
    this.storageChange(({ key, newValue }) => {
      if (key != null) this.keys.forEach(({ key: item, start }) => {
        if (key == item) start(newValue)
        else throw "not use key:" + key;
      });
      else this.keys.forEach(({ start }) => start(undefined))
    })
  }
  storageChange(fns) {
    window.addEventListener("storage", fns);
  }
  use(key, start) {
    if (typeof key !== "string") throw "require key type string"
    start(localStorage.getItem(key))
    this.keys.push({ key, start })
    return this;
  }
  get(key) {
    let item = this.keys.filter(e => e.key == key);
    if (item.length != 1) throw "not exist key in localstore"
    return { start: (data) => item[0].start(data) };
  }
}

export class dbStoreUseLocalStorage extends dbStore {
  constructor(fnsUnsuscribe) {
    super(fnsUnsuscribe);
    this.keysStore = new localStorageDb();
    this.keysStore.use("store", (data) => {
      if (typeof data == "string") this.store.update(_ => JSON.parse(data))
      else if (typeof data == "undefined") this.store.update(_ => ([]));
      else if (Array.isArray(data) && document.hasFocus()) localStorage.setItem("store", JSON.stringify(data));
      else if (data == null) localStorage.setItem("store", "[]")
    })
    this.Destroy = this.store.subscribe((data) => this.keysStore.get("store").start(data))
  }
}