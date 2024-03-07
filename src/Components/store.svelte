<script>
  import { createEventDispatcher} from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { v4 as uuidv4 } from "uuid";
  import { Storedb } from "../js/data";
  const emit = createEventDispatcher();
  export let useLocalStorage = false;
  let store = new Storedb([]);
  let InsertAddStart = false;
  let InsertAddEnd = false;

  if (!store) throw "require store";
  let db = store.db
  if(useLocalStorage){store.useLocalStore(typeof useLocalStorage == "string"?useLocalStorage:"store")}

  let slotsIDs = Object.keys($$slots).filter((e) => e != "default");
  slotsIDs[0] == "input" ? (InsertAddEnd = true) : (InsertAddStart = true);

  export function add(data) {
    emit("add", data);
    let { id } = data;
    if (!id) data.id = uuidv4();
    db.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) {
        e.push(data);
      } else emit("error", "exist element");
      return e;
    });
  }
  export function del(id) {
    emit("del", { id });
    db.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) {
        return e.filter((e) => e.id != id);
      } else emit("error", "not exist element");
      return e;
    });
  }
  export function edit(id, data) {
    emit("edit", { id, data });
    db.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) {
        return e.map((e) => {
          if (e.id == id) {
            Object.keys(data).forEach((k) => {
              if (e[k] != data[k]) {
                e[k] = data[k];
              }
            });
            return e;
          }
          return e;
        });
      } else emit("error", "not exist element");
      return e;
    });
  }
</script>

<slot />

<LayoutGrid>
  {#if $db.length == 0}
    <Cell>
      <slot name="input" action={add} />
    </Cell>
  {:else}
    {#if InsertAddStart}
      <Cell>
        <slot name="input" action={add} />
      </Cell>
    {/if}
    {#each $db as data, index}
      <Cell>
        <slot
          name="print"
          length={$db.length}
          id={data.id}
          {data}
          {index}
          del={() => del(data.id)}
          edit={(dt) => edit(data.id, dt)}
        />
      </Cell>
    {/each}
    {#if InsertAddEnd}
      <Cell>
        <slot name="input" action={add} />
      </Cell>
    {/if}
  {/if}
</LayoutGrid>
