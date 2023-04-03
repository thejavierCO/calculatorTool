<script>
  import Title from "./Components/Title.svelte";
  import Card from "./Components/CardForm.svelte";
  import LayoutGrid from "@smui/layout-grid";
  import { Cards } from "./js/data";
  import Timer from "./Components/timer2.svelte";
  let addItem = ({ detail }) =>
    Cards.update((a) => {
      a.push(detail);
      return a;
    });
  let delItem = ({ detail }) => {
    Cards.update((a) => a.filter((item) => detail.id !== item.id));
  };
  let editItem = ({ detail }) => {
    // Cards.update((e) => {
    //   return e;
    // });
  };
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
        >
          <Timer
            type="temporizer"
            Time={item.time}
            progress={item.progress}
            start={item.start}
          />
        </Card>
      {/each}
    {/if}
  </LayoutGrid>
</main>
