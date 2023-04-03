<script>
  import { Cards } from "./js/data";
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import LayoutGrid from "@smui/layout-grid";
  let data = false;
  let addItem = ({ detail }) =>
    Cards.update((a) => {
      a.push(detail);
      return a;
    });
  let delItem = ({ detail }) =>
    Cards.update((a) => a.filter((item) => detail.id !== item.id));

  let editItem = ({ detail }) => {
    console.log(detail);
  };
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    {#if $Cards.length == 0}
      <Card type="start" on:add={addItem} />
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
