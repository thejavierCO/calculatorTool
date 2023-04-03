<script>
  import { Cards } from "./js/data";
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import LayoutGrid from "@smui/layout-grid";
  let showButtonAdd = true;
  let addItem = ({ detail }) => {
    Cards.update((a) => {
      a.push(detail);
      showButtonAdd = false;
      return a;
    });
  };
  let delItem = ({ detail }) => {
    Cards.update((a) => {
      console.log(detail, a);
      return a;
    });
  };
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    {#if showButtonAdd}
      <Card on:add={addItem} />
    {:else}
      {#each $Cards as item}
        <Card on:add={addItem} on:del={delItem} />
      {/each}
    {/if}
  </LayoutGrid>
</main>
