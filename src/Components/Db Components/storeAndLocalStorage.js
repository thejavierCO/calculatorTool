import { localStorageDb } from "./localStorage";
import { Store } from "./store"

export default class StoreUseLocalStorage extends Store {
  constructor(fnsUnsuscribe) {
    super((setInternalStore) => {
      console.log("start")
      this.Keys = new localStorageDb();
      const store = this.Keys.add("store").defaultData("[]")
      setInternalStore(store.toJSON());
      store.onChange(({ newValue: data }) => {
        if (!document.hasFocus()) setInternalStore(store.toJSON(data))
      })
      this.Keys.on("ClearStorage", (_) => setInternalStore([]))
      return fnsUnsuscribe;
    });
    this.Destroy = this.subscribe((data) => {
      const store = this.Keys.get("store");
      store.data = store.toString(data);
    })
  }
}