<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { dbStore, dbStoreUseLocalStorage } from "./store.js";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();

  let db = new (useLocalStorage ? dbStoreUseLocalStorage : dbStore)();

  const store = db.store;

  onDestroy(() => {
    if (useLocalStorage) db.Destroy();
  });

  onMount(() =>
    emit("mount", {
      add: (data) => db.add(data),
      del: (id) => db.del(id),
      edit: (id, data) => db.edit(id, data),
      store: () => get(store),
    })
  );
</script>

<slot
  add={(data) => db.add(data)}
  del={(id) => db.del(id)}
  edit={(id, data) => db.edit(id, data)}
/>

<LayoutGrid>
  {#if $$slots.print}
    {#each $store as data, index}
      <Cell>
        <slot name="print" id={data.id} {index} {data} />
      </Cell>
    {/each}
  {/if}
  <slot name="input" />
</LayoutGrid>
