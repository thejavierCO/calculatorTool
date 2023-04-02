<script>
  import Title from "./Components/Title.svelte";
  import Content from "./Components/Content.svelte";
  import Form from "./Components/Form.svelte";
  let show = true;
  function add({ detail: a }) {
    console.log(a);
    show = !show;
  }
</script>

<main>
  <Title value="Working" />
  <Content>
    {#if show}
      <Form on:save={add} />
    {/if}
  </Content>
</main>
