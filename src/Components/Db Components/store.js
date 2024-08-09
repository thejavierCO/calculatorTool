import { writable, get as getStoreData } from "svelte/store"
import { v4 as uuidv4 } from "uuid";

export class dbStore extends EventTarget {
  Destroy() {
      throw new Error("Method not implemented.");
  }
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
    this.on("Item", ({ detail: { type, data } }) => {
      this.store.update(e => {
        this.emit(type, data)
        switch (type) {
          case "add": return [...e, data];
          case "del": return e.filter(e => e.id != data.id);
          case "edit":
            return e.map(e => {
              let { id, data: item } = data;
              if (e.id == id) Object.keys(item).forEach((k) => (e[k] != item[k]) ? e[k] = item[k] : "");
              return e;
            })
          case "clear": return [];
          case "insert":
            if (Array.isArray(data)) return data;
            else throw "require array for insert data"
          default: return e;
        }
      });
    })
  }
  get() {
    return getStoreData(this.store)
  }
  set(data){
    this.store.set(data);
    return this;
  }
  add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    this.emit("Item", { type: "add", data });
    return this;
  }
  del(id) {
    this.emit("Item", { type: "del", data: { id } });
    return this;
  }
  edit(id, data) {
    this.emit("Item", { type: "edit", data: { id, data } });
    return this;
  }
  clear() {
    this.emit("Item", { type: "clear", data: null });
    return this;
  }
  insert(data) {
    this.emit("Item", { type: "insert", data });
    return this;
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data, cancelable: true }))
    else return this.dispatchEvent(new Event(name, { cancelable: true }))
  }
  on(name, callback) {
    this.addEventListener(name, callback);
    return this;
  }
}

export class localStorageDb extends EventTarget{
  constructor() {
    super();
    this.keys = [];
    window.addEventListener("storage",(e)=>this.emit("storageChange",e))
    this.on("storageChange",({detail:{ key, newValue, oldValue }}) => {
      try{
        if (key != null) this.get(key).start({ type: "updateStorage", data: {newValue, oldValue,isFocus:document.hasFocus()} });
        else this.keys.forEach(({ start }) => start({ type: "clear", data: null }))
      }catch(err){
        console.error(err);
      }
    })
  }
  use(key, start) {
    if (typeof key !== "string") throw "require key type string"
    start({ type: "init", data: localStorage.getItem(key) })
    this.keys = [...this.keys, { key, start }]
    return this;
  }
  get(key) {
    let item = this.keys.find(e => e.key == key);
    if (item) return item
    else throw "not exist elemment"
  }
  emit(name, data) {
    if (data) return this.dispatchEvent(new CustomEvent(name, { detail: data, cancelable: true }))
    else return this.dispatchEvent(new Event(name, { cancelable: true }))
  }
  on(name, callback) {
    this.addEventListener(name, callback);
    return this;
  }
}

export class dbStoreUseLocalStorage extends dbStore {
  constructor(fnsUnsuscribe) {
    super((setInternalStore)=>{
      console.log("start")
      this.localStorageKeys = new localStorageDb();
      this.localStorageKeys.use("store", ({ type, data }) => {
        let setLocalStore = (data) => localStorage.setItem("store", data);
        let getLocalStore = () => localStorage.getItem("store");
        switch (type) {
          case "init":
            if(getLocalStore()==null)return setLocalStore("[]");
            else return setInternalStore(JSON.parse(getLocalStore()));
          case "updateStorage":
            console.warn(data.newValue)
            return setInternalStore(JSON.parse(data.newValue));
          case "updateStore":
            return setLocalStore(data.newValue);
          case "clear":
            return setInternalStore([])
        }
      })
      return fnsUnsuscribe
    });
    this.Destroy = this.store.subscribe((data) => {
      if (document.hasFocus()) {
        this.localStorageKeys.get("store")
          .start({
            type: "updateStore",
            data: {
              newValue: JSON.stringify(data),
              oldValue: localStorage.getItem("store"),
              isFocus: document.hasFocus()
            }
          })
      }
    })
  }
}