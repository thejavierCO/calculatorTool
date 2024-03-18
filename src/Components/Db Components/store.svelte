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
    emit("edit", { id, data });
    store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1)
        return e.map((e) => {
          if (e.id == id) {
            Object.keys(data).forEach((k) =>
              e[k] != data[k] ? (e[k] = data[k]) : ""
            );
            return e;
          } else return e;
        });
      else emit("error", "not exist element");
      return e;
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
