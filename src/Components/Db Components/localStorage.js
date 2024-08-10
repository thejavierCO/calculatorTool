export class localStorageDbItem {
  constructor(localStorageParent, key) {
    this.parent = localStorageParent;
    this.key = key;
  }
  get data() {
    return localStorage.getItem(this.key)
  }
  set data(data) {
    if (typeof data != "string") throw "require type string for save"
    localStorage.setItem(this.key, data);
    this.parent.emit("changeItem", this);
  }
  defaultData(defaultData) {
    if (defaultData && this.data == null) this.data = defaultData;
    this.parent.emit("initItem", this);
    return this;
  }
  Destroy() {
    this.parent.keys = this.parent.keys.filter(e => e.key != this.key).map(e => e.getBase())
  }
  getBase() {
    return { key: this.key }
  }
  toJSON(data) {
    return JSON.parse(data ? data : this.data);
  }
  toString(data) {
    return data ? JSON.stringify(data) : this.data;
  }
  onChange(fns) {
    return this.parent.on("ChangeItem", ({ detail: { key, newValue, oldValue } }) => {
      if (key == this.key) fns({ newValue, oldValue });
    })
  }
}

export class localStorageDb extends EventTarget {
  constructor() {
    super();
    this._keys = [];
    window.addEventListener("storage", ({ key, newValue, oldValue }) => {
      if (key !== null) this.emit("ChangeItem", { key, newValue, oldValue });
      else this.emit("ClearStorage");
    })
  }
  get keys() {
    return this._keys.map(({ key }) => new localStorageDbItem(this, key))
  }
  set keys(data) {
    this._keys = data;
  }
  get(key) {
    const Item = this.keys.find((e) => e.key == key);
    if (!Item) throw "not exist element"
    return Item
  }
  add(key) {
    if (typeof key !== "string") throw "require key type string";
    const Item = new localStorageDbItem(this, key);
    this._keys = [...this._keys, Item.getBase()];
    this.emit("addItem", Item)
    return Item;
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