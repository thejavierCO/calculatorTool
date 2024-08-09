<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { dbStore, dbStoreUseLocalStorage } from "./store.js";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();

  let store = new (useLocalStorage ? dbStoreUseLocalStorage : dbStore)();

  let Destroy = store.subscribe((data) => emit("store", data));
  store.on("add", ({detail}) => emit("add", detail));
  store.on("del", ({detail}) => emit("del", detail));
  store.on("edit", ({detail}) => emit("edit", detail));

  emit("mount")

  onDestroy(() => {
    if (useLocalStorage){
      store.Destroy();
      Destroy();
    }
  });

  onMount(() =>
    emit("mount", {
      add: (data) => store.add(data),
      del: (id) => store.del(id),
      edit: (id, data) => store.edit(id, data),
      store: () => get(store),
    })
  );
</script>

<slot
  add={(data) => store.add(data)}
  del={(id) => store.del(id)}
  edit={(id, data) => store.edit(id, data)}
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
