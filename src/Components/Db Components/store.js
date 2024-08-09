import { writable, get as getStoreData } from "svelte/store"
import { v4 as uuidv4 } from "uuid";

export class dbStore extends EventTarget {
  Destroy() {
      throw new Error("Method not implemented.");
  }
  constructor(fnsDefaultStore) {
    super();
    this.store = writable([], fnsDefaultStore);
    this.on("Item", ({ detail: dt }) => {
      const [type, data] = dt;
      this.update(e => 
        type == "add"? 
          [...e,data]:
        type == "del"? 
          e.filter(e => e.id != data.id):
        type == "edit"?
          e.map(e => {
            let { id, data: item } = data;
            if (e.id == id) Object.keys(item).forEach((k) => (e[k] != item[k]) ? e[k] = item[k] : "");
            return e;
          }):
        type == "clear"?[]:
        type == "import"?
          ((data)=>{
            if (Array.isArray(data)) return data;
            else throw "require array for import data"
          })(data):e);
    })
  }
  get subscribe() {
    return this.store.subscribe;
  }
  get update() {
    return this.store.update;
  }
  get data() {
    return getStoreData(this.store)
  }
  set data(data){
    this.emit("Item",data)
  }
  add(data) {
    if (!data.id) data.id = uuidv4();
    this.data = ["add",data]
  }
  del(id) {
    this.data = ["del",{id}]
  }
  edit(id, data) {
    this.data = ["edit",{id,data}]
  }
  clear() {
    this.data = ["clear"]
  }
  import(data) {
    this.data = ["import",data]
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
    this._keys = [];
    window.addEventListener("storage",(e)=>this.emit("storageChange",e))
    this.on("storageChange",({detail:{ key, newValue, oldValue }}) => {
        try{this.keys.get(key).start({ type: "updateStorage", data: {newValue, oldValue} });}
        catch(err){this.keys.clear()}
    })
  }
  get keys(){
    return {
      get:(key)=>{
        let item = this._keys.find(e => e.key == key);
        if (item){
          item.fns = this.fns(key);
          return item
        }else throw "not exist elemment"
      },
      add:(key,start)=>{
        if (typeof key !== "string") throw "require key type string";
        if(start)start({ type: "init"})
        this._keys = [ ...this._keys, {key,start}];
        this.emit("add",{key,start})
        return this.keys;
      },
      clear:()=>{
        this._keys.forEach(({ start }) => start({ type: "clear", data: null }));
        this._keys = [];
        this.emit("clear")
      }
    };
  }
  fns(key){
    return {
      get:()=>localStorage.getItem(key),
      set:(data)=>localStorage.setItem(key,data),
      clear:()=>localStorage.removeItem(key),
      toJSON:(data)=>JSON.parse(data?data:localStorage.getItem(key)),
      toString:(data)=>data?JSON.stringify(data):localStorage.getItem(key)
    }
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
      this.localStorageKeys.keys.add("store",
      ({ type, data }) => {
        const fns = this.localStorageKeys.fns("store");
        if(type=="init")fns.get()==null?fns.set("[]"):setInternalStore(fns.toJSON());
        else if(type=="updateStorage")return setInternalStore(fns.toJSON(data.newValue));
        else if(type=="updateStore")return fns.set(data.newValue);
        else if(type=="clear")return setInternalStore([]);
      });
      return fnsUnsuscribe;
    });
    this.Destroy = this.subscribe((data) => {
      if (document.hasFocus()) {
        const fns = this.localStorageKeys.fns("store");
        this.localStorageKeys.keys.get("store").start({
          type: "updateStore",
          data: {
            newValue: fns.toString(data),
            oldValue: fns.toString()
          }
        })
      }
    })
  }
}