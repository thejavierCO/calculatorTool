<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import LayoutGrid from "@smui/layout-grid";

  import { Cards } from "./js/data";
  let addItem = ({ detail }) => {};
  let delItem = ({ detail }) => {};
  let editItem = ({ detail }) => {};
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    {#if $Cards.length == 0}
      <Card type="start" on:add={addItem}><p>inmit</p></Card>
    {:else}
      {#each $Cards as item}
        <Card
          type="item"
          id={item.id}
          on:add={addItem}
          on:del={delItem}
          on:edit={editItem}
        />
      {/each}
    {/if}
  </LayoutGrid>
</main>
