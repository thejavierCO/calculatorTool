<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import LayoutGrid from "@smui/layout-grid";

  import { store } from "./js/data";
  import Timer from "./Components/timer.svelte";
  let { base } = store;
  let addItem = ({ detail }) => {
    store.add(detail);
  };
  let delItem = ({ detail }) => {
    store.del(detail.id);
  };
  let editItem = ({ detail }) => {
    store.edit(detail.id, (data) => {
      console.log(data);
      return data;
    });
  };
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    {#if $base.length == 0}
      <Card type="start" on:add={addItem}><p>inmit</p></Card>
    {:else}
      {#each $base as item}
        <Card
          type="item"
          id={item.id}
          on:add={addItem}
          on:del={delItem}
          on:edit={editItem}
        >
          <Timer
            id={item.id}
            type="temporizer"
            bind:status={item.status}
            bind:progress={item.progress}
            bind:time={item.time}
          >
            init
          </Timer>
        </Card>
      {/each}
    {/if}
  </LayoutGrid>
</main>
