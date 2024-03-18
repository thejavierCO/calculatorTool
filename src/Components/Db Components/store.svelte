<script>
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { v4 as uuidv4 } from "uuid";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();
  const store = writable([]);

  if (useLocalStorage) {
    let name = typeof useLocalStorage == "string" ? useLocalStorage : "store";
    if (localStorage.getItem(name) == null) localStorage.setItem(name, "[]");
    else store.update((_) => JSON.parse(localStorage.getItem(name)));
    store.subscribe((data) => {
      let oldData = localStorage.getItem(name);
      if (JSON.stringify(data) != oldData)
        localStorage.setItem(name, JSON.stringify(data));
    });
    window.addEventListener("storage", ({ key, newValue }) =>
      key == name ? store.update((_) => JSON.parse(newValue)) : ""
    );
  }

  export function add(data) {
    let { id } = data;
    if (!id) data.id = uuidv4();
    emit("add", data);
    store.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) e.push(data);
      else emit("error", "exist element");
      return e;
    });
  }
  export function del(id) {
    emit("del", { id });
    store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) return e.filter((e) => e.id != id);
      else emit("error", "not exist element");
      return e;
    });
  }
  export function edit(id, data) {
    store.update((db) => {
      let [item] = db.filter((e) => e.id == id);
      if (typeof item != "undefined")
        return db.map((e) =>
          e.id == item.id
            ? ((e) => {
                Object.keys(data).forEach((k) => {
                  if (e[k] != data[k]) {
                    console.log(k);
                    emit("edit", {
                      id,
                      data: {
                        newData: data,
                        oldData: e,
                      },
                    });
                    e[k] = data[k];
                  } else emit("error", "element is update");
                });
                return e;
              })(e)
            : e
        );
      else emit("error", "not exist element");
      return db;
    });
  }
</script>

<slot {add} {del} {edit} />

<LayoutGrid>
  {#each $store as data, index}
    <Cell>
      <slot name="print" id={data.id} {index} {data} />
    </Cell>
  {/each}
  <slot name="input" />
</LayoutGrid>
