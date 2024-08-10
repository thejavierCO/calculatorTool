import { writable, get as getStoreData } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

class StoreItem {
  constructor(Store, data) {
    this.parent = Store;
    this._data = data;
  }
  get id() {
    return this._data.id;
  }
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
  }
  edit(data) {
    Object.keys(data).forEach((k) => (this.data[k] != data[k]) ? this.data[k] = data[k] : "");
    this.parent.update(e => e.map(e => e.id == this.id ? this.data : e))
    this.parent.emit("edit", this);
  }
  Destroy() {
    this.parent.update(e => e.filter(e => e.id != this.id))
    this.parent.emit("del", this);
  }
}

export class Store extends EventTarget {
  Destroy() {
    throw new Error("Method not implemented.");
  }
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
  }
  get subscribe() {
    return this.store.subscribe;
  }
  get update() {
    return this.store.update;
  }
  get data() {
    return getStoreData(this.store).map((data) => new StoreItem(this, data));
  }
  set data(data) {
    this.store.set(data);
  }
  add(data) {
    if (!data.id) data.id = uuidv4();
    this.update((e) => [...e, data])
    this.emit("add");
    return this;
  }
  get(id) {
    const Item = this.data.find((e) => e.id == id);
    if (!Item) throw "not exist element"
    return Item;
  }
  clear() {
    this.data = [];
    this.emit("clear");
  }
  import(data) {
    this.data = data;
    this.emit("import");
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