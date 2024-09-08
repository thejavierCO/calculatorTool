<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Store from "./store";
  import StoreUseLocalStorage from "./storeAndLocalStorage";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();

  let store = new (useLocalStorage ? StoreUseLocalStorage : Store)();

  store.on("add", ({ detail: data }) => emit("add", { data }));
  store.on("edit", ({ detail: { id, data } }) => emit("edit", { id, data }));

  const actions = {
    add: (data) => store.add(data),
    del: (id) => store.get(id).Destroy(),
    edit: (id, data) => store.get(id).edit(data),
    store: () => get(store),
  };

  store.on("del", (_) => emit("delete", actions));

  onDestroy(() => {
    if (useLocalStorage) store.Destroy();
  });

  onMount(() => emit("mount", actions));
</script>

<slot add={actions.add} edit={actions.edit} del={actions.del} store={$store} />

<LayoutGrid>
  {#if $$slots.print}
    {#each $store as data, index}
      <Cell>
        <slot name="print" id={data.id} {index} {data} />
      </Cell>
    {/each}
  {/if}
</LayoutGrid>
