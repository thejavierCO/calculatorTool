<script>
  import { createEventDispatcher } from "svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { v4 as uuidv4 } from "uuid";
  export let store;
  const emit = createEventDispatcher();

  let InsertAddStart = false;
  let InsertAddEnd = false;
  if (Object.keys($$slots).filter((e) => e != "default")[0] == "add")
    InsertAddEnd = true;
  else InsertAddStart = true;

  export function add(data) {
    emit("add", data);
    let { id } = data;
    if (!id) data.id = uuidv4();
    store.update((e) => {
      if (e.filter((e) => e.id == id).length == 0) {
        e.push(data);
      } else emit("error", "exist element");
      return e;
    });
  }
  export function del(id) {
    emit("del", { id });
    store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) {
        return e.filter((e) => e.id != id);
      } else emit("error", "not exist element");
      return e;
    });
  }
  export function edit(id, data) {
    emit("edit", { id, data });
    store.update((e) => {
      let item = e.filter((e) => e.id == id);
      if (item.length == 1) {
        return e.map((e) => {
          if (e.id == id) return data;
          return e;
        });
      } else emit("error", "not exist element");
      return e;
    });
  }
</script>

<slot Id={uuidv4()} />

<LayoutGrid>
  {#if $store.length == 0}
    <Cell>
      <slot name="input" action={add} />
    </Cell>
  {:else}
    {#if InsertAddStart}
      <Cell>
        <slot name="input" action={add} />
      </Cell>
    {/if}
    {#each $store as data, index}
      <Cell>
        <slot
          name="print"
          length={$store.length}
          id={data.id}
          {data}
          {index}
          del={() => del(data.id)}
          edit={(data) => edit(data.id, data)}
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
