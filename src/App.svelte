<script>
  import { Cards } from "./js/data";
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import LayoutGrid from "@smui/layout-grid";
  let data = [];
  function addCards({ detail }) {
    Cards.update((a) => {
      console.log(detail);
      a.push(detail);
      return a;
    });
  }
  function delCard(item) {
    console.log(item);
    // Cards.update((a) => a.filter((v) => v != item));
  }
  Cards.subscribe((a) => (data = a));
  Cards.subscribe((a) => console.log(a, "update"));
</script>

<main>
  <Title value="Working" />
  <LayoutGrid>
    <Card store={addCards} />
    {#each data as item}
      <Card store={addCards} data={item} />
    {/each}
  </LayoutGrid>
</main>
